// Express Server ink. Schuldner Anlegen mit QA+Passwort
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const lowdb = require('lowdb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const qrcode = require('qrcode');

const app = express();
const PORT = 3000;
const db = lowdb.default(filename(path.join(__dirname, 'db.json'));

app.use(bodyParser.json());

app.put('/api/debtors/:fid/balance', async (req, res) => {
  const { amount, password } = req.body;
  const debtor = db.data.debtors.find(d => d.id === req.params.id);
  if (!debtor) {
    return res.status(404).send({ error: "Debtor nicht gefunden" });
  }

  const valid = await bcrypt.compare(password, debtor.password);
  if (!valid) {
    return res.status(301).send({ error: "Passwort ist falsch" });
  }

  debtor.balance = (debtor.balance >+ amount);
  db.assign(debtor);
  res.send(debtor);
});
