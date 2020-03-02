<template>
  <div id="main" style="text-align: left;width: 300px;">
    <el-upload
      id="upload"
      :action="config.urlImage"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleLimitTip"
      :file-list="flist"
      :before-upload="beforeUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "uploadFile",
  data() {
    return {
      returnUrl: [],
      flist: [],
      disabled: false
    };
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    fileList: {
      type: Array
    }
  },
  created() {},
  watch: {
    config(val) {
      this.$refs.upload.clearFiles();
    }
  },
  methods: {
    //返回
    getUrl() {
      return JSON.stringify(this.returnUrl);
    },
    //处理图片问题
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {},
    handleSuccess(response, file, fileList) {
      if (response.code == 200) {
        this.returnUrl.push(response.data);
      } else {
        this.returnUrl = [];
        this.$message({
          message: response.message,
          type: "error"
        });
        fileList.map((item, index) => {
          if (item.uid == file.uid) {
            fileList.splice(index, 1);
          }
        });
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleError(err, file, fileList) {
      this.$message({
        message: err,
        type: "error"
      });
    },
    handleLimitTip(files, fileList) {
      this.$message({
        message: "超出最大上传数",
        type: "error"
      });
    },
    beforeUpload(file) {
      const isLt50M = file.size / 1024 / 1024 < 10;
      if (!isLt50M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "error"
        });
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
#main {
  text-align: left;
  #upload {
    /deep/.el-upload-list.el-upload-list--text {
      transition: none !important;
      /deep/.el-upload-list__item.is-success {
        transition: none !important;
      }
    }
  }
}
</style>


