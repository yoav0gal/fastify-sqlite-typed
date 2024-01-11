import { Database } from "sqlite";
import * as sqlite3 from "sqlite3";

declare module "fastify" {
  interface FastifyInstance {
    db: Database<sqlite3.Database, sqlite3.Statement>;
  }
}

export enum Dbmode {
  READONLY = sqlite3.OPEN_READONLY,
  READWRITE = sqlite3.OPEN_READWRITE,
  CREATE = sqlite3.OPEN_CREATE,
  SHAREDCACHE = sqlite3.OPEN_SHAREDCACHE,
  PRIVATECACHE = sqlite3.OPEN_PRIVATECACHE,
  URI = sqlite3.OPEN_URI,
  FULLMUTEX = sqlite3.OPEN_FULLMUTEX,
}

export type DriverSettings = {
  /** Sets the execution mode to verbose to produce long stack traces. There is no way to reset this.
   * [Read more](https://github.com/TryGhost/node-sqlite3/wiki/Debugging)
   * @default false  */
  verbose?: boolean;
  /**`node-sqlite3` has a built-in database object cache to avoid opening the same database multiple times
   * @default false */
  cached?: boolean;
  /** The trace function will run whenever a query is run.
   * [Read more](https://github.com/TryGhost/node-sqlite3/wiki/Debugging)
   * @default undefined */
  trace?: (data: any) => any;
};

export type SQLiteOptions = {
  /**
   *  A path to you db file.
   * @example ./myDB.db
   * @Anonymous
   *  Values for Anonymous databases:
   * ":memory:" for an anonymous in-memory database,
   * "" for an anonymous disk-based database.
   * Warning!: Anonymous databases are not persisted and when closing the database
   * handle, their contents are lost.
   */
  dbFilename: string;
  /**
   * One or more of Dbmode.
   * The default value is (Dbmode.READWRITE | Dbmode.CREATE | Dbmode.FULLMUTEX)
   */
  mode?: Dbmode;

  driverSettings?: DriverSettings;
};
