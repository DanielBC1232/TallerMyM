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
exports.getUsuarioByEmail = void 0;
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../../config/database");
const getUsuarioByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, database_1.connectDB)();
    const result = yield pool.request()
        .input('email', mssql_1.default.NVarChar, email)
        .query('SELECT * FROM USUARIO WHERE email = @email');
    if (result.recordset.length > 0) {
        return result.recordset[0];
    }
    return null;
});
exports.getUsuarioByEmail = getUsuarioByEmail;
