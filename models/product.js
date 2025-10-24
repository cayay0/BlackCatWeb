const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    images: [String],
    stock: Number,
    sizes: [String],
    colors: [String],
    category: String,
    collection: String
})

module.exports = mongoose.model('Product', ProductSchema);
