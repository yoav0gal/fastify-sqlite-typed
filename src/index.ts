import fp from "fastify-plugin";
import { open, Database } from "sqlite";
import * as sqlite3 from "sqlite3";
import { Dbmode, SQLiteOptions } from "./types";
import type { FastifyInstance } from "fastify";
import { FastifyPluginAsync } from "fastify";

const DEFAULT_DB_MODE = Dbmode.READWRITE | Dbmode.CREATE | Dbmode.FULLMUTEX;

/**
 * Configs the sqlite3  driver based on the developer specifications
 */
function configDriver(verbose: boolean = false, cached: boolean = false) {
  const sqlite3VerboseApplied = verbose ? sqlite3.verbose() : sqlite3;

  const driver = cached
    ? sqlite3VerboseApplied.cached.Database
    : sqlite3VerboseApplied.Database;

  return driver;
}

declare module "fastify" {
  interface FastifyInstance {
    db: Database<sqlite3.Database, sqlite3.Statement>;
  }
}

export async function sqlitePlugin(
  fastify: FastifyInstance,
  options: SQLiteOptions
) {
  const { dbFilename, driverSettings = {}, mode = DEFAULT_DB_MODE } = options;
  const driver = configDriver(driverSettings?.verbose, driverSettings?.cached);
  const db = await open({
    filename: dbFilename,
    mode,
    driver,
  });
  const traceFunction = options.driverSettings?.trace;
  if (Boolean(traceFunction)) db.on("trace", traceFunction);
  fastify.decorate("db", db);
  fastify.addHook("onClose", async (fastifyInstance) => {
    await fastifyInstance.db.close();
  });
}

export const fpSqlitePlugin: FastifyPluginAsync<SQLiteOptions> = fp(
  sqlitePlugin,
  {
    fastify: "^5.x",
    name: "fastify-sqlite-typed",
  }
);
export default fpSqlitePlugin;

export type { Dbmode, SQLiteOptions } from "./types";
