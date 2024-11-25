const dotenv = require("dotenv"); // require package
dotenv.config(); // loads the environment variables from .env file
const express = require("express"); // require package
const mongoose = require("mongoose"); // require package
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
mongoose.connect(process.env.MONGODB_URI); // connect to MongoDB using the connection string in the .env file
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
const Bread = require("./models/bread.js"); // import the Bread model
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); 
// app.use(morgan("dev")); too much BOWLSHIT IN THE TERMINAL

const images = [
    '/images/boule.png',
    '/images/bread 2.png',
    '/images/bread 3.png',
    '/images/bread.png',
    '/images/croissant.png',
    '/images/rye-bread.png',
    '/images/whole-grain.png'
  ];

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

// GET /breads
app.get("/breads", async (req, res) => {
    const allBreads = await Bread.find();
    res.render("breads/index.ejs", { breads: allBreads });
  });

// GET /breads/new
app.get("/breads/new", (req, res) => {
    res.render("breads/new.ejs");
  });  

// GET /breadId  
app.get("/breads/:breadId", async (req, res) => {
    const foundBread = await Bread.findById(req.params.breadId);
    // const randomBread = images[Math.floor(Math.random() * images.length)]; no longer need to generate random bread img
    res.render("breads/show.ejs", { bread: foundBread });
});
  
// POST /breads
app.post("/breads", async (req, res) => {
    if (req.body.hasIngred === "on") {
      req.body.hasIngred = true;
    } else {
      req.body.hasIngred = false;
    }
    await Bread.create(req.body);
    res.redirect("/breads"); // redirect to index breads
  });

// DELETE /breadId
app.delete("/breads/:breadId", async (req, res) => {
    await Bread.findByIdAndDelete(req.params.breadId);
    res.redirect("/breads");
  });

// GET localhost:3000/breads/:breadId/edit
app.get("/breads/:breadId/edit", async (req, res) => {
    const foundBread = await Bread.findById(req.params.breadId);
    res.render("breads/edit.ejs", {
      bread: foundBread,
    });
  });

// UPDATE
app.put("/breads/:breadId", async (req, res) => {
    // Handle the 'hasIngred' checkbox data
    if (req.body.hasIngred === "on") {
      req.body.hasIngred = true;
    } else {
      req.body.hasIngred = false;
    }  
    // Update the bread in the database
    await Bread.findByIdAndUpdate(req.params.breadId, req.body);
    // Redirect to the bread's show page to see the updates
    res.redirect(`/breads/${req.params.breadId}`);
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
