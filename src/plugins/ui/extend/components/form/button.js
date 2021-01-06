import { isPromise, isFunction } from '../../utils/get-type'


/**
 * form.submit
 * form.reset
 * form.search
 */

function runCommand(commands) {
  if (commands.length === 0) return
  const command = commands.shift().split('.')
  const provide = this[command[0].toLocaleUpperCase() + `_PROVIDE`]
  if (provide && isFunction(provide[command[1]])) {
    const result = provide[command[1]]()

    if (isPromise(result)) {
      this.loading = true
      return result.then(() => {
        this.loading = false
        return runCommand.call(this, commands)
      }).finally(() => {
        this.loading = false
      })
    } else {
      return runCommand.call(this, commands)
    }
  }
}

export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    run: {
      type: String | Array
    },
    confirm: {//如果存在confirm，就打开弹窗提示
      type: String
    },
  },
  inject: {
    FORM_PROVIDE: {
      default: null
    }
  },
  render() {
    const props = { ...this.$attrs }
    const eventName = this.confirm ? 'onConfirm' : 'click'


    props.loading = this.loading
    const on = {
      [eventName]: val => {
        if (this.run) {
          runCommand.call(this, Array.isArray(this.run) ? this.run : [this.run])
        }

        if (isFunction(this.$listeners.click)) {
          const result = this.$listeners.click(val)
          if (isPromise(result)) {
            this.loading = true
            result.finally(() => {
              this.loading = false
            })
          }
        }
      }
    }

    if (this.confirm) {
      return (
        <el-popconfirm on={on} title={this.confirm}>
          <el-button props={props} slot="reference">{this.$slots.default}</el-button>
        </el-popconfirm>
      )
    } else {
      return <el-button props={props} on={on}>{this.$slots.default}</el-button>
    }
  }
}