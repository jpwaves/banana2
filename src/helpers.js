/* eslint-disable no-useless-escape */
import mysql from "mysql2/promise";
import { db } from "./mysql-connect.js";

export const commaSepToArr = (categories) => {
  return categories.split(",").map((elem) => {
    return elem.trim();
  });
};

const categoryToString = (category) => {
  return "'" + category.toString().replace(",", "','") + "'";
};

export const getCategories = async (category) => {
  console.log(category.toString());
  const res = await db
    .query(
      `SELECT * FROM category WHERE name in (${categoryToString(category)})`
    )
    .then(([res]) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      throw err;
    });

  const idOnly = res.map((elem) => {
    return elem.categoryID;
  });
  const nameOnly = res.map((elem) => {
    return elem.name;
  });

  return [idOnly, nameOnly, res];
};

// const res = await getCategories(["cat", "sad"]);
// console.log(res);
