import SingleArray from '../../utils/single-array'
const props = {
  uid: {
    default: 0
  },
  cols: {
    required: true,
    type: Array
  },
  value: {
    default() {
      return []
    }
  }
}

const tableColumnParser = (() => {
  const rules = []
  return {
    _parse(props, h) {
      let config = {
        props,
        scopedSlots: {}
      }
      if (typeof props.prop === 'string') {
        props.prop = props.prop.trim()
      }

      for (let i = 0, result; i < rules.length; i++) {
        // eslint-disable-next-line no-cond-assign
        if (result = rules[i].call(this, config, h)) {
          return result
        }
      }
      return config
    },
    parse(cols, h) {
      return cols.map(v => {
        const props = { ...v }
        return h(
          'el-table-column',
          tableColumnParser._parse.call(this, props, h),
          Array.isArray(props.children) ? tableColumnParser.parse.call(this, props.children, h) : undefined
        )
      })
    },
    add(fn) {
      rules.push(fn)
    }
  }
}
)()

function parseCustomNode(result, scope, h) {
  if (Array.isArray(result)) {
    return result.map(v => parseCustomNode.call(this, v, scope, h))
  }
  return result
}

/**
 * 自定义返回值解析器
 * 返回一个function,参数是sopce,createElement
 */
tableColumnParser.add(function ({ props, scopedSlots }, h) {
  if (typeof props.prop === 'function') {
    const func = props.prop
    delete props.prop
    scopedSlots.default = (scope) => {
      return parseCustomNode.call(this, func(scope, h), scope, h)
    }
  }
})

/**
 * 自定义表头解析器
 */
tableColumnParser.add(function ({ props, scopedSlots }, h) {
  if (typeof props.label === 'function') {
    const func = props.label
    delete props.label
    scopedSlots.header = (scope) => {
      return parseCustomNode.call(this, func(scope, h), scope, h)
    }
  }
})


/**
 * 多选框
 */
tableColumnParser.add(function ({ props, scopedSlots }) {
  if (props.type === 'checkbox') {

    const key = props.key || 'id'
    if (!Array.isArray(this.value)) {
      this.$emit('input', [])
    }
    const value = new SingleArray(this.value, key)

    scopedSlots.header = () => {
      if (this.$attrs.data.length === 0 || !Array.isArray(this.value)) return
      const isAll = value.has(this.$attrs.data, true)
      const isIndeterminate = value.has(this.$attrs.data, false) && !isAll
      return (
        <el-checkbox
          indeterminate={isIndeterminate}
          value={isAll}
          onInput={(isChecked) => {
            this.$emit('input', value[isChecked ? 'add' : 'delete'](this.$attrs.data))
          }}
        ></el-checkbox>
      )
    }
    scopedSlots.default = prop => {
      return (
        <el-checkbox
          value={this.value.some(v => v[key] === prop.row[key])}
          onInput={(isChecked) => {
            this.$emit('input', value[isChecked ? 'add' : 'delete'](prop.row))
          }}>
        </el-checkbox>)
    }
  }
})

/**
 * 单选框
 */
tableColumnParser.add(function ({ props, scopedSlots }) {
  if (props.type === 'radio') {
    const key = props.key || 'id'
    scopedSlots.default = prop => {
      return (
        <el-radio
          label={prop.row[key]}
          value={this.value[key]}
          onInput={(value) => { this.$emit('input', this.$attrs.data.filter(v => v[key] === value)[0]) }}>
          {props.prop ? prop.row[props.prop] : <span style="display:none"></span>}
        </el-radio>
      )
    }
  }
})




export default {
  props,
  render(h) {
    const props = { ...this.$attrs }
    const on = { ...this.$listeners }

    // 解析表格
    const cols = tableColumnParser.parse.call(this, this.cols, h)

    return h(
      'el-table',
      {
        props,
        on,
      },
      cols
    )
  },
}

