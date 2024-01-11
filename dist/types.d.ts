import { Database } from "sqlite";
import * as sqlite3 from "sqlite3";
declare module "fastify" {
    interface FastifyInstance {
        db: Database<sqlite3.Database, sqlite3.Statement>;
    }
}
export declare enum Dbmode {
    READONLY,
    READWRITE,
    CREATE,
    SHAREDCACHE,
    PRIVATECACHE,
    URI,
    FULLMUTEX
}
export type DriverSettings = {
    verbose?: boolean;
    cached?: boolean;
    trace?: (data: any) => any;
};
export type SQLiteOptions = {
    dbFilename: string;
    mode?: Dbmode;
    driverSettings?: DriverSettings;
};
