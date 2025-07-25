const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js'); // Assuming the model is in models/listing.js
const MONGO_URI = "mongodb://localhost:27017/wanderlust";
main()
    .then(()=> {
    console.log("Connected to MongoDB");
    })
    .catch(err => {
    console.error("Error connecting to MongoDB", err);
    });
async function main() {
    await mongoose.connect(MONGO_URI);
}
const initDB = async () => {
   await Listing.deleteMany({});
   await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
}
initDB();