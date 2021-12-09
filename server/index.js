import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import * as dotenv from "dotenv";
import { getCategories } from "./helpers.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.SERVER_PORT;

// Create connection to MySQL database from environment variables
export const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

// Checks if the given username-password combo is registered with the app
// Returns object with true if the combo exists, false otherwise
app.post("/checkCreds", async (req, res) => {
  const query = "SELECT true FROM appUser WHERE username = ? AND passwd = ?";
  await db
    .execute(query, [req.body.username, req.body.password])
    .then(([data]) => {
      // if username, passwd combo exist in appuser, it'll return a value so res.length == 1
      // if it doesn't exist, it'll return nothing so res.length == 0
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

// Adds a user (username and password) to the app
app.post("/createUser", async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  if (username === "" && password === "") {
    res.sendStatus(400);
    return;
  }
  const query =
    "INSERT INTO appUser (username, passwd, role) VALUES (?, ?, ?);";
  await db
    .execute(query, [username, password, "user"])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Gets a random memes from the meme table in the MySQL database
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

// Adds a new meme (must be assigned an existing category)
app.post("/createMeme", async (req, res) => {
  const { imgUrl, type, category } = req.body;

  let cats;
  try {
    cats = await getCategories([category]);
  } catch (err) {
    res.status(400).send(err);
    return;
  }

  // knows category exists at this point

  // insert meme
  let queryMeme = "INSERT INTO meme (img, srcType) VALUES (?, ?)";
  const memeId = await db
    .execute(queryMeme, [imgUrl, type])
    .then(([data]) => {
      return data.insertId;
    })
    .catch((err) => {
      res.status(400).send(err);
      return null;
    });
  if (memeId === null) {
    return;
  }
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

// Creates a page for specified user with the given title and description
// NOTE: the description can be an empty string
app.post("/createPage", async (req, res) => {
  const { title, desc, userId } = req.body;
  const query =
    "INSERT INTO memePage (title, description, creatorID) VALUES (?, ?, ?)";
  await db
    .execute(query, [title, desc, userId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Updates the page's title (can't be blank)
// Assumes the given input was already validated
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

// Updates the page's description
// Assumes the given input was already validated
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

// Adds a given meme to the specified page
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

// Increases the number of memes a user has viewed
app.post("/incMemeViewCount", async (req, res) => {
  const { userID } = req.body;
  const query =
    "UPDATE appUser SET memesViewed = memesViewed + 1 WHERE userID = ?";
  await db
    .execute(query, [userID])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Updates the recorded number of days since the user registered
// NOTE: Called only after the user logs in
app.post("/updateDaysRegistered", async (req, res) => {
  const { userID } = req.body;
  const dateRegistered = await db
    .execute("SELECT dateRegistered FROM appUser WHERE userID = ?", [userID])
    .then(([data]) => {
      return data[0].dateRegistered;
    })
    .catch((err) => {
      res.status(500).send(err);
      return "";
    });

  if (!dateRegistered) {
    return;
  }

  const dateDiff = Math.floor(
    (new Date().getTime() - new Date(dateRegistered).getTime()) /
      (1000 * 3600 * 24)
  );

  const query = "UPDATE appUser SET daysSinceRegister = ? WHERE userID = ?";
  await db
    .execute(query, [dateDiff, userID])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Remove a given meme from the specified page
app.post("/removeMemeFromPage", async (req, res) => {
  const { pageId, memeId } = req.body;
  const query = "DELETE FROM memesInPage WHERE pageID = ? AND memeID = ?";
  await db
    .execute(query, [pageId, memeId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Get all the memes for a specified page
app.post("/getPageMemes", async (req, res) => {
  const { pageId } = req.body;
  const query =
    "SELECT memeID, img FROM meme JOIN memesInPage USING (memeID) WHERE pageID = ?";
  await db
    .execute(query, [pageId])
    .then(([data]) => {
      res.send({ result: data });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Get all the categories associated with the specified page
app.post("/getPageCategories", async (req, res) => {
  const { pageId } = req.body;
  const query =
    "SELECT * FROM category JOIN pageCategory USING (categoryID) WHERE pageID = ?";
  await db
    .execute(query, [pageId])
    .then(([data]) => {
      res.send({ result: data });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Get all the pages the user has made
app.post("/getUserPages", async (req, res) => {
  const { userID } = req.body;
  const query =
    "SELECT pageID, title, description FROM memePage WHERE creatorID = ?";
  await db
    .execute(query, [userID])
    .then(([data]) => {
      res.send({ result: data });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Relates a meme the user has favorited to the user
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

// Checks if a meme was favorited by the user
app.post("/checkFav", async (req, res) => {
  const { userId, memeId } = req.body;
  const query = "SELECT true FROM favorites WHERE userId = ? AND memeId = ?";
  await db
    .execute(query, [userId, memeId])
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

// Gets the user's id
app.post("/getUserID", async (req, res) => {
  const { username } = req.body;
  const query = "SELECT userID FROM appUser WHERE username = ?;";
  await db
    .execute(query, [username])
    .then(([data]) => {
      res.send({ result: data[0].userID });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Gets the badges the user has acquired
app.post("/getUserBadges", async (req, res) => {
  const { userId } = req.body;
  const query =
    "SELECT name FROM appUser LEFT JOIN userAccumulatedBadges USING (userID) LEFT JOIN badge USING (badgeID) WHERE userID = ?;";
  await db
    .execute(query, [userId])
    .then(([data]) => {
      res.send({ result: data });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Gets the user's role
app.post("/getRole", async (req, res) => {
  const { userID } = req.body;
  const query = "SELECT role FROM appUser WHERE userID = ?;";
  await db
    .execute(query, [userID])
    .then(([data]) => {
      res.send({ result: data[0].role });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Gets the image link for a specific meme
app.post("/getMemeFromID", async (req, res) => {
  const { memeId } = req.body;
  const query = "SELECT img FROM meme WHERE memeID = ?";
  await db
    .execute(query, [memeId])
    .then(([data]) => {
      res.send({ result: data[0].img });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Removes a meme when given the meme's id
app.post("/deleteMeme", async (req, res) => {
  const { memeId } = req.body;
  const query = "DELETE FROM meme WHERE memeID = ?";
  await db
    .execute(query, [memeId])
    .then(([data]) => {
      res.send({ result: "Meme " + memeId + " deleted!" });
    })
    .catch((err) => {
      res.send({ result: "Meme " + memeId + " unable to be deleted!" });
    });
});

// Get the names of all the categories
app.post("/getCategories", async (req, res) => {
  const query = "SELECT name FROM category;";
  await db
    .execute(query)
    .then(([data]) => {
      res.send({ result: data });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Update the image link and source type of the specified meme
// NOTE: the new image link must be valid
app.post("/updateMeme", async (req, res) => {
  const { memeId, link, type } = req.body;
  const query = "UPDATE meme SET img = ?, srcType = ? WHERE memeID = ?";
  await db
    .execute(query, [link, type, memeId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Start express server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
