"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = exports.connectDB = void 0;
const mssql_1 = __importDefault(require("mssql"));
exports.sql = mssql_1.default;
const dbConfig = {
    server: "DAN",
    database: "MYM_DB",
    user: "MYM_User",
    password: "T4ll3RMyM-",
    options: {
        //trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};
// Función de conexión
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(dbConfig);
        console.log("Conectado a la base de datos");
        return pool;
    }
    catch (error) {
        console.error("Error al conectar a la BD:", error);
        throw error;
    }
});
exports.connectDB = connectDB;
