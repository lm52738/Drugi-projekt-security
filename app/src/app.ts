import express from 'express';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { indexRouter } from './routes/index';
import { dataRouter } from './routes/data';
dotenv.config()

const app = express();
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

if (externalUrl) {
  const hostname = '127.0.0.1';
  app.listen(port, hostname, () => {
  console.log(`Server locally running at http://${hostname}:${port}/ and from
  outside on ${externalUrl}`);
  });
} else {
  https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, function () {
  console.log(`Server running at https://localhost:${port}/`);
  })
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// database on Render
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'hnlwomen_40ha',
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl : true
})

app.use('/', indexRouter);
app.use('/data', dataRouter);

export default {app};