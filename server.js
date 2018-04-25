const express = require("express");
const app = express();
const port = process.argv[2] || 8080;
const bodyParser = require('body-parser')

let blogs = [
  {
    id: "blog-title-1",
    title: "Blog Title 1",
    summary: "This is a blog summary.",
    content: "This is the blog content",
    author: "John Smith",
    created: "February 5, 2018"
  },
  {
    id: "blog-title-2",
    title: "Blog Title 2",
    summary: "This is a blog summary.",
    content: "This is the blog content",
    author: "John Smith",
    created: "February 6, 2018"
  }
];

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/blog", (req, res) => {
  res.render("pages/blog", { blogs: blogs });
});

app.get("/blog/:blogid", (req, res) => {
  let blogid = req.params.blogid;

  for (let i = 0; i < blogs.length; i++) {
      if (blogid === blogs[i].id) {
          res.render('pages/post', {blog: blogs[i]})
      }
  } 
  res.send(404)
});

app.post("/blog", (req, res) => {
  res.send("Creating a new post");
});

app.post ('/addpost', (req, res) => {
    res.render('pages/addPost')
})

app.delete("/blog/:blogid", (req, res) => {
  res.send("Deleting blog post");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
