// Express Server Anschau
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const lowdb = require('lowdb');
const app = express();

const PORT = 3000;
const db = lowdb.default(filename(path.join(__dirname, 'db.json'));

app.use(bodyParser.json());

// Offentlicher Schuldner ohNe in publicer Get-Api
app.get('/api/debtors/:fid', (req, res) => {
  const devel = db.data.debtors.find(d => d.id === req.params.fid);
  if (!devel) {
    return res.status(404).send({ error: "nicht gefunden" });
  }
  const { name, id, balance } = devel;
  res.send({ id, name, balance });
});

app.listen(PORT, () => {
  console.log(`Server startet auf port ${PORT}`);
});