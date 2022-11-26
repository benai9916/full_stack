const express = require('express');
// local
const auth = require('../middleware/authorize')
const sellerAuth =  require('../controllers/seller/sellerAuth')
const seller =  require('../controllers/seller/sellerController')

const sellerRoute = express.Router()

sellerRoute.post('/new', sellerAuth.signUp)
sellerRoute.post('/login', sellerAuth.login)
sellerRoute.post('/:sellerId/shop', auth, seller.createShop)
sellerRoute.post('/:sellerId/book/new', auth, seller.addBook)
sellerRoute.get('/:sellerId/books', auth, seller.getBook)
sellerRoute.get('/:sellerId/orders', auth, seller.getOrderDetail)
sellerRoute.get('/:sellerId', auth, seller.getSeller)

module.exports = sellerRoute