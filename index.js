// Requiring all Dependencies

const express = require("express");

const bodyparser = require("body-parser");

const mongoose = require('mongoose');

const EJS = require("ejs");


//-----------------------------------------------------------------------------------

const app = express();

app.set('view-engine','ejs');

app.use(bodyparser.urlencoded({extended:true}));

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


// create new route (article) to fetch all articles from database
app.get("/article",function(req, res){
    Article.find(function(err, foundArticle){
        
        if(!err){
            res.send(foundArticle);
        }
        else{
            res.send(err);
        }
    });
});
//-----------------------------------------------------------------

//post requset
app.post("/article", function(req,res){
    console.log(req.body.title);
    console.log(req.body.content);

    // Saving the data

    const ArticleData = new Article({
        title: req.body.title,
        content: req.body.content
    });

    ArticleData.save(function(err){
        if(!err){
            res.send("Sucessfuly added article");
        }
        else{
            res.send(err);
        }
    });
})
//------------------------------------------------------------------

// delete route for articles
app.delete("/article",function(req,res){
    Article.deleteMany(
        function(err){
            if(!err){
                res.send('Sucessfully deleted all articles');
            }
            else{
                res.send(err);
            }
        }
    )
})

//Update the server on localhost 3000
app.listen(8000,function(req,res){
    console.log("app running on localhost 3000");
})