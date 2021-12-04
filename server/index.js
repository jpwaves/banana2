import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

app.post("/checkCreds", async (req, res) => {
  const query = "SELECT true FROM appUser WHERE username = ? AND passwd = ?";
  await db
    .execute(query, [req.body.username, req.body.password])
    .then(([data]) => {
      if (data.length > 0) {
        res.send({ result: true });
      } else {
        res.send({ result: false });
      }
    })
    .catch((err) => {
      throw err;
    });

  // if username, passwd combo exist in appuser, it'll return a value so res.length == 1
  // if it doesn't exist, it'll return nothing so res.length == 0
});

app.post("/create", async (req, res) => {
  const name = req.body.username;
  const pass = req.body.password;
  const role = "user";

  await db.query(
    "INSERT INTO appuser (username, passwd, role) VALUES (?, ?, ?)",
    [name, pass, role],
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.send("Registered");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("yay");
});
