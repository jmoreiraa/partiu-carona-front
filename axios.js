import axios from 'axios'

export default axios.create({
  baseURL: 'https://partiu-carona-back-production.up.railway.app/api',
})
