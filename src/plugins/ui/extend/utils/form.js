const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const mobile = /^[1][0-9]{10}$/
import formatDate from './format-date'
const getRules = (label, prop, rules) => {
  if (Array.isArray(rules)) {
    return rules.map(rule => {
      if (typeof rule === 'string') {
        // 非空校验
        if (rule === 'required') {
          return {
            required: true, message: label + '不能为空'
          }
        }
        // 邮箱
        if (rule === 'email') {
          return {
            pattern: email, message: '邮箱格式错误'
          }
        }
        //手机
        if (rule === 'mobile') {
          return {
            pattern: mobile, message: '手机格式错误'
          }
        }

      } else {
        return rule
      }
    })
  } else {
    return []
  }
}

export const createInput = (label, prop, rules, options) => {
  return {
    label,
    prop,
    rules: getRules(label, prop, rules),
    render(h, model) {
      return <el-input {...options} clearable value={model[prop]} placeholder={`请输入${label}`} onInput={(value) => { model[prop] = value }}></el-input>
    }
  }
}


export const createTextarea = (label, prop, rules, options) => {
  return {
    label,
    prop,
    rules: getRules(label, prop, rules),
    render(h, model) {
      return <el-input type="textarea" rows={(options && options.props && options.props.rows) || 5}  {...options} clearable value={model[prop]} placeholder={`请输入${label}`} onInput={(value) => { model[prop] = value }}></el-input>
    }
  }
}



export const createPriceInput = (label, prop, rules, options) => {
  return {
    label,
    prop,
    rules: getRules(label, prop, rules),
    render(h, model) {
      return <el-input {...options} clearable value={model[prop] ? model[prop].toString() : ''} placeholder={`请输入${label}`} onInput={(value) => { model[prop] = value.replace(/[^0-9.]/g, '') }}>
        <template slot="append">元</template>
      </el-input>
    }
  }
}

export const createDate = (label, prop, rules, options) => {

  return {
    label,
    prop,
    rules: getRules(label, prop, rules),
    render(h, model) {
      return <el-date-picker
        {...options}
        clearable
        value={formatDate(model[prop])}
        type="date"
        value-format="yyyy-MM-dd"
        placeholder={`请选择${label}`}
        onInput={(value) => { model[prop] = value }}
      ></el-date-picker>
    }
  }
}
export const createDaterange = (label, prop, rules, options) => {

  return {
    label,
    prop,
    rules: getRules(label, prop, rules),
    render(h, model) {
      return <el-date-picker
        {...options}
        clearable
        value={Array.isArray(model[prop]) ? model[prop].map(v => formatDate(v)) : []}
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        onInput={(value) => { model[prop] = value }}
      ></el-date-picker>
    }
  }
}

export const createCommonButton = (...arg) => {
  return {
    render() {
      let arr = [...arg]
      if (!Array.isArray(arr[0])) {
        arr = [[...arg]]
      }

      return arr.map(v => {
        if (v[1] === 'submit' || v[1] === 'form.submit') {
          return <s-button type="primary" run="form.submit">{v[0]}</s-button>
        }
        if (v[1] === 'search' || v[1] === 'form.search') {
          return <s-button type="primary" run="form.search">{v[0]}</s-button>
        }
        if (v[1] === 'reset' || v[1] === 'form.reset') {
          return <s-button run="form.reset">{v[0]}</s-button>
        }
        if (v[1] === 'clear' || v[1] === 'form.clear') {
          return <s-button run="form.clear">{v[0]}</s-button>
        }
      })
    }
  }
}
export const createText = (label, prop, options) => {
  return {
    label,
    prop,
    render(h, model) {
      return <s-text {...options} content={model[prop]}></s-text>
    }
  }
}

export const createSelect = (label, prop, rules, options) => {
  return {
    label,
    prop,
    rules: getRules(label, prop, rules),
    render(h, model) {
      return <s-group tag="select" {...options} clearable value={model[prop]} placeholder={`请选择${label}`} onInput={(value) => { model[prop] = value }}></s-group>
    }
  }
}
export const createGroup = (label, prop, rules, options) => {
  return {
    label,
    prop,
    rules: getRules(label, prop, rules),
    render(h, model) {
      return <s-group {...options} clearable value={model[prop]} placeholder={`请选择${label}`} onInput={(value) => { model[prop] = value }}></s-group>
    }
  }
}