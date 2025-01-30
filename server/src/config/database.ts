const sql = require("mssql");

const config = {
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

module.exports = {

  connect: () => sql.connect(config),
  sql,
}
