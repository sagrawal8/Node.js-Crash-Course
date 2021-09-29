const http = require('http')
const { getProducts, getSingleProduct, createProduct3, updateProduct } = require('./controllers/productController')

const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method == 'GET') {
        getProducts(req, res)
    }
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method == 'GET') {
        const id = req.url.split('/')[3]
        getSingleProduct(req, res, id)
    }
    else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct3(req, res)
    }
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method == 'PUT') {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'Route not found' }))
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log('Server running on ', PORT)
})