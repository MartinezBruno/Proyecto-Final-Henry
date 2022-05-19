import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://www.weattend.com.ar/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
