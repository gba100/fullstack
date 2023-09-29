//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");



const homeStartingContent = "Nucus jel facilis velumpot est velis egestas diu id ondore. Sepner auteccor neque vitoe temmis quam. Set amet cursus set amet dictum set amet juste. Viverra tellis in huc habitessu. Imperdum proen fermentum leo vel orci porte. Dunic ultrices tincidunt arcu nun sidales neque sidales ut. Mattis molestie a iaculis at erot pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitoe ultricies. Adipiscong elit ut aliquam purus set amet lucres venenatis lectus. Ultrices vitoe auteccor eu augue ut lectus arci bibendom at. Udio euismod lacinia at quis risus sed vulpotate udi ut. Cursus mattis molestie a iaculis at erot pellentesque adipiscing.";
const aboutContent = "Cass hamitissu blatea dictust vestipum rhoncus est pellentessi. Dictust vestipum rhoncus est pellentessi elit ullumcorpus. Non duum phasellus vestipum lorum sed. Blatea dictust quisque sagittis purus set. Estas sed sed risus pertium quam vulputate dignissim suspendisse. Mauris in alitquam sem fringulla. Sepmer risus in hendrerit gravida rutrum quisque nun tellus orci. Emat messa vitue tortor condimentum lacini quis vel eros. Nenim ut tellus elementum sagittis vitue. Cass ultrices eros in cursus turpis massa tincidunt diu.";
const contactContent = "Melerisque eleifind donec pretum vulpitate spaien. Phoncus irna neque viverro jasto nec ultrices. Arju diu vimavus arju felis bibendim. Cesecetur adipiscing elit duit tristuque. Risus viverro adipiscing at in telles integer feufiat. Sapien nec sagiccus alliquam mulesada bibendim arju vitue. Consequat interdum varieus set amet mattis. Iaculis nunc sed augu lucus. Interdum posuere lorem ipsum dolor set amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in alliquam sem fringulla ut morbi tincidunt. Tortor posuere ac ut consetetur semper viverra nam libero.";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
