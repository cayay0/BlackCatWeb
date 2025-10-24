const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

mongoose.connect('mongodb://localhost:27017/black-cat')
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.error('Connection error:', e));

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('__method'));


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products })
})

app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('products/show', { product });
})

app.get('/signin', (req, res) => {
    res.render('users/signin');
})

app.get('/signup', (req, res) => {
    res.render('users/signup');
})

app.get('/signup', async (req, res) => {
    const user = new User(req.body.user);
    await user.save();
    res.redirect('home');
})

app.get('/password', (req, res) => {
    res.render('users/password');
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})