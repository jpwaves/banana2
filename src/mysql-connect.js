import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

export const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

// await db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
// see this for more help setting up connect w mysql: https://livecodestream.dev/post/your-guide-to-building-a-nodejs-typescript-rest-api-with-mysql/

// console.log("BEFORE");
// const a = await db
//   .query("SELECT b.* FROM (SELECT * FROM category) as b")
//   .then(([res]) => {
//     console.log(res);
//     return res;
//   })
//   .catch((err) => {
//     throw err;
//   });
// console.log(a.length);
// console.log("AFTER");
