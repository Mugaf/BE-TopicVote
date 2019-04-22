const express = require('express')
const router = express.Router()

// routes below
router.use('/', (req, res) => {
    res.status(200).json({
        message: 'ohio'
    })
})

module.exports = router
