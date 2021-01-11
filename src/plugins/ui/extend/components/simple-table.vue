/* eslint-disable no-empty */
<template>
  <div>
    <Table border v-bind="$attrs" v-on="$listeners" v-loading="tableIsLoading" :uid="uid" :data="tableData">
      <slot></slot>
    </Table>
    <slot name="footer"></slot>
    <div v-if="page!==false" class="ce-pagination">
      <slot name="page"></slot>
      <Page @init="pageInit" :currentPage="currentPage" :pageSize="pageSize" @current-change="currentChange" v-bind="page" @size-change="sizeChange" :uid="uid" :total="total" ref="page"></Page>
    </div>
  </div>
</template>

<script>
import Table from './table'
import Page from './pagination'
import events from '../utils/events'

export default {
  components: { Table, Page },
  props: {
    uid: {
      default: 0,
    },
    data: {
      required: true,
    },
    init: {
      default: true,
    },
    params: {
      default: null,
    },
    page: [Object, Boolean],
  },
  data() {
    return {
      tableData: [],
      tableIsLoading: false,
      total: undefined,
      currentPage: 1,
      pageSize: 10,
      otherParams: undefined,
    }
  },
  methods: {
    async change(params) {
      this.tableIsLoading = true
      try {
        const res = await this.data(params)

        console.log(111,res);
        this.tableData = res.data
        this.total = res.total
        this.tableIsLoading = false
      } catch (err) {
        this.tableIsLoading = false
        this.tableData = []
        this.total = undefined
        console.error(err)
      }
    },
    mergeParams(isResetCurrentPage = false) {
      if (isResetCurrentPage) {
        this.currentPage = 1
      }
      this.change({
        ...this.params,
        ...this.otherParams,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
    },
    otherParamsChange(params) {
      this.otherParams = params
      this.mergeParams(true)
    },
    sizeChange(pageSize) {
      this.pageSize = pageSize
      this.mergeParams(false)
    },
    currentChange(currentPage) {
      this.currentPage = currentPage
      this.mergeParams(false)
    },
    pageInit(pageParams) {
      const { currentPage, pageSize } = pageParams
      this.currentPage = currentPage
      this.pageSize = pageSize
    },
  },
  created() {
    events.$on(`table.${this.uid}.update`, this.otherParamsChange)
  },
  beforeDestroy() {
    events.$off(`table.${this.uid}.update`, this.otherParamsChange)
  },
}
</script>
<style>
.ce-pagination {
  padding: 20px 0;
  overflow: hidden;
}
.ce-pagination .el-pagination {
  float: right;
}
</style>