// Express Server basis
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send("Schulden-Manager App laef");
});

app.listen(PORT, () => {
  console.log(`Server started auf port ${PORT}`);
});