//initialization logic

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
  //clear all data in dbs 
  await Listing.deleteMany({});
  //now add from data.js
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};



//to initialize do:
//$ node index.js
initDB();