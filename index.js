const express = require('express');
const basicAuth = require('basic-auth');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello, world, Dockerized Nodejs project (from EC2)'));

app.get('/secret', (req, res) => {
  const user = basicAuth(req);
  if (!user || user.name !== process.env.USERNAME || user.pass !== process.env.PASSWORD) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send('Access denied');
  }
  res.send(process.env.SECRET_MESSAGE);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
