<div disply="flex"> <a href="https://fastify.io/">
    <img
      src="https://github.com/fastify/graphics/raw/HEAD/fastify-landscape-outlined.svg"
      width="400"
      height="auto"
    />
      <img
      src="https://download.logo.wine/logo/SQLite/SQLite-Logo.wine.png"
      width="400"
      height="auto"
    />
   
  </a>
</div>

# Fastify SQLite Typed Plugin

[![Beta](https://img.shields.io/badge/status-beta-orange.svg)](https://github.com/yoav0gal/fastify-sqlite-typed)
[![npm version](https://img.shields.io/npm/v/fastify-sqlite-typed?style=flat-square)](https://www.npmjs.com/package/fastify-sqlite-typed)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![License](https://img.shields.io/npm/l/fastify-hana.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)

SQLite integration plugin for [Fastify](https://www.fastify.io/)

Effortlessly incorporate SQLite databases into your Fastify applications using `fastify-sqlite-typed`. This plugin leverages `node-sqlite3` and `node-sqlite` for effective database operations.

> **For Fastify V 4.X.X [click here](https://github.com/yoav0gal/fastify-sqlite-typed/tree/Fastify-V4.x.x)**

## Additional Resources

- `node-sqlite3` Documentation: [https://github.com/TryGhost/node-sqlite3](https://github.com/TryGhost/node-sqlite3)
- `node-sqlite` Documentation: [https://github.com/kriasoft/node-sqlite](https://github.com/kriasoft/node-sqlite)
- To work effectively with the database, it's recommended to read [node-sqlite3 Wiki](https://github.com/TryGhost/node-sqlite3/wiki).

## Features

- Seamless integration with Fastify applications
- Configurable SQLite driver
- Multiple database modes supported
- Debugging capabilities with query tracing
- Support for both in-memory and disk-based databases

## Installation

```bash
npm install fastify-sqlite-typed
# or
yarn add fastify-sqlite-typed
```

## Usage

Import and register the plugin with your Fastify instance, and execute a sample query:

```javascript
import fastify from "fastify";
// With fastify-plugin
import { fpSqlitePlugin } from "fastify-sqlite-typed"; 
// Without fastify-plugin
// import { sqlitePlugin } from "fastify-sqlite-typed";

const app = fastify();

app.register(fpSqlitePlugin, {
  dbFilename: "./myDB.db",
  // additional options
});

// Example query
app.get("/users", async (request, reply) => {
  const users = await app.db.all("SELECT * FROM users");
  reply.send(users);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})
```

## Options

| Option           | Description                                                                | Type     | Default                             |
| ---------------- | -------------------------------------------------------------------------- | -------- | ----------------------------------- |
| `dbFilename`     | Path to the database file (`:memory:` for in-memory, `""` for disk-based). | String   | None                                |
| `mode`           | Database mode, combining `Dbmode` values.                                  | `Dbmode` | `READWRITE \| CREATE \| FULLMUTEX`  |
| `driverSettings` | Settings for the SQLite driver (see `DriverSettings` below).               | Object   | [Default settings](#driversettings) |

### `DriverSettings`

| Option    | Description                                     | Type     | Default |
| --------- | ----------------------------------------------- | -------- | ------- |
| `verbose` | Enables verbose mode for detailed stack traces. | Boolean  | `false` |
| `cached`  | Enables database object caching.                | Boolean  | `false` |
| `trace`   | Function to run on each query execution.        | Function | None    |

## License

Licensed under [MIT](https://choosealicense.com/licenses/mit/).
