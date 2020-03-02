<template>
  <div id="form">
    <el-form
      :model="formData"
      :label-position="labelPosition"
      size="small"
      :rules="rules"
      ref="formData"
    >
      <el-form-item label="公司名称" :label-width="formLabelWidth">
        <el-select v-model="formData.companyId" placeholder="请选择公司" style="width:100%">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item,index) in company"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="formData.name" placeholder="请输入部门名称" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="btnCancelEvent()">取 消</el-button>
      <el-button type="primary" @click.native="btnOkEvent()">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formDataProps: {
      type: Object
    },
    formType: {
      type: String,
      default: ""
    },
    company: {
      type: Array
    }
  },
  data() {
    return {
      formData: {
        name: ""
      },
      formLabelWidth: "100px",
      labelPosition: "left",
      rules: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this.formData = this.formDataProps;
    this.formData.companyId = this.$store.state.login.companyId || "";
  },
  watch: {
    //通过监听解决dom不会重新渲染问题
    //监听类型变化
    formType(val) {
      this.formType = val;
    },
    //监听值变化
    formDataProps(val) {
      this.formData = val;
    }
  },
  mounted() {},
  methods: {
    //确定事件
    btnOkEvent() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.formType == "edt" ? this.edtData() : this.insData();
        } else {
          return false;
        }
      });
    },
    //取消事件
    btnCancelEvent() {
      this.closeDialog();
    },
    //重置表单
    resetForm() {
      this.$refs.formData.resetFields();
    },
    //关闭窗口事件
    closeDialog() {
      this.$emit("closeDialog");
    },
    //编辑
    edtData() {
      let id = this.formData.id;
      delete this.formData.id;
      this.$api.depart.depart
        .edtDepartmentInfo(id, this.formData)
        .then(res => {
          if (res.data.code == 200) {
            this.closeDialog();
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //新增
    insData() {
      this.$api.depart.depart
        .addDepartmentInfo(this.formData)
        .then(res => {
          if (res.data.code == 200) {
            this.closeDialog();
            this.$message({
              type: "success",
              message: "新增成功!"
            });
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
#form {
  .el-form {
    .el-select {
      float: left;
    }
  }
}
</style>