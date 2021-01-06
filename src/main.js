import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import extend from './plugins/ui/extend'
import axios from './plugins/axios-adapter/utils/install'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'

Vue.use(Element)
Vue.config.productionTip = false

Vue.use(axios)
Vue.use(extend)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
