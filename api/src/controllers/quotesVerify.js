const axios = require('axios')
const BATTUTA_KEY = [
  '1330921bc154e7c9527d835709dd4507',
  '13d4b2d21ee6fdc34b2532b5a16c2f6c',
  '436eaa921ceec870cb29a1c2b053dd77',
  'f418bf88c2b3f558dc098c3ba0dd1571',
]
let counter = 0
const quotaMonitoring =
  'http://battuta.medunes.net/api/quota/?key=' + BATTUTA_KEY[counter]

const getQuota = async () => {
  let quota = (await axios.get(quotaMonitoring)).data
  let quotaValue = Object.values(quota)[0]
  console.log('Quedan', quotaValue, 'usos')
  if (quotaValue <= 10) {
    counter++
    console.log('Aumento el valor del contador' + ' ' + counter)
  }
}

module.exports = {
  getQuota,
  counter,
  BATTUTA_KEY,
}
