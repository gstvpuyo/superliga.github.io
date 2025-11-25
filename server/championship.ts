import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  getAllClubs,
  getClubById,
  getStandings,
  updateStanding,
  getAllMatches,
  getMatchesByRound,
  createMatch,
  updateMatch,
  getAllTransfers,
  getTransfersByClub,
  createTransfer,
  getTopScorers,
  getPlayerStatsByClub,
  updatePlayerStats,
  getSquadByClub,
  addPlayerToSquad,
  updateSquadPlayer,
} from "./db";

export const championshipRouter = router({
  // ===== CLUBS =====
  clubs: router({
    getAll: publicProcedure.query(async () => {
      return getAllClubs();
    }),
    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return getClubById(input);
    }),
    create: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          owner: z.string(),
          color: z.string().optional(),
          logo: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Only admins can create clubs");
        }
        const db = await (await import("./db")).getDb();
        if (!db) throw new Error("Database not available");
        const { clubs: clubsTable } = await import("../drizzle/schema");
        const result = await db.insert(clubsTable).values(input);
        const clubId = (result as any).insertId;
        if (!clubId) throw new Error("Failed to create club");
        return getClubById(clubId);
      }),
  }),

  // ===== STANDINGS =====
  standings: router({
    getAll: publicProcedure.query(async () => {
      return getStandings();
    }),
    update: protectedProcedure
      .input(
        z.object({
          clubId: z.number(),
          position: z.number().optional(),
          played: z.number().optional(),
          wins: z.number().optional(),
          draws: z.number().optional(),
          losses: z.number().optional(),
          goalsFor: z.number().optional(),
          goalsAgainst: z.number().optional(),
          goalDifference: z.number().optional(),
          points: z.number().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Only admins can update standings");
        }
        await updateStanding(input.clubId, input);
        return { success: true };
      }),
  }),

  // ===== MATCHES =====
  matches: router({
    getAll: publicProcedure.query(async () => {
      return getAllMatches();
    }),
    getByRound: publicProcedure.input(z.number()).query(async ({ input }) => {
      return getMatchesByRound(input);
    }),
    create: protectedProcedure
      .input(
        z.object({
          round: z.number(),
          homeClubId: z.number(),
          awayClubId: z.number(),
          date: z.date().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Only admins can create matches");
        }
        return createMatch(input);
      }),
    update: protectedProcedure
      .input(
        z.object({
          matchId: z.number(),
          homeGoals: z.number().optional(),
          awayGoals: z.number().optional(),
          status: z.enum(["scheduled", "finished", "cancelled"]).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Only admins can update matches");
        }
        const { matchId, ...data } = input;
        await updateMatch(matchId, data);
        return { success: true };
      }),
  }),

  // ===== TRANSFERS =====
  transfers: router({
    getAll: publicProcedure.query(async () => {
      return getAllTransfers();
    }),
    getByClub: publicProcedure.input(z.number()).query(async ({ input }) => {
      return getTransfersByClub(input);
    }),
    create: protectedProcedure
      .input(
        z.object({
          toClubId: z.number(),
          fromClubId: z.number().optional(),
          playerName: z.string(),
          playerOverall: z.number(),
          transferFee: z.string(),
          window: z.enum(["initial", "mid", "preMata"]),
        })
      )
      .mutation(async ({ input }) => {
        return createTransfer(input);
      }),
  }),

  // ===== PLAYER STATS =====
  playerStats: router({
    getTopScorers: publicProcedure.input(z.number().optional()).query(async ({ input }) => {
      return getTopScorers(input || 10);
    }),
    getByClub: publicProcedure.input(z.number()).query(async ({ input }) => {
      return getPlayerStatsByClub(input);
    }),
    update: protectedProcedure
      .input(
        z.object({
          playerId: z.number(),
          goals: z.number().optional(),
          assists: z.number().optional(),
          matches: z.number().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Only admins can update player stats");
        }
        const { playerId, ...data } = input;
        await updatePlayerStats(playerId, data);
        return { success: true };
      }),
  }),

  // ===== SQUADS =====
  squads: router({
    getByClub: publicProcedure.input(z.number()).query(async ({ input }) => {
      return getSquadByClub(input);
    }),
    addPlayer: protectedProcedure
      .input(
        z.object({
          clubId: z.number(),
          playerName: z.string(),
          playerOverall: z.number(),
          position: z.string().optional(),
          role: z.enum(["captain", "legend", "wildcard", "starter1", "starter2", "bench"]),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Only admins can add players to squads");
        }
        return addPlayerToSquad(input);
      }),
    updatePlayer: protectedProcedure
      .input(
        z.object({
          squadId: z.number(),
          playerName: z.string().optional(),
          playerOverall: z.number().optional(),
          position: z.string().optional(),
          role: z.enum(["captain", "legend", "wildcard", "starter1", "starter2", "bench"]).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Only admins can update squad players");
        }
        const { squadId, ...data } = input;
        await updateSquadPlayer(squadId, data);
        return { success: true };
      }),
  }),
});
