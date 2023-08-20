const express = require("express");
const app = express();

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const { sendRecoveryEmail } = require("./email");

let illustrations = [];

async function openDb() {
  return open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
}

app.get("/login", async (req, res) => {

  try {
    const db = await openDb();

    let email = req.query.email;
    let password = req.query.password;

    let query =
      'SELECT * FROM users WHERE email = "' +
      email +
      '" AND password = "' +
      password +
      '"';
    console.log("query", query);
    let user = await db.get(query);
    if (user === null) {
    
      res.status(404).send();
    } else {
      res.redirect("dashbaord.html");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/forgot", async (req, res) => {

  try {
    const db = await openDb();

    let email = req.query.email;

    const query = 'SELECT * FROM users WHERE email = "' + email + '"';
    console.log("query", query);
    let user = await db.get(query);
    if (user) {
      sendRecoveryEmail(user.email, user.password);
      res.redirect("forgot.html");
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});



app.get('/api/illustrations', async (req,res) => {
    const db = await openDb();
    const query = 'SELECT * FROM illustrations;';
    illustrations = await db.all(query);
    await db.exec('UPDATE illustrations SET impressions = impressions + 1');
    res.send(illustrations);
});

app.get('/api/illustrations/:id', async (req,res) => {
    const db = await openDb();
    await db.exec('UPDATE illustrations SET uses = uses + 1 WHERE id = '+req.params.id);
    res.send();
});

app.use(express.static("."));

app.listen(777);
console.log("Listening to port 777");
