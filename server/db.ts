import { eq, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, clubs, standings, matches, transfers, playerStats, squads, Club, Standing, Match, Transfer, PlayerStat, Squad } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ===== CLUBS =====

export async function getAllClubs(): Promise<Club[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(clubs).orderBy(asc(clubs.id));
}

export async function getClubById(clubId: number): Promise<Club | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(clubs).where(eq(clubs.id, clubId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ===== STANDINGS =====

export async function getStandings(): Promise<Standing[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(standings).orderBy(asc(standings.position));
}

export async function updateStanding(clubId: number, data: Partial<Standing>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(standings).set(data).where(eq(standings.clubId, clubId));
}

// ===== MATCHES =====

export async function getAllMatches(): Promise<Match[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(matches).orderBy(asc(matches.round), asc(matches.id));
}

export async function getMatchesByRound(round: number): Promise<Match[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(matches).where(eq(matches.round, round)).orderBy(asc(matches.id));
}

export async function createMatch(data: any): Promise<Match> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(matches).values(data);
  const matchId = (result as any).insertId;
  
  const created = await db.select().from(matches).where(eq(matches.id, matchId)).limit(1);
  return created[0];
}

export async function updateMatch(matchId: number, data: Partial<Match>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(matches).set(data).where(eq(matches.id, matchId));
}

// ===== TRANSFERS =====

export async function getAllTransfers(): Promise<Transfer[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(transfers).orderBy(desc(transfers.createdAt));
}

export async function getTransfersByClub(clubId: number): Promise<Transfer[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(transfers).where(eq(transfers.toClubId, clubId)).orderBy(desc(transfers.createdAt));
}

export async function createTransfer(data: any): Promise<Transfer> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(transfers).values(data);
  const transferId = (result as any).insertId;
  
  const created = await db.select().from(transfers).where(eq(transfers.id, transferId)).limit(1);
  return created[0];
}

// ===== PLAYER STATS =====

export async function getTopScorers(limit: number = 10): Promise<PlayerStat[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(playerStats).orderBy(desc(playerStats.goals)).limit(limit);
}

export async function getPlayerStatsByClub(clubId: number): Promise<PlayerStat[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(playerStats).where(eq(playerStats.clubId, clubId)).orderBy(desc(playerStats.goals));
}

export async function updatePlayerStats(playerId: number, data: Partial<PlayerStat>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(playerStats).set(data).where(eq(playerStats.id, playerId));
}

// ===== SQUADS =====

export async function getSquadByClub(clubId: number): Promise<Squad[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(squads).where(eq(squads.clubId, clubId)).orderBy(asc(squads.role));
}

export async function addPlayerToSquad(data: any): Promise<Squad> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(squads).values(data);
  const squadId = (result as any).insertId;
  
  const created = await db.select().from(squads).where(eq(squads.id, squadId)).limit(1);
  return created[0];
}

export async function updateSquadPlayer(squadId: number, data: Partial<Squad>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(squads).set(data).where(eq(squads.id, squadId));
}
