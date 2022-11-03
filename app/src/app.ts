import express from 'express';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { indexRouter } from './routes/index';
import { dataRouter } from './routes/data';
import session from 'express-session';
import crypto from 'crypto';
import uuid from 'node-uuid';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config()

const app = express().disable("x-powered-by");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use(express.static(path.join("..","client", "build")));
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

// database on Render
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'hnlwomen_40ha',
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl : true
})

declare module "express-session" {
  interface SessionData {
    user: string;
  }
}


app.use(session({
  secret: "${process.env.SESSION_SECRET}",
  genid: function() {
    return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex");;
  },
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:  1000 * 60 * 60 * 24 },
}));



app.use('/', indexRouter);
app.use('/data', dataRouter);

export default {app};