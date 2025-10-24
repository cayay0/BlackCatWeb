const mongoose = require('mongoose');
const Product = require('../models/product'); 
const { descriptors, item } = require('./seedHelpers');
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/black-cat')
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.error('Connection error:', e));

const imageDir = path.join(__dirname, '../images');
const imageFiles = fs.readdirSync(imageDir);

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Product.deleteMany({});
    for (let i = 0; i < 50; i++){
        const randomImage = sample(imageFiles);
        const newItem = new Product({
            name: `${sample(descriptors)} ${sample(item)}`,
            price: Math.floor(Math.random() * 100) + 20,
            images: [`/images/${randomImage}`],
            stock: Math.floor(Math.random() * 50) + 1,
            sizes: 'S, M, L, XL',
            colors: 'red, black, white'
        });
        await newItem.save();
    }
}
console.log('DB seeded!')
seedDB().then(() => {
    mongoose.connection.close();
})