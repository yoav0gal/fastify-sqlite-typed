import fp from "fastify-plugin";
import { open, Database } from "sqlite";
import * as sqlite3 from "sqlite3";
import { Dbmode, SQLiteOptions } from "./types";
// import { FastifyPluginAsync } from "fastify";

const DEFULT_DB_MODE = Dbmode.READWRITE | Dbmode.CREATE | Dbmode.FULLMUTEX;

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

// Plugin to add SQLite support

export default fp<SQLiteOptions>(
  async (server, options) => {
    const { dbFilename, driverSettings = {}, mode = DEFULT_DB_MODE } = options;

    const driver = configDriver(
      driverSettings?.verbose,
      driverSettings?.cached
    );

    const db = await open({
      filename: dbFilename,
      mode,
      driver,
    });

    const traceFunction = options.driverSettings?.trace;

    if (Boolean(traceFunction)) db.on("trace", traceFunction);

    server.decorate("db", db);

    server.addHook("onClose", async (fastifyInstance) => {
      await fastifyInstance.db.close();
    });
  },
  { fastify: "^4.x", name: "fastify-sqlite-typed" }
);

export type { Dbmode, SQLiteOptions } from "./types";
