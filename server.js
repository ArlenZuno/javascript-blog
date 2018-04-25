const express = require('express')
const app = express()
const port = process.argv[2] || 8080

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/blog', (req, res) => {
    res.render('pages/blog')
})

app.get('/blog/:blogid', (req, res) => {
    let blogid = Number(req.params.blogid)
    res.send(blogid)
})

app.post('/blog', (req, res) => {
    res.send('Creating a new post')
})

app.delete('/blog/:blogid', (req, res) => {
    res.send('Deleting blog post')
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})