const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const _public = path.join(__dirname, './');

app.use(express.static(_public));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/*', (req, res) => {
  res.sendFile(`${_public}/index.html`);
});

const port = process.ENV.port || 3000;

app.listen(port, () => {
  console.log('particles app listening');
});