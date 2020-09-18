const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const port = process.env.PORT || 5000;
const deleteOverride = require('method-override');

mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }))
app.use(deleteOverride('_method'))

app.get('/', async (req,res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles',articleRouter)

app.listen(port, () =>
    console.log(`listening on localhost:${port}`)
)