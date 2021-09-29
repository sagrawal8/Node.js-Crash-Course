const Product = require('../model/productModel')
const { getPostData } = require('../utils.js')

//@desc Gets all products
//@route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products))

    } catch (error) {
        console.log(error)
    }
}


//@desc Gets single product
//@route GET /api/products/:id
async function getSingleProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product not found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product))
        }

    } catch (error) {
        console.log(error)
    }
}

//@desc create single product
//@route POST /api/products/
async function createProduct(req, res) {
    try {
        const product = {
            title: 'Test Product',
            description: 'This is my product',
            price: 100
        }

        const newProduct = Product.create(product)
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}


//@desc create single product
//@route POST /api/products/
async function createProduct2(req, res) {
    try {
        const product = {
            title: 'Test Product',
            description: 'This is my product',
            price: 100
        }
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const { title, description, price } = JSON.parse(body)
            const product = {
                title,
                description,
                price
            }
            const newProduct = await Product.create(product)
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(newProduct))
        })
    } catch (error) {
        console.log(error)
    }
}

//@desc create single product
//@route POST /api/products/
async function createProduct3(req, res) {
    try {
        const body = await getPostData(req)
        const { title, description, price } = JSON.parse(body)
        const product = {
            title,
            description,
            price
        }
        const newProduct = await Product.create(product)
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}

//@desc update single product
//@route PUT /api/products/
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product not found' }))
        }
        else {
            const body = await getPostData(req)
            const { title, description, price } = JSON.parse(body)
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updProduct = await Product.update(productData)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(updProduct))
        }

    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getProducts,
    getSingleProduct,
    createProduct3,
    updateProduct
}