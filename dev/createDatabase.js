/**
 * This script is used to populate database with fake data
 */


const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const fakeImages = () => {
  return Array.from(Array(100)).map((_,i) => `fakeImage${i}.png`)  
};

async function openDb() {
  return open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
}

(async () => {
  const db = await openDb();

  // (re-)create users table
  await db.exec("DROP TABLE IF EXISTS users;");
  await db.exec("CREATE TABLE users (email TEXT PRIMARY KEY, password TEXT);");
  await db.exec('INSERT INTO users VALUES("test@example.org", "passw0rd");');

  // (re-)create illustrations table
  await db.exec("DROP TABLE IF EXISTS illustrations;");
  await db.exec(`CREATE TABLE illustrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        impressions INTEGER DEFAULT 0, 
        uses INTEGER DEFAULT 0
        );`);
  await db.exec(`INSERT INTO illustrations(name) VALUES${fakeImages().map((x) => `("${x}") `)};`);
})();
