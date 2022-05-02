const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.send('url incomplete')
})
router.get('/sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!')
})

module.exports = router
