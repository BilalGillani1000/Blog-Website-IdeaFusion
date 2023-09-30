//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent = "Welcome to Idea Fusion - Where Creativity Meets Knowledge! We're passionate about exploring the intersection of creativity and knowledge. Our blog is your source for inspiration, ideas, and insights that can spark your imagination and expand your horizons. Dive into a world where ideas know no boundaries. Our blog covers a diverse range of topics that encompass the arts, sciences, technology, personal growth, and beyond.";
const aboutContent = "Welcome to Idea Fusion, a place where imagination knows no bounds and where knowledge meets inspiration. We're thrilled to share our story with you and give you a glimpse into what drives us. Why Idea Fusion? In a world teeming with information, we noticed a gap—an opportunity to bridge the gap between the arts and sciences, between imagination and facts. We founded Idea Fusion to be the bridge where these seemingly distinct worlds converge, allowing for the creation of a richer tapestry of ideas. Don't miss out on the latest updates from Idea Fusion. Subscribe to our newsletter and follow us on social media to stay connected with our community and receive a steady stream of inspiration. Thank you for being a part of the Idea Fusion journey. Together, we'll continue to explore the boundless possibilities that arise when creativity and knowledge come together.";
const contactContent = "If you have general questions, suggestions, or feedback, don't hesitate to contact us. We're always eager to connect with our readers and fellow idea enthusiasts. Email: ides***@gamil.com. Phone: 0300*******. Thank you for your interest in Idea Fusion. We value every interaction with our readers and the broader community. Please allow us some time to respond to your inquiries, and we'll do our best to provide you with the information or assistance you need. Your engagement and ideas are essential to our mission of fostering creativity, knowledge, and inspiration. We look forward to hearing from you and continuing our journey of idea fusion together.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts=[];

app.get("/",function (req,res) {
  res.render("home", {homeContent:homeStartingContent, newPosts:posts});
});

app.get("/about",function (req,res) {
  res.render("about", {about_Content:aboutContent});
});

app.get("/contact",function (req,res) {
  res.render("contact", {contact_Content:contactContent});
});

app.get("/compose",function (req,res) {
  res.render("compose");
});

app.get("/posts/:postTitle",function (req,res) {
  let requestedTitle=_.lowerCase(req.params.postTitle);
  for(var i=0;i<posts.length;i++) {
    if (requestedTitle==_.lowerCase(posts[i].title)) {
      res.render("post", {titleSearched:posts[i].title , postContent:posts[i].newPost});
    }
  }
});

app.post("/compose",function (req,res) {
  const post= {
    title:req.body.postTitle,
    newPost:req.body.postText
  }
  posts.push(post);

  res.redirect("/");
});


















app.listen(3000, function() {
  console.log("Server is live");
});
