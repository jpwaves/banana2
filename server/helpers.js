import { db } from "./index.js";

export const commaSepToArr = (str) => {
  return str.split(",").map((elem) => {
    return elem.trim();
  });
};

const prepStringArrForQuery = (strArr) => {
  return strArr.map((elem) => {
    return "'" + elem + "'";
  });
};

// returns 3 element arr, first w ids, second w names, third w both
export const getCategories = async (category = []) => {
  let query = "SELECT * FROM category";
  if (category.length !== 0) {
    query += ` WHERE name in (${prepStringArrForQuery(category)})`;
  }
  const res = await db
    .query(query)
    .then(([res]) => {
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

export const queryMemeUsingApiId = async (memeApiId) => {
  const query = "SELECT * FROM meme WHERE memeApiId = ?";
  const res = await db
    .execute(query, [memeApiId])
    .then(([res]) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return res;
};

export const queryUser = async (username) => {
  const query = "SELECT * FROM appUser WHERE username = ?";
  const res = await db
    .execute(query, [username])
    .then(([res]) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return res;
};

export const queryBadge = async (badgeName) => {
  const query = "SELECT * FROM badge WHERE name = ?";
  const res = await db
    .execute(query, [badgeName])
    .then(([res]) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return res;
};
