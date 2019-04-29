const express = require('express')
const router = express.Router()
const controllersTopic = require('../../controllers/Topic')
// routes below
router.route('/')
    .post(controllersTopic.Create)
    .get(controllersTopic.Read)
    .put(controllersTopic.Update)
    .delete(controllersTopic.Delete)
module.exports = router
