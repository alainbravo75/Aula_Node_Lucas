const express = require('express');
const app = express();
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

const port = 700
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser:true, 
    useUnifiedTopology: true
})

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}));
app.get('/', async(req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
});
app.use('/articles', articleRouter)

app.listen(port, () => {
    console.log('Rodando o servidor na porta 700')
});