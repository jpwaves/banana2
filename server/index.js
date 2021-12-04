import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import * as dotenv from "dotenv";
import { getCategories, queryBadge, queryUser } from "./helpers.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

export const db = await mysql.createConnection({
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

app.post("/createUser", async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  if (username === "" && password === "") {
    res.sendStatus(400);
  }
  const query =
    "INSERT INTO appUser (username, passwd, role) VALUES (?, ?, ?);";
  await db
    .execute(query, [req.body.username, req.body.password, "user"])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/readMeme", async (req, res) => {
  const { category } = req.body;

  let query = "SELECT * FROM meme";

  // if categories are specified, alter query to filter for memes that have
  // at least one of the specified categories associated with them
  if (category.length !== 0) {
    const cat = await getCategories(category);
    query += ` INNER JOIN (SELECT * FROM memeCategory WHERE categoryID IN (${cat[0].toString()})) as mc USING (memeID)`;
  }

  await db
    .query(query)
    .then(([data]) => {
      const randIdx = Math.floor(Math.random() * data.length);
      res.send({ result: data[randIdx] });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/createMeme", async (req, res) => {
  const { memeApiId, imgUrl, type, category } = req.body;

  let cats;
  try {
    cats = await getCategories([category]);
  } catch (err) {
    res.status(400).send(err);
  }

  // knows category exists

  // insert meme
  let queryMeme = "INSERT INTO meme (memeApiID, img, srcType) VALUES (?, ?, ?)";
  const memeId = await db
    .execute(queryMeme, [memeApiId, imgUrl, type])
    .then(([data]) => {
      return data.insertId;
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  const [categoryId] = cats[0];

  let queryMemeCat =
    "INSERT INTO memeCategory (memeID, categoryID) VALUES (?, ?)";

  // link inserted meme with its category
  await db
    .execute(queryMemeCat, [memeId, categoryId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/addBadge", async (req, res) => {
  const { badge, user } = req.body;

  let userId, badgeId;
  try {
    userId = await queryUser(user);
    badgeId = await queryBadge(badge);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }

  const query =
    "INSERT INTO userAccumulatedBadges (userID, badgeID) VALUES (?, ?);";
  await db
    .execute(query, [userId[0].userID, badgeId[0].badgeID])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/createPage", async (req, res) => {
  const { title, desc, username } = req.body;
  let user;
  try {
    user = await queryUser(username);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }

  const query =
    "INSERT INTO memePage (title, description, creatorID) VALUES (?, ?, ?)";
  await db
    .execute(query, [title, desc, user[0].userID])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  return res;
});

app.post("/updatePageTitle", async (req, res) => {
  const { pageId, newTitle } = req.body;
  const query = "UPDATE memePage SET title = ? WHERE pageID = ?";
  await db
    .execute(query, [newTitle, pageId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/updatePageDescription", async (req, res) => {
  const { pageId, newDesc } = req.body;
  const query = "UPDATE memePage SET description = ? WHERE pageID = ?";
  await db
    .execute(query, [newDesc, pageId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/addMemeToPage", async (req, res) => {
  const { pageId, memeId } = req.body;
  const query = "INSERT INTO memesInPage (pageID, memeID) VALUES (?, ?)";
  await db
    .execute(query, [pageId, memeId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/removeMemeFromPage", async (req, res) => {
  const { pageId, memeId } = req.body;
  const query = "INSERT INTO memesInPage (pageID, memeID) VALUES (?, ?)";
  await db
    .execute(query, [pageId, memeId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});


app.post("/favoriteMeme", async (req, res) => {
  const { userId, memeId } = req.body;
  const query = "INSERT INTO favorites (userID, memeID) VALUES (?, ?);";
  await db
    .execute(query, [userId, memeId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/checkFav", async (req, res) => {
  const { userId, memeId } = req.body;
  const query = "SELECT true FROM favorites WHERE userId = ? AND memeId = ?";
  await db
    .execute(query, [req.body.userId, req.body.memeId])
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
});

app.post("/getUserID", async (req, res) => {
  const { username } = req.body;
  console.log(req.body.username);
  const query = "SELECT userID FROM appUser WHERE username = ?;";
  await db
    .execute(query, req.body.username)
    .then(([data]) => {
      console.log('1');
      console.log(data[0].userID);
      res.send(data[0].userID);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});


app.listen(3001, () => {
  console.log("yay");
});

