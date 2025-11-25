var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// drizzle/schema.ts
var schema_exports = {};
__export(schema_exports, {
  clubs: () => clubs,
  matches: () => matches,
  playerStats: () => playerStats,
  squads: () => squads,
  standings: () => standings,
  transfers: () => transfers,
  users: () => users
});
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";
var users, clubs, standings, matches, transfers, playerStats, squads;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
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
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    clubs = mysqlTable("clubs", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      owner: varchar("owner", { length: 255 }).notNull(),
      logo: varchar("logo", { length: 255 }),
      color: varchar("color", { length: 7 }),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    standings = mysqlTable("standings", {
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
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    matches = mysqlTable("matches", {
      id: int("id").autoincrement().primaryKey(),
      round: int("round").notNull(),
      homeClubId: int("homeClubId").notNull(),
      awayClubId: int("awayClubId").notNull(),
      homeGoals: int("homeGoals"),
      awayGoals: int("awayGoals"),
      status: mysqlEnum("status", ["scheduled", "finished", "cancelled"]).default("scheduled").notNull(),
      date: timestamp("date"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    transfers = mysqlTable("transfers", {
      id: int("id").autoincrement().primaryKey(),
      fromClubId: int("fromClubId"),
      toClubId: int("toClubId").notNull(),
      playerName: varchar("playerName", { length: 255 }).notNull(),
      playerOverall: int("playerOverall").notNull(),
      transferFee: decimal("transferFee", { precision: 10, scale: 2 }).notNull(),
      window: mysqlEnum("window", ["initial", "mid", "preMata"]).notNull(),
      status: mysqlEnum("status", ["pending", "completed", "cancelled"]).default("pending").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    playerStats = mysqlTable("playerStats", {
      id: int("id").autoincrement().primaryKey(),
      clubId: int("clubId").notNull(),
      playerName: varchar("playerName", { length: 255 }).notNull(),
      playerOverall: int("playerOverall").notNull(),
      goals: int("goals").default(0).notNull(),
      assists: int("assists").default(0).notNull(),
      matches: int("matches").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    squads = mysqlTable("squads", {
      id: int("id").autoincrement().primaryKey(),
      clubId: int("clubId").notNull(),
      playerName: varchar("playerName", { length: 255 }).notNull(),
      playerOverall: int("playerOverall").notNull(),
      position: varchar("position", { length: 50 }),
      role: mysqlEnum("role", ["captain", "legend", "wildcard", "starter1", "starter2", "bench"]).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  addPlayerToSquad: () => addPlayerToSquad,
  createMatch: () => createMatch,
  createTransfer: () => createTransfer,
  getAllClubs: () => getAllClubs,
  getAllMatches: () => getAllMatches,
  getAllTransfers: () => getAllTransfers,
  getClubById: () => getClubById,
  getDb: () => getDb,
  getMatchesByRound: () => getMatchesByRound,
  getPlayerStatsByClub: () => getPlayerStatsByClub,
  getSquadByClub: () => getSquadByClub,
  getStandings: () => getStandings,
  getTopScorers: () => getTopScorers,
  getTransfersByClub: () => getTransfersByClub,
  getUserByOpenId: () => getUserByOpenId,
  updateMatch: () => updateMatch,
  updatePlayerStats: () => updatePlayerStats,
  updateSquadPlayer: () => updateSquadPlayer,
  updateStanding: () => updateStanding,
  upsertUser: () => upsertUser
});
import { eq, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
async function getDb() {
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
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getAllClubs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(clubs).orderBy(asc(clubs.id));
}
async function getClubById(clubId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(clubs).where(eq(clubs.id, clubId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getStandings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(standings).orderBy(asc(standings.position));
}
async function updateStanding(clubId, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(standings).set(data).where(eq(standings.clubId, clubId));
}
async function getAllMatches() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(matches).orderBy(asc(matches.round), asc(matches.id));
}
async function getMatchesByRound(round) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(matches).where(eq(matches.round, round)).orderBy(asc(matches.id));
}
async function createMatch(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(matches).values(data);
  const matchId = result.insertId;
  const created = await db.select().from(matches).where(eq(matches.id, matchId)).limit(1);
  return created[0];
}
async function updateMatch(matchId, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(matches).set(data).where(eq(matches.id, matchId));
}
async function getAllTransfers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(transfers).orderBy(desc(transfers.createdAt));
}
async function getTransfersByClub(clubId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(transfers).where(eq(transfers.toClubId, clubId)).orderBy(desc(transfers.createdAt));
}
async function createTransfer(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(transfers).values(data);
  const transferId = result.insertId;
  const created = await db.select().from(transfers).where(eq(transfers.id, transferId)).limit(1);
  return created[0];
}
async function getTopScorers(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(playerStats).orderBy(desc(playerStats.goals)).limit(limit);
}
async function getPlayerStatsByClub(clubId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(playerStats).where(eq(playerStats.clubId, clubId)).orderBy(desc(playerStats.goals));
}
async function updatePlayerStats(playerId, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(playerStats).set(data).where(eq(playerStats.id, playerId));
}
async function getSquadByClub(clubId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(squads).where(eq(squads.clubId, clubId)).orderBy(asc(squads.role));
}
async function addPlayerToSquad(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(squads).values(data);
  const squadId = result.insertId;
  const created = await db.select().from(squads).where(eq(squads.id, squadId)).limit(1);
  return created[0];
}
async function updateSquadPlayer(squadId, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(squads).set(data).where(eq(squads.id, squadId));
}
var _db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_env();
    _db = null;
  }
});

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/oauth.ts
init_db();

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
init_db();
init_env();
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/championship.ts
import { z as z2 } from "zod";
init_db();
var championshipRouter = router({
  // ===== CLUBS =====
  clubs: router({
    getAll: publicProcedure.query(async () => {
      return getAllClubs();
    }),
    getById: publicProcedure.input(z2.number()).query(async ({ input }) => {
      return getClubById(input);
    }),
    create: protectedProcedure.input(
      z2.object({
        name: z2.string(),
        owner: z2.string(),
        color: z2.string().optional(),
        logo: z2.string().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Only admins can create clubs");
      }
      const db = await (await Promise.resolve().then(() => (init_db(), db_exports))).getDb();
      if (!db) throw new Error("Database not available");
      const { clubs: clubsTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const result = await db.insert(clubsTable).values(input);
      const clubId = result.insertId;
      if (!clubId) throw new Error("Failed to create club");
      return getClubById(clubId);
    })
  }),
  // ===== STANDINGS =====
  standings: router({
    getAll: publicProcedure.query(async () => {
      return getStandings();
    }),
    update: protectedProcedure.input(
      z2.object({
        clubId: z2.number(),
        position: z2.number().optional(),
        played: z2.number().optional(),
        wins: z2.number().optional(),
        draws: z2.number().optional(),
        losses: z2.number().optional(),
        goalsFor: z2.number().optional(),
        goalsAgainst: z2.number().optional(),
        goalDifference: z2.number().optional(),
        points: z2.number().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Only admins can update standings");
      }
      await updateStanding(input.clubId, input);
      return { success: true };
    })
  }),
  // ===== MATCHES =====
  matches: router({
    getAll: publicProcedure.query(async () => {
      return getAllMatches();
    }),
    getByRound: publicProcedure.input(z2.number()).query(async ({ input }) => {
      return getMatchesByRound(input);
    }),
    create: protectedProcedure.input(
      z2.object({
        round: z2.number(),
        homeClubId: z2.number(),
        awayClubId: z2.number(),
        date: z2.date().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Only admins can create matches");
      }
      return createMatch(input);
    }),
    update: protectedProcedure.input(
      z2.object({
        matchId: z2.number(),
        homeGoals: z2.number().optional(),
        awayGoals: z2.number().optional(),
        status: z2.enum(["scheduled", "finished", "cancelled"]).optional()
      })
    ).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Only admins can update matches");
      }
      const { matchId, ...data } = input;
      await updateMatch(matchId, data);
      return { success: true };
    })
  }),
  // ===== TRANSFERS =====
  transfers: router({
    getAll: publicProcedure.query(async () => {
      return getAllTransfers();
    }),
    getByClub: publicProcedure.input(z2.number()).query(async ({ input }) => {
      return getTransfersByClub(input);
    }),
    create: protectedProcedure.input(
      z2.object({
        toClubId: z2.number(),
        fromClubId: z2.number().optional(),
        playerName: z2.string(),
        playerOverall: z2.number(),
        transferFee: z2.string(),
        window: z2.enum(["initial", "mid", "preMata"])
      })
    ).mutation(async ({ input }) => {
      return createTransfer(input);
    })
  }),
  // ===== PLAYER STATS =====
  playerStats: router({
    getTopScorers: publicProcedure.input(z2.number().optional()).query(async ({ input }) => {
      return getTopScorers(input || 10);
    }),
    getByClub: publicProcedure.input(z2.number()).query(async ({ input }) => {
      return getPlayerStatsByClub(input);
    }),
    update: protectedProcedure.input(
      z2.object({
        playerId: z2.number(),
        goals: z2.number().optional(),
        assists: z2.number().optional(),
        matches: z2.number().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Only admins can update player stats");
      }
      const { playerId, ...data } = input;
      await updatePlayerStats(playerId, data);
      return { success: true };
    })
  }),
  // ===== SQUADS =====
  squads: router({
    getByClub: publicProcedure.input(z2.number()).query(async ({ input }) => {
      return getSquadByClub(input);
    }),
    addPlayer: protectedProcedure.input(
      z2.object({
        clubId: z2.number(),
        playerName: z2.string(),
        playerOverall: z2.number(),
        position: z2.string().optional(),
        role: z2.enum(["captain", "legend", "wildcard", "starter1", "starter2", "bench"])
      })
    ).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Only admins can add players to squads");
      }
      return addPlayerToSquad(input);
    }),
    updatePlayer: protectedProcedure.input(
      z2.object({
        squadId: z2.number(),
        playerName: z2.string().optional(),
        playerOverall: z2.number().optional(),
        position: z2.string().optional(),
        role: z2.enum(["captain", "legend", "wildcard", "starter1", "starter2", "bench"]).optional()
      })
    ).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Only admins can update squad players");
      }
      const { squadId, ...data } = input;
      await updateSquadPlayer(squadId, data);
      return { success: true };
    })
  })
});

// server/routers.ts
var appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  championship: championshipRouter
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      // O código-fonte principal (src) ainda está em client/src, então mantemos o alias
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  // MUDANÇA CRÍTICA 1: Aponta para a raiz, onde o index.html está agora
  root: path.resolve(import.meta.dirname),
  // MUDANÇA CRÍTICA 2: A pasta public agora está na raiz
  publicDir: path.resolve(import.meta.dirname, "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
