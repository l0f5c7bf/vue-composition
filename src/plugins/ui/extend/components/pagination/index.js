import Params, { addRule } from '../../utils/params-util'
export const COMPONENT_NAME = 'P'

const props = {
  uid: {
    default: 0
  },
}

addRule(COMPONENT_NAME, {
  parse(params) {
    params = params.split('.')
    return {
      currentPage: +params[0],
      pageSize: +params[1]
    }
  },
  componentization(params) {
    return Object.keys(params)
      .map(v => params[v])
      .join('.')
  }
})

export default {
  data() {
    return {
      params: new Params(COMPONENT_NAME, this)
    }
  },
  props,
  render(h) {
    const props = { ...this.$attrs }
    const on = { ...this.$listeners }
    on['current-change'] = (val) => {
      const query = {
        currentPage: val,
        pageSize: props.pageSize
      }

      this.params.set(query).then(() => {
        this.$emit('current-change', val)
      })
    }

    on['size-change'] = (val) => {
      const query = {
        currentPage: props.currentPage,
        pageSize: val
      }
      this.params.set(query).then(() => {
        this.$emit('size-change', val)
      })
    }

    return h('el-pagination', {
      props,
      on
    })
  },
  created() {
    const query = this.params.get()
    if (query) {
      this.$emit('init', query)
    }
  }

}


