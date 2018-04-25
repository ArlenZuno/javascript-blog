const express = require("express");
const app = express();
const port = process.argv[2] || 8080;
const bodyParser = require("body-parser");

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

// Set the bodyParser to receive input from forms
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/blog", (req, res) => {
  res.render("pages/blog", { blogs: blogs });
});

app.get("/blog/:blogid", (req, res) => {
  let blogid = req.params.blogid;

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
  blogs.push({
    id: `blog-title-${blogs.length + 1}`,
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    content: req.body.content,
    created: new Date()
  });
  res.render("pages/blog", { blogs: blogs });
});

app.get("/addpost", (req, res) => {
  res.render("pages/addPost");
});

app.delete("/blog/:blogid", (req, res) => {
  let blogid = req.params.blogid;

  for (let i = 0; i < blogs.length; i++) {
    if (blogid === blogs[i].id) {
        blogs.slice(i, 1)
        break
    }
  }
  res.render('pages/blog', {blogs: blogs})
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
