import filtrator from './filtrator'
import Vue from 'vue'

export default function (context) {
  const fn = filtrator(context)
  Vue.use({
    install(Vue) {
      Vue.prototype.$api = fn
    }
  })
  context.$api = fn
}
