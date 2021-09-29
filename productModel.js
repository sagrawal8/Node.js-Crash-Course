const products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils.js')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product);
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product }
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    });
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products[index] = { id, ...product }
        console.log(products[index])
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update
}

C: \Users\Owner\Desktop\JavaScript Udemy\01 - Fundamentals - Part - 1\starter