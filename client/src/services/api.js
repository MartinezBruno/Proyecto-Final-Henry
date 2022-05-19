import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.1.66:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
