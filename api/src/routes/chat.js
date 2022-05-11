const express = require('express')
const router = express.Router()

const { chat, getChat, getHistoryChat } = require('../controllers/chat')

router.post('/', chat)
router.get('/', getChat)
router.get('/allChats', getHistoryChat)

module.exports = router
