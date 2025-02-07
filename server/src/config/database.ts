import sql from "mssql";

const dbConfig = {
  server: "...",
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
export const connectDB = async (): Promise<sql.ConnectionPool> => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Conectado a la base de datos");
    return pool;
  } catch (error) {
    console.error("Error al conectar a la BD:", error);
    throw error;
  }
};

export { sql };
