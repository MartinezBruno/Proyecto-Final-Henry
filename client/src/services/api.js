import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://weattend.online/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
