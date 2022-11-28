const express = require('express')
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');
const methodOverride = require('method-override')
const app = express();
const { v4: uuid } = require('uuid');
const { AsyncLocalStorage } = require('async_hooks');
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))
const comments = [
    {
        id: uuid(),
        username: "JohnJimmy44",
        comment: 'lmao'

    },
    {
        id: uuid(),
        username: "JackBoi325",
        comment: 'haha this is haliorus'
    },
    {
        id: uuid(),
        username: "iloveprogramming",
        comment: 'how to exponent in javascript tutorial punjabi no virus'
    },
    {
        id: uuid(),
        username: "Superiority McComplex Dev",
        comment: 'if you seriously use python you are a NOOB. real programmers use EXCLUSIVELY low level langs like ASSEMBLY. NOOB NOOB NOOOOOOOOB'
    }
]
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
    console.log(uuid)
})
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})
app.post('/comments', (req, res) => {
    const { username, comment } = req.body
    comments.push({ username, comment, id: uuid() })
    res.redirect(303, '/comments')
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id !== id);
})
app.listen(3000, () => { console.log('listening on port 3k') })