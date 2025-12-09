const express = require('express')
const app = express()
const PORT = 3000
const postsRouter = require('./routes/posts')

// server entry point
app.get('/', (req, res) => {
    res.send('Welcome to my blog API server')
})

// register the static assets
app.use(express.static('public'));

// register the body parser
app.use(express.json())

app.use('/api/posts', postsRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

})