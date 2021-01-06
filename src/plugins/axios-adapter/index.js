import AxiosAdapter from './ce-axios'
import loader from './utils/loader'
import cas from './interceptors/cas'
// import sign from './interceptors/sign'

class Axios extends AxiosAdapter {
  constructor() {
    super(...arguments)
  }
  loader() {
    return loader(...arguments)
  }
}

console.log(process.env)

const api = new Axios({
  baseURL: process.env.VUE_APP_API_BASE_URL
})
api.use(cas)
// api.use(sign)

export default api
