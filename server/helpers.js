import { db } from "./index.js";

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
      console.log(err);
      return -1;
    });

  // exit if the db query failed
  if (res === -1) {
    return;
  }

  const idOnly = res.map((elem) => {
    return elem.categoryID;
  });
  const nameOnly = res.map((elem) => {
    return elem.name;
  });

  return [idOnly, nameOnly, res];
};
