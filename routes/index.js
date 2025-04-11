const express = require('express')
const router = express.Router()
const ChecklistRoutes = require('./ChecklistRoutes')
const {authenticateToken} = require('../controllers/AuthController')
const UserController = require('../controllers/UserController')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)

router.use('/' , authenticateToken , ChecklistRoutes)// example middleware


module.exports = router