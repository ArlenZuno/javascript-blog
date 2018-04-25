const express = require("express");
const app = express();
const port = process.argv[2] || 8080;
const bodyParser = require("body-parser");
const fs = require("fs");

app.set("view engine", "ejs");

app.use(express.static("public"));

// Set the bodyParser to receive input from forms
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/blog", (req, res) => {
  let blogsData = fs.readFileSync("blog-data.json");
  let blogs = JSON.parse(blogsData);
  res.render("pages/blog", { blogs });
});

app.get("/blog/:blogid", (req, res) => {
  let blogid = req.params.blogid;
  let blogsData = fs.readFileSync("blog-data.json");
  let blogs = JSON.parse(blogsData);
  for (let i = 0; i < blogs.length; i++) {
    if (blogid === blogs[i].id) {
      res.render("pages/post", { blog: blogs[i] });
    }
  }
  res.send(404);
});

// REST API "POST" - will add a new blog post (CREATE)
app.post("/blog", (req, res) => {
  // Push the new blog post in blog array
  let blogsData = fs.readFileSync("blog-data.json");
  let blogs = JSON.parse(blogsData);

  let blog = {
    id: `blog-title-${blogs.length + 1}`,
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    content: req.body.content,
    created: new Date()
  };

  blogs.push(blog);
  fs.writeFileSync("blog-data.json", JSON.stringify(blogs));

  res.render("pages/blog", { blogs });
});

app.get("/addpost", (req, res) => {
  res.render("pages/addPost");
});

app.delete("/blog/:blogid", (req, res) => {
  let blogsData = fs.readFileSync("blog-data.json");
  let blogs = JSON.parse(blogsData);
  let blogid = req.params.blogid;

  for (let i = 0; i < blogs.length; i++) {
    if (blogid === blogs[i].id) {
      blogs.splice(i, 1);
      break;
    }
  }
  fs.writeFileSync('blog-data.json', JSON.stringify(blogs))
  res.render("pages/blog", { blogs });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
