<template>
  <div class="pt20">
    <s-form :hide-required-asterisk="true" :uid="22" :model="form" @submit="save" label-width="80px" :rules="rules">
      <s-form-item :inject="$ui.form.createInput('手机', 'mobile')"></s-form-item>
      <s-form-item :inject="
          $ui.form.createSelect(
            '类型',
            'blacklistType',
            rules.blacklistType,
            typConfig
          )
        "></s-form-item>
      <!-- 保存操作 -->
      <s-form-item>
        <s-button type="primary" :run="['form.submit','dialog.close']">确定</s-button>
      </s-form-item>
    </s-form>
  </div>
</template>

<script>
export default {
  created() {},
  props: {
    types: {
      default() {
        return []
      },
    },
  },
  data() {
    var validateTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入'))
      } else if (!/[0-9]{12}/.test(this.form.mobile)) {
        return callback(new Error('请输入正确的号码'))
      } else {
        callback()
      }
    }
    return {
      form: {
        mobile: '',
        blacklistType: '',
      },
      typConfig: {
        props: {
          props: {
            label: 'name',
            value: 'value',
          },
          data: this.types,
        },
      },
      rules: {
        mobile: [{ validator: validateTel, trigger: 'blur' }],
        blacklistType: [{ required: true, message: '请选择' }],
      },
    }
  },
  methods: {
    save() {
      let tempForm = this.form
      this.$api('setting.addPhoneBlackList', tempForm).then((res) => {
        this.$message({
          type: 'success',
          message: res.o.msg,
        })
        if (res.o.status == 101) {
          this.$closeDialog()
          this.$store.commit('ui.update.table')
        }
      })
    },
  },
}
</script>

<style>
</style>
