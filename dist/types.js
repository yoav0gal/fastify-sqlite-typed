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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dbmode = void 0;
const sqlite3 = __importStar(require("sqlite3"));
var Dbmode;
(function (Dbmode) {
    Dbmode[Dbmode["READONLY"] = sqlite3.OPEN_READONLY] = "READONLY";
    Dbmode[Dbmode["READWRITE"] = sqlite3.OPEN_READWRITE] = "READWRITE";
    Dbmode[Dbmode["CREATE"] = sqlite3.OPEN_CREATE] = "CREATE";
    Dbmode[Dbmode["SHAREDCACHE"] = sqlite3.OPEN_SHAREDCACHE] = "SHAREDCACHE";
    Dbmode[Dbmode["PRIVATECACHE"] = sqlite3.OPEN_PRIVATECACHE] = "PRIVATECACHE";
    Dbmode[Dbmode["URI"] = sqlite3.OPEN_URI] = "URI";
    Dbmode[Dbmode["FULLMUTEX"] = sqlite3.OPEN_FULLMUTEX] = "FULLMUTEX";
})(Dbmode || (exports.Dbmode = Dbmode = {}));
//# sourceMappingURL=types.js.map