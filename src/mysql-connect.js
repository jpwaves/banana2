import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});
console.log(db);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
// see this for more help setting up connect w mysql: https://livecodestream.dev/post/your-guide-to-building-a-nodejs-typescript-rest-api-with-mysql/
