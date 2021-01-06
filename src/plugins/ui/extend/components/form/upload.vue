<template>
  <div :class="`upload-container__${listType}__${limit}`">
    <el-upload :class="`upload__${listType}__${limit}`" v-bind="$attrs" v-on="$listeners" ref="upload" :listType="listType" :disabled="disabled" :action="action" :accept="accept" :on-preview="preview" :on-remove="remove" :before-remove="beforeRemove" :before-upload="beforeUpload" :limit="limit" :on-success="success" :on-error="error" :on-exceed="exceed" :file-list="fileList" :http-request="httpRequest">
      <!-- slot -->
      <slot v-if="$slots.default"></slot>
      <!-- picture-card -->
      <i class="el-icon-plus" v-if="!$slots.default&&listType==='picture-card'"></i>
      <!-- picture or text -->
      <el-button v-if="!$slots.default&&(listType==='text'||listType==='picture')" :disabled="disabled" type="primary">点击上传</el-button>
      <div v-if="!$slots.default&&(listType==='text'||listType==='picture')" slot="tip" class="el-upload__tip">允许的文件类型：{{accept}}</div>
    </el-upload>
    <el-dialog v-if="listType === 'picture' || listType === 'picture-card'" :visible.sync="previewDialog">
      <img width="100%" :src="previewImageURL" :alt="previewImageURL" />
    </el-dialog>
  </div>
</template>
<script>
/**
 * listType:text|picture|picture-card
 * files:[{ name:'',url:''}]
 *
 */

export default {
  props: {
    listType: {
      default: 'text',
    },
    disabled: {
      default: false,
    },
    value: {
      default: '',
    },
    limit: {
      default: 1,
    },
    action: {
      default: 'common.uploadCommon',
    },
    accept: {
      require: true,
      default: 'gif,png,jpg,jpeg',
    },
    size: {
      type: Number,
      default: 10,
    },
    files: {
      default: () => [],
    },
  },
  inject: ['elFormItem'],
  watch: {
    files(fileList) {
      this.fileList = fileList
    },
  },
  data() {
    return {
      fileList: this.files,
      previewImageURL: '',
      previewDialog: false,
    }
  },
  methods: {
    httpRequest({ file, action, onSuccess, onError, onProgress }) {
      const params = new FormData()
      params.append('file', file)
      params.append(
        'filterFileExtNames',
        this.accept
          .split(',')
          .map((v) => v.toLocaleLowerCase().trim())
          .join()
      )
      params.append('allowFileSizeStr', this.size)
      this.$api(action, params, {
        onUploadProgress: (progressEvent) => {
          const percent =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0
          onProgress({ percent: percent })
        },
      })
        .then((response) => onSuccess(response))
        .catch((error) => onError(error))
    },
    syncFileList(fileList) {
      const fileData = this.getEmitData(fileList)
      this.$emit('update:files', fileData)
      this.$emit('input', fileData.map((v) => v.id).join())
      this.elFormItem.$emit('el.form.blur')
    },
    errorMessage(message) {
      if (Object.prototype.hasOwnProperty.call(this.$listeners, 'error')) {
        this.$emit('error', message)
        return
      }
      this.$message.error(message)
    },
    getEmitData(fileList) {
      //ceboss 兼容
      return fileList.map((v) => {
        try {
          const ftpFileVo = v.response.ftpFileVo || v.response.data.ftpFileVo
          return {
            name: ftpFileVo.fileName,
            url: ftpFileVo.fileURL,
            id: ftpFileVo.id,
          }
        } catch (error) {
          return v
        }
      })
    },
    preview(file) {
      try {
        // ceboss 首次上传兼容
        file = file.response.ftpFileVo || file.response.data.ftpFileVo
        file.url = file.fileURL
        file.name = file.fileName
      // eslint-disable-next-line no-empty
      } catch (error) {}

      // 容错
      if (!file.url) {
        this.$message({
          message: '当前文件暂不支持预览！',
          type: 'info',
        })
        return
      }
      //临时
      window.open(file.url)
      return
      // if (this.listType === 'text') {
      //   window.open(file.url)
      // } else {
      //   this.previewImageURL = file.url
      //   this.previewDialog = true
      // }
    },
    success(response, file, fileList) {
      this.$emit('success', fileList)
      this.syncFileList(fileList)
    },
    beforeUpload(file) {
      const fileNamePathSplitArr = file.name.split('.')
      const fileSuffix = fileNamePathSplitArr[fileNamePathSplitArr.length - 1]
      if (
        fileSuffix === null ||
        !this.accept
          .split(',')
          .map((v) => v.toLocaleLowerCase().trim())
          .includes(fileSuffix.toString().toLocaleLowerCase())
      ) {
        this.errorMessage(`只能上传 ${this.accept} 格式的文件!`)
        return false
      }
      if (file.size / 1024 / 1024 > this.size) {
        this.errorMessage('上传附件大小不能超过 ' + this.size + 'MB!')
        return false
      }
      this.uploadLimitMax = true
      return true
    },
    error() {
      this.errorMessage('上传出错！')
    },
    remove(file, fileList) {
      this.syncFileList(fileList)
    },
    beforeRemove() {},
    exceed() {
      this.errorMessage(`超出最大允许上传数量${this.limit}个！`)
    },
  },
}
</script>

<style >
.upload-container__picture-card__1 {
  height: 148px;
  width: 148px;
  overflow: hidden;
}
</style>