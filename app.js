const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const Listing = require('./models/listing.js'); // Assuming the model is in models/listing.js
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');



app.use(methodOverride('_method')); // For PUT and DELETE requests
app.engine('ejs', ejsMate); // Use ejsMate for EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
const MONGO_URI = "mongodb://localhost:27017/wanderlust";

main()
    .then(()=> {
    console.log("Connected to MongoDB");
    })
    .catch(err => {
    console.error("Error connecting to MongoDB", err);
    });

async function main() {
    await mongoose.connect(MONGO_URI);}

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/listings' , async (req , res)=>{
    const allListings = await Listing.find({});
        res.render("listings/index",{allListings} );
    })

//New Route
app.get('/listings/new' , (req  , res)=>{
    res.render('listings/new');
    })

//Create Route
app.post('/listings' , async (req , res)=>{
    const { title, description, image, price, location, country } = req.body;
    const newListing = new Listing({
        title,
        description,
        image,
        price,
        location,
        country

        });
    await newListing.save();
        console.log("New listing created:", newListing);
        res.redirect('/listings');
    });

   
 //show route 
app.get('/listings/:id' , async(req , res)=>{
        const id = req.params.id;
        const listing = await Listing.findById(id);
        if(!listing){
            return res.status(404).send('Listing not found');
        }
        res.render('listings/show', { listing });
    })

//edit route
app.get('/listings/:id/edit' , async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send('Listing not found');
    }
    res.render('listings/edit', { listing });
    });

app.put('/listings/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description, image, price, location, country } = req.body;
    const updatedListing = await Listing.findByIdAndUpdate(id, {
        title,
        description,
        image,
        price,
        location,
        country
        }, { new: true , runValidators: true }  );
    if (!updatedListing) {
        return res.status(404).send('Listing not found');
    }
    res.redirect(`/listings/${updatedListing._id}`);
    });

app.delete('/listings/:id' , async (req , res)=>{
    let id = req.params.id;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
    })

app.listen(8000, () => {
    console.log('Server is running on port 3000');
});