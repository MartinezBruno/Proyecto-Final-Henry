import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://159.223.142.74/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
