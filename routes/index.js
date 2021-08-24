const express = require('express')
const router = express.Router()
const todoRoutes = require('./todo.routes')

router.use('/todo', todoRoutes )

module.exports = router;