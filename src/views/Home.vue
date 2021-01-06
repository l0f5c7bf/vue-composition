<template>
  <div>
    <s-form :model="form" size="mini" inline>
      <s-form-item label="手机号" prop="mobile">
        <s-input v-model="form.mobile"></s-input>
      </s-form-item>
      <s-form-item>
        <s-button type="primary" run="form.search">查询</s-button>
      </s-form-item>
      <s-form-item>
        <s-button type="primary" :disabled="types.length === 0" @click="add">添加</s-button>
      </s-form-item>
    </s-form>

    <s-s-table :data="api" :cols="cols"></s-s-table>
    <!-- 弹窗 -->
    <s-dialog :component="require('./dialog/add-phone-black-list.vue').default" width="400px"></s-dialog>
  </div>
</template>

<script>
export default {
  created() {
   setTimeout(()=>{ console.log(this.$ui.updateTable());},3333)
    // console.log(this.$ui.form)
    this.$api('setting.securityIntentionMobileBlacklistGetBlacklistTypes')
      .then(({ data }) => {
        this.types = data.list
      })
      .catch(() => {
        this.types = [
          { name: '友商', value: '1' },
          { name: '骚扰电话', value: '2' },
          { name: '免打扰', value: '3' },
          { name: '中企员工', value: '4' },
        ]
      })
  },
  data() {
    return {
      types: [],
      form: {
        mobile: '',
      },
      cols: [
        {
          label: '手机号',
          prop: 'mobile',
        },
        {
          label: '类型',
          prop: ({ row }) => {
            try {
              return this.types.find((v) => v.value == row.blacklistType).name
              // eslint-disable-next-line no-empty
            } catch (error) {}
          },
        },
        {
          label: '',
          prop: ({ row }) => {
            return (
              <div>
                <s-button
                  confirm="确定要删除么"
                  type="text"
                  onclick={() => {
                    this.del(row)
                  }}
                >
                  删除
                </s-button>
              </div>
            )
          },
        },
      ],
    }
  },

  methods: {
    api(params) {
      return this.$api('setting.phoneBlackList', params)
    },
    // getType(row){
    // 	if(row.blacklistType==1){
    // 		return '友商'
    // 	}else if(row.blacklistType==2){
    // 		return '骚扰电话'
    // 	}else if (row.blacklistType==3){
    // 		return '免打扰'
    // 	}else if (row.blacklistType==4){
    // 		return '中企员工'
    // 	}
    // 	else{
    // 		return '-'
    // 	}
    // 	return '-'
    // },
    add() {
      this.$store.commit('ui.dialog.open', { types: this.types })
    },
    del(item) {
      this.$api('setting.delPhoneBlackList', { id: item.id }).then(
        ({ status, msg }) => {
          this.$message({
            type: 'success',
            message: msg,
          })
          if (status == 101) {
            this.$store.commit('ui.update.table')
          }
        }
      )
    },
  },
}
</script>

<style>
</style>
