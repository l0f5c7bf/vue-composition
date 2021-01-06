import { mapState } from 'vuex'
import { timestamp, uid, event, params } from '../../store'

const props = {
  uid: {
    default: 0
  },
  component: {
    required: true
  }
}

export default {
  watch: {
    sTimestamp() {
      if (
        this.sUID === this.uid || this.sUID === 'all'
      ) {
        this.visible = this.sEvent === 'open'
      }
    },
  },
  computed: {
    ...mapState({
      sTimestamp: state => state.dialog[timestamp],
      sUID: state => state.dialog[uid],
      sEvent: state => state.dialog[event],
      sParams: state => state.dialog[params]
    })
  },
  data() {
    return {
      visible: false
    }
  },
  props,
  render(h) {
    const props = { ...this.$attrs }
    const on = { ...this.$listeners }
    props['destroy-on-close'] = true
    props['visible'] = this.visible
    on['close'] = (val) => {
      this.$store.commit('ui.dialog.close', { _uid: this.uid })
      this.$emit('close', val)
    }
    return h('el-dialog', {
      props,
      on
    }, [this.visible, this.visible && h(this.component, { props: this.sParams })])
  },

}


