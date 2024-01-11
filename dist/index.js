"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const sqlite_1 = require("sqlite");
const sqlite3 = __importStar(require("sqlite3"));
const types_1 = require("./types");
const DEFULT_DB_MODE = types_1.Dbmode.READWRITE | types_1.Dbmode.CREATE | types_1.Dbmode.FULLMUTEX;
function configDriver(verbose = false, cached = false) {
    const sqlite3VerboseApplied = verbose ? sqlite3.verbose() : sqlite3;
    const driver = cached
        ? sqlite3VerboseApplied.cached.Database
        : sqlite3VerboseApplied.Database;
    return driver;
}
exports.default = (0, fastify_plugin_1.default)(async (server, options) => {
    var _a;
    const { dbFilename, driverSettings = {}, mode = DEFULT_DB_MODE } = options;
    const driver = configDriver(driverSettings === null || driverSettings === void 0 ? void 0 : driverSettings.verbose, driverSettings === null || driverSettings === void 0 ? void 0 : driverSettings.cached);
    const db = await (0, sqlite_1.open)({
        filename: dbFilename,
        mode,
        driver,
    });
    const traceFunction = (_a = options.driverSettings) === null || _a === void 0 ? void 0 : _a.trace;
    if (Boolean(traceFunction))
        db.on("trace", traceFunction);
    server.decorate("db", db);
    server.addHook("onClose", async (fastifyInstance) => {
        await fastifyInstance.db.close();
    });
}, { fastify: "^4.x", name: "fastify-sqlite-typed" });
//# sourceMappingURL=index.js.map