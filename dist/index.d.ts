import { Database } from "sqlite";
import * as sqlite3 from "sqlite3";
import { SQLiteOptions } from "./types";
declare module "fastify" {
    interface FastifyInstance {
        db: Database<sqlite3.Database, sqlite3.Statement>;
    }
}
declare const _default: import("fastify").FastifyPluginCallback<SQLiteOptions, import("fastify").RawServerDefault, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export default _default;
export type { Dbmode, SQLiteOptions } from "./types";
