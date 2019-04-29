const express = require('express')
const router = express.Router()

// routes below
const topic = require('./topic')

router.use('/topic', topic)

module.exports = router
