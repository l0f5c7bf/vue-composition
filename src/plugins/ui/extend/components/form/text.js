import formatDate from '../../utils/format-date'
export default {
  props: {
    formatDate: String,
    content: {
      required: true
    },
    tag: {
      default: 'span'
    },
    options: Array,
    tip: String | Boolean,
    emptyText: {
      default: '--'
    }
  },
  render(h) {
    let content = this.content
    // 日期
    if (this.formatDate) {
      content = formatDate(content, this.formatDate)
    }

    // 选项
    if (this.options) {
      try {
        content = this.option.filter(v => v.value === content)[0].label
      } catch (error) {
        console.waring(error)
      }
    }

    //空值
    if (!content) {
      content = this.emptyText
    } else {
      content = content + ''
    }


    return this.tip ? h('el-tooltip', {
      props: {
        openDelay: 800,
        effect: 'dark',
        content: 'string' === typeof this.tip ? this.tip : content
      }
    }, [h('div', {
      class: 'ell'
    }, content)]) : h(this.tag, {
      class: 'g9'
    }, content)
  },
}