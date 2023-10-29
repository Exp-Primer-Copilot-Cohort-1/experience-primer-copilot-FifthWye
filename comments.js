// Create web server

// 1. Load modules
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

// 2. Create web server
var app = express();

// 3. Set middleware
app.use(bodyParser.urlencoded({ extended: false }));

// 4. Set router
app.get("/comments", function(req, res) {
  fs.readFile(__dirname + "/data/" + "comments.json", "utf8", function(
    err,
    data
  ) {
    console.log(data);
    res.end(data);
  });
});

app.post("/comments", function(req, res) {
  // 1. Read existing data
  fs.readFile(__dirname + "/data/" + "comments.json", "utf8", function(
    err,
    data
  ) {
    // 2. Convert to JSON
    var comments = JSON.parse(data);

    // 3. Add new data
    var newComment = {
      name: req.body.name,
      message: req.body.message
    };
    comments.push(newComment);

    // 4. Convert back to string
    var commentsString = JSON.stringify(comments);

    // 5. Write to file
    fs.writeFile(__dirname + "/data/" + "comments.json", commentsString, function(
      err
    ) {
      console.log(commentsString);
      res.end(commentsString);
    });
  });
});

// 5. Start server
app.listen(3000, function() {
  console.log("Server is running at port 3000");
});