<template>
  <div class="panel" :class="{'is-border':border!==false}">
    <el-divider class="title" v-if="title" :content-position="contentPosition">{{title}}</el-divider>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    contentPosition: {
      default: 'left',
      type: String
    },
    border: {
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.panel {
  &.is-border {
    border: 1px solid #dcdfe6;
    border-top: none;
    margin-bottom: 10px;
  }
  .content {
    padding: 10px 20px;
  }
  >>> .el-form-item {
    margin-bottom: 0;
  }
}
</style>