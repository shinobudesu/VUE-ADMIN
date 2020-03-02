<template>
  <div id="main">
    <el-upload
      id="upload"
      :accept="config.fileType"
      :action="config.urlImage"
      :limit="config.limit"
      list-type="picture-card"
      :file-list="flist"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-change="handleChange"
      :on-remove="handleRemove"
      ref="upload"
      :on-exceed="handleLimitTip"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      disabled: false,
      fileName: [],
      flist: [],
      dialogImageUrl: "",
      dialogVisible: false
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
    name: {
      type: String,
      default: ""
    }
  },
  created() {},
  mounted() {},
  watch: {
    name(val) {},
    fileList: {
      handler(v1, v2) {
        if (v1 && !this.disabled) {
          this.flist = JSON.parse(JSON.stringify(v1));
          this.disabled = true;
        }
      },
      immediate: true
    },
    config(val) {
      this.$refs.upload.clearFiles();
    }
  },
  methods: {
    clear() {
      this.flist = [];
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {},
    handleDownload(file) {
      window.open(file.url);
    },
    handleRemove(file, fileList) {
      this.returnImg(fileList);
    },
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
        if (item.hasOwnProperty("response")) {
          this.fileName.push(item.response.data.newName);
        } else {
          this.fileName.push(item.url.substring(item.url.indexOf("20")));
        }
      });
      let c = this.name;
      this.$emit("selectUpload", { data: this.fileName, name: this.name });
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
    /deep/.el-upload-list.el-upload-list--picture-card {
      transition: none !important;
      /deep/.el-upload-list__item.is-success {
        transition: none !important;
      }
    }
  }
}
</style>


