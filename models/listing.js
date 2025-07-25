const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
       
          type: String,
          required: true,
          trim: true,
          default: "https://a0.muscache.com/im/pictures/default.jpg",
          set: (v) =>
            v === ""
              ? "https://a0.muscache.com/im/pictures/default.jpg"
              : v,
        
      },
      
    
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    }
});
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
// This code defines a Mongoose schema for a listing in a travel application.
// The schema includes fields for title, description, image, price, location, and country.
// The Listing model is then created from this schema and exported for use in other parts of the application.