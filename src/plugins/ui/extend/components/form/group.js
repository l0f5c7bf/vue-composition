import { isString, isFunction, isPromise } from '../../utils/get-type'
import tryGetOnlyArray from '../../utils/data-patch-v1/try-get-only-array'

const props = {
  tag: {
    default: 'el-select'
  },
  data: {
    required: true
  },
  init: {
    default: true
  },
  props: {
    default() {
      return {
        label: 'label',
        value: 'value'
      }
    }
  }
}

export default {
  data() {
    return {
      parsedData: []
    }
  },
  watch: {
    data: {
      handler(newValue) {
        this.parseData(newValue)
      }
    }
  },
  methods: {
    parseData(data) {
      if (isFunction(data)) {
        this.parseData(data())
      }
      else if (Array.isArray(data)) {
        this.parsedData = [...data]
      } else if (isString(data)) {
        let params = {}
        try {
          data.split('?')[1].split('&').forEach(v => {
            const s = v.split('=')
            params[s[0]] = s[1]
          })
          data = data.split('?')[0]
        } catch (error) { 
          console.log(error);
        }
        this.$api(data, params).then(response => {
          this.parsedData = [...tryGetOnlyArray(response).data]
        })
      } else if (isPromise(data)) {
        data.then(response => {
          this.parsedData = [...tryGetOnlyArray(response).data]
        })
      }
    }
  },
  render(h) {
    const props = { ...this.$attrs }
    const on = { ...this.$listeners }
    let tag = this.tag
    let children = []


    if (tag === 'el-select' || tag === 'select') {
      tag = 'el-select'
      children = this.parsedData.map(v => (<el-option label={v[this.props.label]} value={v[this.props.value]}></el-option>))
    }

    if (tag === 'el-radio-group' || tag === 'radio-group' || tag === 'radio') {
      tag = 'el-radio-group'
      children = this.parsedData.map(v => (<el-radio label={v[this.props.value]}>{v[this.props.label]}</el-radio>))
    }

    if (tag === 'el-checkbox-group' || tag === 'checkbox-group' || tag === 'checkbox') {
      tag = 'el-checkbox-group'
      children = this.parsedData.map(v => (<el-checkbox label={v[this.props.value]}>{v[this.props.label]}</el-checkbox>))
    }

    if (tag === 'el-checkbox-button-group' || tag === 'checkbox-button-group' || tag === 'checkbox-button') {
      tag = 'el-checkbox-group'
      children = this.parsedData.map(v => (<el-button label={v[this.props.value]}>{v[this.props.label]}</el-button>))
    }
    if (tag === 'el-radio-button-group' || tag === 'radio-button-group' || tag === 'radio-button') {
      tag = 'el-radio-group'
      children = this.parsedData.map(v => (<el-button label={v[this.props.value]}>{v[this.props.label]}</el-button>))
    }

    return h(tag, {
      props,
      on
    }, children)
  },
  props,
  created() {
    if (this.init) {
      this.parseData(this.data)
    }
  }
}