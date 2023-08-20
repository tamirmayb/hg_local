const express = require('express');
const app = express();

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const { sendRecoveryEmail } = require('./email');

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

async function openDb() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
}

app.post('/loginUser', async (req, res) => {

  try {
    const db = await openDb();

    const email = req.body.email;
    const password = req.body.password;

    const getUserQuery = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    const user = await db.get(getUserQuery);
    if (user === undefined) {
      res.redirect('login.html');
    } else {
      res.redirect('dashbaord.html');
    }
  } catch (err) {
    console.error(err);
    res.redirect('login.html');
  }
});

app.put('/forgot', async (req, res) => {

  try {
    const db = await openDb();

    const email = req.query.email;

    const getUserQuery = `SELECT * FROM users WHERE email = '${email}'`;
    const user = await db.get(getUserQuery);
    if (user) {
      sendRecoveryEmail(user.email, user.password);
      res.redirect('forgot.html');
    } else {
      res.redirect('login.html');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Route to Login Page
app.get('/', (req, res) => {
  res.redirect('login.html');
});


app.get('/api/illustrations/:page?/:limit?', async (req,res) => {
  const db = await openDb();
  const page = req.params.page ?? 1; // Page number for paginator, default = 1
  const limit = req.params.limit ?? 10; // Max number of result per page for paginator, default = 10
  const offset = page * limit;

  await db.exec('UPDATE illustrations SET impressions = impressions + 1');
  const aggregateImpressionsQuery = `SELECT * FROM ILLUSTRATIONS LIMIT ${limit} OFFSET ${offset}`;
  const illustrations = await db.all(aggregateImpressionsQuery);
  res.send(illustrations);
});

app.put('/api/illustrations/:id', async (req,res) => {
  const db = await openDb();
  if(req.params.id === undefined || req.params.id === null) {
    res.status(404).send('Invalid illustration id');
  }
  const aggregateUsesQuery = `UPDATE illustrations SET uses = uses + 1 WHERE id = '${req.params.id}'`
  await db.exec(aggregateUsesQuery);
  res.send();
});

app.use(express.static('.'));

app.listen(777);
console.log('Listening to port 777');
