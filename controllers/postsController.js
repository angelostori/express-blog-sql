const posts = require('../data/posts.js')

const index = (req, res) => {
    // Inizialmente, il menu filtrato corrisponde a quello originale
    let filteredPosts = posts
    // Se la richiesta contiene un filtro, allora filtriamo la lista dei post
    if (req.query.tag) {
        filteredPosts = posts.filter(post =>
            post.tags && post.tags.includes(req.query.tag)
        )
    }
    // restituiamo la variabile filteredPost
    // potrebbe essere stata filtrata o contenere la lista originale
    res.json(filteredPosts)
    // URL test: http://localhost:3000/api/posts?tag=dolci
}

const show = (req, res) => {
    const id = Number(req.params.id)
    const thisPost = posts.find(post => post.id === id)
    // res.send(`Show the post with id: ${req.params.id}`)

    if (!thisPost) {
        return res.status(404).json({
            error: true,
            message: 'Post not found!'
        })
    }

    res.json(thisPost)
}

const store = (req, res) => {
    const newPost = {
        id: Date.now(),
        "title": req.body.title,
        "content": req.body.content,
        "image": req.body.image,
        "tags": req.body.tags
    }

    posts.push(newPost)

    console.log("Post aggiunto:", req.body);

    res.status(201).json({
        message: "Post creato con successo!",
        post: newPost
    });
}

const update = (req, res) => {
    const id = Number(req.params.id)
    const postData = req.body

    const thisPost = posts.find(post => post.id === id)

    if (!thisPost) {
        return res.status(404).json({
            error: true,
            message: 'Post not found!'
        })
    }

    // aggiornamento post trovato
    thisPost.title = postData.title
    thisPost.content = postData.content
    thisPost.image = postData.image
    thisPost.tags = postData.tags

    res.json(thisPost)
}

const modify = (req, res) => {
    res.send(`Modify the post with id: ${req.params.id}`)
}

const destroy = (req, res) => {
    const id = Number(req.params.id)
    const thisPost = posts.find(post => post.id === id)

    if (!thisPost) {
        return res.status(404).json({
            error: true,
            message: 'Post not found!'
        })
    }

    posts.splice(posts.indexOf(thisPost), 1)

    res.sendStatus(204)
}


const postsController = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}


module.exports = postsController