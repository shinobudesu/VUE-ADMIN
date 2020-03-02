<template>
  <div id="main" style="text-align: left;width: 300px;">
    <el-upload
      id="upload"
      :action="config.urlImage"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      multiple
      :limit="config.limit"
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
      returnUrl: "",
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
    },
    URLicon: {
      type: Object
    },
    name: {
      type: String
    }
  },
  created() {
    this.flist = this.fileList;
  },
  watch: {
    fileList(val) {
      if (val && !this.disabled) {
        this.flist = JSON.parse(JSON.stringify(val));
        this.disabled = true;
      }
    },
    config(val) {
      this.$refs.upload.clearFiles();
    }
  },
  methods: {
    //返回
    getUrl() {
      return this.returnUrl;
    },
    //处理图片问题
    handleRemove(file, fileList) {
      this.returnImg(fileList);
    },
    handlePictureCardPreview(file) {},
    handleSuccess(response, file, fileList) {
      if (response.code == 200) {
        this.returnImg(fileList);
      } else {
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
    returnImg(fileList) {
      this.fileName = [];
      fileList.map(item => {
        let obj = {
          newName: "",
          oldName: ""
        };
        if (item.hasOwnProperty("response")) {
          obj.newName = item.response.data.newName;
          obj.oldName = item.name;
        } else {
          obj.newName = item.url.substring(item.url.indexOf("20"));
          obj.oldName = item.name;
        }
        this.fileName.push(obj);
      });
      this.$emit("selectUpload", {
        data: JSON.stringify(this.fileName),
        name: this.name
      });
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


