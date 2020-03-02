<template>
  <div id="navbar">
    <img class="logo" src alt />
    <div class="title">XXX系统</div>
    <div class="blank"></div>
    <el-dropdown class="info" trigger="click">
      <span class="el-dropdown-link">
        {{nickName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-avatar class="avatar" :src="avatar" @error="errorHandler"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="edtSelfInfo()">修改个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="exit()">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="修改个人信息"
      :visible.sync="dialogTableVisible"
      width="30%"
      :modal="true"
      :append-to-body="true"
    >
      <el-form ref="ruleForm" label-width="100px">
        <el-form-item label="姓名">
          <el-input type="text" v-model="ruleForm.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      checkPass: "",
      ruleForm: {
        phone: "",
        nickName: "",
        password: ""
      },
      dialogTableVisible: false,
      avatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      imageUrl: process.env.VUE_APP_BASEIMAGEURL
    };
  },
  created() {},
  methods: {
    //获取数据
    getUserInfo() {
      this.$api.userinfo.userinfo
        .getUserInfo()
        .then(res => {
          if (res.data.code == 200) {
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

    //处理错误
    errorHandler() {
      return true;
    },

    //修改个人信息
    edtSelfInfo() {
      this.dialogTableVisible = true;
      this.getUserInfo();
    },
    submitForm() {
      if (this.checkPass != this.ruleForm.password) {
        this.$message({
          message: "2次输入密码不一致",
          type: "error"
        });
        return false;
      }
      let data = {};
      if (this.ruleForm.phone) {
        data.phone = this.ruleForm.phone;
      }
      if (this.ruleForm.nickName) {
        data.nickName = this.ruleForm.nickName;
      }
      if (this.ruleForm.password) {
        data.password = this.ruleForm.password;
      }
      this.$api.userinfo.userinfo.edtSelfUser(data).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogTableVisible = false;
          if (data.nickName) {
            this.$store.state.login.nickname = data.nickName;
            localStorage.nickname = data.nickName;
          }
          if (data.password) {
            this.$store.commit("LOGOUT");
            this.$router.push("/login");
          }
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    //退出登录
    exit() {
      this.$store.commit("LOGOUT");
      this.$message({
        message: "退出成功",
        type: "success"
      });
      this.$router.push("/login");
    }
  },
  computed: {
    //获取用户昵称
    nickName() {
      return this.$store.state.login.nickname || localStorage.nickname;
    }
  }
};
</script>

<style lang="less" scoped>
#navbar {
  height: 60px;
  padding: 0 20px;
  display: flex;
  background-color: #3578fb;
  .logo {
    flex: 0 1 40px;
    height: 40px;
    width: 40px;
    margin-top: 8px;
  }
  .title {
    flex: 0 1 200px;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
  .blank {
    flex: 1;
  }
  .info {
    line-height: 60px;
    cursor: pointer;
    .el-dropdown-link {
      color: #fff;
    }
    .avatar {
      vertical-align: top;
      margin-top: 8px;
      margin-left: 10px;
    }
  }
}
</style>