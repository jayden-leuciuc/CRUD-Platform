const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION, 
{ useUnifiedTopology: true , useNewUrlParser: true, useCreateIndex: true }, () => console.log('DB Connected'));


app.set('view engine', 'ejs')

//Everything in the article router is going to be added on to the end of /articles
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

app.get('/', async (req,res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', {articles: articles});
});

app.use('/articles',articleRouter);
const port = 5000;

app.listen(port, () => {console.log(`Server started`)});