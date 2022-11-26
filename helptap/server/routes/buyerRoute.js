const express = require('express');
// local
const auth = require('../middleware/authorize')
const buyerAuth =  require('../controllers/buyer/buyerAuth')
const buyer =  require('../controllers/buyer/buyerController')

const buyerRoute = express.Router()

buyerRoute.post('/buyer/new', buyerAuth.signUp)
buyerRoute.post('/buyer/login', buyerAuth.login)
buyerRoute.get('/sellers', auth, buyer.getAllSellers)
buyerRoute.get('/sellers/:sellerId', auth, buyer.getSellersById)
buyerRoute.get('/sellers/:sellerId/books', auth, buyer.getBookBySellerId)
buyerRoute.get('/buyer/:buyerId', auth, buyer.getBuyer)
buyerRoute.post('/buyer/:buyerId/order', auth, buyer.placeOrder)
buyerRoute.get('/buyer/:buyerId/order', auth, buyer.getOrder)

module.exports = buyerRoute