import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Clubes participantes do campeonato
 */
export const clubs = mysqlTable("clubs", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  owner: varchar("owner", { length: 255 }).notNull(),
  logo: varchar("logo", { length: 255 }),
  color: varchar("color", { length: 7 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Club = typeof clubs.$inferSelect;
export type InsertClub = typeof clubs.$inferInsert;

/**
 * Classificação do campeonato (tabela de pontos)
 */
export const standings = mysqlTable("standings", {
  id: int("id").autoincrement().primaryKey(),
  clubId: int("clubId").notNull(),
  position: int("position").notNull(),
  played: int("played").default(0).notNull(),
  wins: int("wins").default(0).notNull(),
  draws: int("draws").default(0).notNull(),
  losses: int("losses").default(0).notNull(),
  goalsFor: int("goalsFor").default(0).notNull(),
  goalsAgainst: int("goalsAgainst").default(0).notNull(),
  goalDifference: int("goalDifference").default(0).notNull(),
  points: int("points").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Standing = typeof standings.$inferSelect;
export type InsertStanding = typeof standings.$inferInsert;

/**
 * Partidas do campeonato
 */
export const matches = mysqlTable("matches", {
  id: int("id").autoincrement().primaryKey(),
  round: int("round").notNull(),
  homeClubId: int("homeClubId").notNull(),
  awayClubId: int("awayClubId").notNull(),
  homeGoals: int("homeGoals"),
  awayGoals: int("awayGoals"),
  status: mysqlEnum("status", ["scheduled", "finished", "cancelled"]).default("scheduled").notNull(),
  date: timestamp("date"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Match = typeof matches.$inferSelect;
export type InsertMatch = typeof matches.$inferInsert;

/**
 * Transferências de jogadores
 */
export const transfers = mysqlTable("transfers", {
  id: int("id").autoincrement().primaryKey(),
  fromClubId: int("fromClubId"),
  toClubId: int("toClubId").notNull(),
  playerName: varchar("playerName", { length: 255 }).notNull(),
  playerOverall: int("playerOverall").notNull(),
  transferFee: decimal("transferFee", { precision: 10, scale: 2 }).notNull(),
  window: mysqlEnum("window", ["initial", "mid", "preMata"]).notNull(),
  status: mysqlEnum("status", ["pending", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Transfer = typeof transfers.$inferSelect;
export type InsertTransfer = typeof transfers.$inferInsert;

/**
 * Artilheiros e estatísticas de jogadores
 */
export const playerStats = mysqlTable("playerStats", {
  id: int("id").autoincrement().primaryKey(),
  clubId: int("clubId").notNull(),
  playerName: varchar("playerName", { length: 255 }).notNull(),
  playerOverall: int("playerOverall").notNull(),
  goals: int("goals").default(0).notNull(),
  assists: int("assists").default(0).notNull(),
  matches: int("matches").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PlayerStat = typeof playerStats.$inferSelect;
export type InsertPlayerStat = typeof playerStats.$inferInsert;

/**
 * Elencos dos clubes
 */
export const squads = mysqlTable("squads", {
  id: int("id").autoincrement().primaryKey(),
  clubId: int("clubId").notNull(),
  playerName: varchar("playerName", { length: 255 }).notNull(),
  playerOverall: int("playerOverall").notNull(),
  position: varchar("position", { length: 50 }),
  role: mysqlEnum("role", ["captain", "legend", "wildcard", "starter1", "starter2", "bench"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Squad = typeof squads.$inferSelect;
export type InsertSquad = typeof squads.$inferInsert;