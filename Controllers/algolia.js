const {
  pool
} = require('../Config/db');
const algoliasearch = require("algoliasearch");

async function pushItemsToAlgolia(city) {
  try {
    const client = algoliasearch(process.env.Al_Application_ID, process.env.Al_Admin_API_Key);
    const index = client.initIndex(`${city}_items`);

    const response = await pool.query("SELECT * FROM items").then((result) => {
      var newIndexes = [];

      for (const key in result.rows) {
        //add new object
        result.rows[key]["objectID"] =result.rows[key]["item_count"] +result.rows[key]["item_id"];
        //add new details to new array
        newIndexes.push(result.rows[key]);
      }
      index.saveObjects(newIndexes)
        .then(({
          // objectIDs
        }) => {
          console.log(objectIDs);
        })
        .catch(err => {
          console.log(err);
        });
    });
  } catch (error) {
    console.log("Somthing went wrong.");
  }
}
module.exports = {
  pushItemsToAlgolia
};