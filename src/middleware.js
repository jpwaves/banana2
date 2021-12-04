import mysql from "mysql2/promise";
import {
  getCategories,
  queryBadge,
  queryMemeUsingApiId,
  queryUser,
} from "../server/helpers.js";
import { db } from "./mysql-connect.js";

/*
Functions to mysql that we need:
- [x] putting a meme into the db
- [x] reading a meme from the db
- [x] adding badges to user
- [x] adding a page
- [x] edit description of page
- [x] edit title of page
- [x] adding memes to a page
- [x] removing memes from a page
- [x] get credentials
- [x] insert credientials
*/

// export const checkCredentials = async (username, passwd) => {
//   const query = "SELECT true FROM appUser WHERE username = ? AND passwd = ?";
//   const res = await db
//     .execute(query, [username, passwd])
//     .then(([res]) => {
//       return res;
//     })
//     .catch((err) => {
//       throw err;
//     });

//   // if username, passwd combo exist in appuser, it'll return a value so res.length == 1
//   // if it doesn't exist, it'll return nothing so res.length == 0
//   return res.length > 0;
// };

// returns 200 on success, 400 on failure
// export const insertCredentials = async (username, passwd) => {
//   const query =
//     "INSERT INTO appUser (username, passwd, role) VALUES (?, ?, ?);";
//   const res = await db
//     .execute(query, [username, passwd, "user"])
//     .then((res) => {
//       return 200;
//     })
//     .catch((err) => {
//       console.log(err);
//       return 400;
//     });
//   return res;
// };

// reads a meme (by default is random)
// export const readMeme = async (category = []) => {
//   let query = "SELECT * FROM meme";

//   // if categories are specified, alter query to filter for memes that have
//   // at least one of the specified categories associated with them
//   if (category.length !== 0) {
//     const cat = await getCategories(category);
//     query += ` INNER JOIN (SELECT * FROM memeCategory WHERE categoryID IN (${cat[0].toString()})) as mc USING (memeID)`;
//   }

//   const res = await db
//     .query(query)
//     .then(([res]) => {
//       return res;
//     })
//     .catch((err) => {
//       throw err;
//     });

//   const randIdx = Math.floor(Math.random() * res.length);
//   return res[randIdx];
// };

// insert meme
// returns 200 on success, 400 on failure
// export const insertMeme = async (memeApiId, imgUrl, type, category) => {
//   let cats;
//   try {
//     cats = await getCategories([category]);
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }

//   // knows category exists

//   // insert meme
//   let queryMeme = "INSERT INTO meme (memeApiID, img, srcType) VALUES (?, ?, ?)";
//   const memeId = await db
//     .execute(queryMeme, [memeApiId, imgUrl, type])
//     .then(([res]) => {
//       return res.insertId;
//     })
//     .catch((err) => {
//       throw err;
//     });
//   const [categoryId] = cats[0];

//   let queryMemeCat =
//     "INSERT INTO memeCategory (memeID, categoryID) VALUES (?, ?)";

//   // link inserted meme with its category
//   const res = await db
//     .execute(queryMemeCat, [memeId, categoryId])
//     .then(([res]) => {
//       return 200;
//     })
//     .catch((err) => {
//       return 400;
//     });
//   return res;
// };

// assumes badge = badge name, user = username
// returns 200 on success, 400 on failure
// export const addBadge = async (badge, user) => {
//   let userId, badgeId;
//   try {
//     userId = await queryUser(user);
//     badgeId = await queryBadge(badge);
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }

//   const query =
//     "INSERT INTO userAccumulatedBadges (userID, badgeID) VALUES (?, ?);";
//   const res = await db
//     .execute(query, [userId[0].userID, badgeId[0].badgeID])
//     .then((res) => {
//       return 200;
//     })
//     .catch((err) => {
//       return 400;
//     });
//   return res;
// };

// returns 200 on success, 400 on failure
// export const createPage = async (title, desc, username) => {
//   let user;
//   try {
//     user = await queryUser(username);
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }

//   const query =
//     "INSERT INTO memePage (title, description, creatorID) VALUES (?, ?, ?)";
//   const res = await db
//     .execute(query, [title, desc, username[0].userID])
//     .then((res) => {
//       return 200;
//     })
//     .catch((err) => {
//       return 400;
//     });
//   return res;
// };

// returns 200 on success, 400 on failure
// export const updatePageTitle = async (pageId, newTitle) => {
//   const query = "UPDATE memePage SET title = ? WHERE pageID = ?";
//   const res = await db
//     .execute(query, [newTitle, pageId])
//     .then((res) => {
//       return 200;
//     })
//     .catch((err) => {
//       return 400;
//     });
//   return res;
// };

// returns 200 on success, 400 on failure
// export const updatePageDescription = async (pageId, newDesc) => {
//   const query = "UPDATE memePage SET description = ? WHERE pageID = ?";
//   const res = await db
//     .execute(query, [newDesc, pageId])
//     .then((res) => {
//       return 200;
//     })
//     .catch((err) => {
//       return 400;
//     });
//   return res;
// };

// returns 200 on success, 400 on failure
// export const addMemeToPage = async (pageId, memeId) => {
//   const query = "INSERT INTO memesInPage (pageID, memeID) VALUES (?, ?)";
//   const res = await db
//     .execute(query, [pageId, memeId])
//     .then((res) => {
//       return 200;
//     })
//     .catch((err) => {
//       return 400;
//     });
//   return res;
// };

// returns 200 on success, 400 on failure
// export const removeMemeFromPage = async (pageId, memeId) => {
//   const query = "DELETE FROM memesInPage WHERE pageId = ? AND memeID = ?";
//   const res = await db
//     .execute(query, [pageId, memeId])
//     .then((res) => {
//       return 200;
//     })
//     .catch((err) => {
//       return 400;
//     });
//   return res;
// };
