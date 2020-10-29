// Requiring all Dependencies

const express = require("express");

const bodyparser = require("body-parser");

const mongoose = require('mongoose');

const EJS = require("ejs");
const { urlencoded } = require("body-parser");

//-----------------------------------------------------------------------------------

const app = express();

app.set('view-engine','ejs');

app.use(bodyparser,urlencoded({extended:true}));

app.use(express.static("public"));


// COnnecting mongoose to local Database
mongoose.connect("mongodb://localhost:27017/WikiDb",{useNewUrlParser:true});

// article schema
const articleSchema = {
    title: String,
    content: String
}

// Mongoose Model
const Article = mongoose.model("Article", articleSchema);



//Update the server on localhost 3000
app.listen(3000,function(req,res){
    console.log("app running on localhost 3000");
})