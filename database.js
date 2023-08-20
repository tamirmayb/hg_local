const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

async function openDb() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
}
exports.openDb = openDb;
