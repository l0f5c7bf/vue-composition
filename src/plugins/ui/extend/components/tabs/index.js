import Params, { addRule } from '../../utils/params-util'

export const COMPONENT_NAME = 'TAB'

addRule(COMPONENT_NAME, {
  parse(params) {
    return params
  },
  componentization(params) {
    return params
  }
})

const props = {
  uid: {
    default: 0
  },
  value: {
    default: ''
  }
}

export default {
  render(h) {
    const props = { ...this.$attrs }
    const on = { ...this.$listeners }

    props.value = this.params.get() || this.value
    on.input = (val) => {
      this.params.set(val).then(() => {
        this.$emit('input', val)
      })
    }
    return h('el-tabs', {
      props,
      on
    }, this.$slots.default)

  },
  props,
  provide() {
    return {
      TAB_PROVIDE: this
    }
  },
  data() {
    return {
      params: new Params(COMPONENT_NAME, this),
    }
  },
  methods: {

  },
  created() {
    const value = this.params.get()
    if (value !== this.value) {
      this.$emit('input', value || this.value)
    }
  },
}