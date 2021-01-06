import Vue from 'vue'
import Vuex from 'vuex'
import ui from '../plugins/ui/extend/store'
import Element from 'element-ui'
Vue.use(Vuex)
Vue.use(Element, {
  size: 'mini'
})

export default new Vuex.Store({
  ...{
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
  }, ...ui
})
