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
const db = lowdb.default(filename(path.join(__dirname, 'db.json')));

app.use(bodyParser.json());

app.post("/api/debtors", async (req, res) => {
  const { name, password } = req.body;
  const id = uuid.v4();
  const hash = await bcrypt.hash(password, 10);
  const record = {
    id,
    name,
    password: hash,
    balance: 0
  };
  db.data.debtors.push(record);

  const url = `http://localhost:3000/debtor/view/${id}`;
  const qr = await qrcode.toDataURL(url);

  res.send({
    ...record,
    qrCode: qr
  });
});

app.get('/', (req, res) => {
  res.send("Schulden-Manager App");
});

app.listen(PORT, () => {
  console.log(`Server startet auf port ${PORT}`);
});