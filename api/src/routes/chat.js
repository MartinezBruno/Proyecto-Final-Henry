const express = require('express')
const router = express.Router()

const { chat, getChat } = require('../controllers/chat')

router.post('/', chat)
router.get('/', getChat)

module.exports = router
