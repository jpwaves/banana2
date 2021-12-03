import mysql from "mysql2/promise";
import { getCategories } from "./helpers.js";
import { db } from "./mysql-connect.js";

/*
Functions to mysql that we need:
- [ ] putting a meme into the db
- [ ] reading a meme into the db
- [ ] removing a meme from db
- [ ] adding badges to user
- [ ] adding a user
- [ ] reading user info
- [ ] adding a page
- [ ] adding memes to a page
- [ ] removing memes from a page
- [ ] adding/removing categories to a page (categories of page based on the memes in the page)
- [ ] get credentials
- [ ] insert credientials
*/

export const checkCredentials = async (username, passwd) => {
  const query = "SELECT true FROM appUser WHERE username = ? AND passwd = ?";
  const res = await db
    .execute(query, [username, passwd])
    .then(([res]) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });

  // if username, passwd combo exist in appuser, it'll return a value so res.length == 1
  // if it doesn't exist, it'll return nothing so res.length == 0
  return res.length > 0;
};

// returns 200 on success, 400 on failure
export const insertCredentials = async (username, passwd) => {
  const query =
    "INSERT INTO appUser (username, passwd, role) VALUES (?, ?, ?);";
  const res = await db
    .execute(query, [username, passwd, "user"])
    .then((res) => {
      return 200;
    })
    .catch((err) => {
      console.log(err);
      return 400;
    });
  return res;
};

const getTableSize = async (tableName) => {
  const query = "SELECT COUNT(*) AS count FROM ?";
  const [rows] = await db
    .execute(query, [tableName])
    .then(([res]) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return rows.count;
};

// reads a meme (by default is random)
export const readMeme = async (category = []) => {
  let query;
  const totalMemes = await getTableSize("meme");

  // +1 because mysql auto increments starting at 1
  const randIdx = Math.floor(Math.random() * totalMemes) + 1;
  if (category.length === 0) {
    // do random meme read
    query = "SELECT * FROM meme WHERE memeID = ?";
  } else {
    // do meme read of memes w/ at least one of the specified categories
    query = `SELECT * FROM meme INNER JOIN (SELECT * FROM memeCategory WHERE categoryID IN (${
      getCategories(category)[0]
    })) as mc USING (memeID)`;
  }
};

export const putMeme = (url, type, category) => {};

export const removeMeme = (id) => {};

export const addBadge = (badgeId, user) => {};
