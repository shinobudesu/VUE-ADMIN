<template>
  <div id="main">
    <div class="loginBox">
      <p class="sysName">XXX系统</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="ruleForm.username" placeholder="输入登录账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="输入账户密码"
          ></el-input>
        </el-form-item>
        <div class="check">
          <el-checkbox v-model="checked">记住用户名</el-checkbox>
        </div>
        <el-form-item>
          <el-button
            type="warning"
            style="width: 100%"
            @click="submitForm('ruleForm')"
            @keyup.enter="submitForm('ruleForm')"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      checked: false,
      rules: {
        username: [
          { required: true, message: "请输入账号名称", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    if (localStorage.username && localStorage.username != "undefined") {
      this.ruleForm.username = localStorage.username;
      this.checked = true;
    } else {
      this.ruleForm.username = "";
      this.checked = false;
    }
    document.onkeydown = e => {
      if (e.keyCode === 13) {
        this.submitForm("ruleForm");
      }
    };
  },
  methods: {
    //登录提交
    submitForm(formName) {
      this.$message({
        message: "登录成功",
        type: "success",
        duration: 1000
      });
      // let data = res.data.data;
      let menus = [
        {
          icon: "el-icon-s-data",
          id: 1,
          level: 1,
          name: "demo",
          parentId: 0,
          route: "/demo"
        },
        {
          icon: "el-icon-notebook-1",
          id: 2,
          level: 1,
          name: "question",
          parentId: 0,
          route: "/question"
        },
        {
          icon: "el-icon-document-checked",
          id: 3,
          level: 1,
          name: "logs",
          parentId: 0,
          route: "/logs"
        }
      ];
      // this.checked
      //   ? (data.username = this.ruleForm.username)
      //   : (data.username = "");
      // this.$store.commit("LOGIN", data); //同步vuex
      this.$store.commit("SETMENUTREE", menus);
      this.$router.push("/demo");
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     this.$api.login.login.login(this.ruleForm).then(res => {
      //       if (res.data.code == 200) {
      //         this.$message({
      //           message: "登录成功",
      //           type: "success",
      //           duration: 1000
      //         });
      //         let data = res.data.data;
      //         res.data.data.menus = [
      //           {
      //             icon: "el-icon-s-data",
      //             id: 1,
      //             level: 1,
      //             name: "xxx",
      //             parentId: 0,
      //             route: "/dataStatistics"
      //           },
      //           {
      //             icon: "el-icon-notebook-1",
      //             id: 6,
      //             level: 1,
      //             name: "xxx",
      //             parentId: 0,
      //             route: "/checkin"
      //           },
      //           {
      //             icon: "el-icon-document-checked",
      //             id: 5,
      //             level: 1,
      //             name: "xxx",
      //             parentId: 0,
      //             route: "/epidemic"
      //           },
      //           {
      //             icon: "el-icon-user",
      //             id: 4,
      //             level: 1,
      //             name: "xxx",
      //             parentId: 0,
      //             route: "/people"
      //           },
      //           {
      //             icon: "el-icon-warning-outline",
      //             id: 3,
      //             level: 1,
      //             name: "常见问题",
      //             parentId: 0,
      //             route: "/question"
      //           }
      //         ];
      //         this.checked
      //           ? (data.username = this.ruleForm.username)
      //           : (data.username = "");
      //         this.$store.commit("LOGIN", data); //同步vuex
      //         this.$store.commit("SETMENUTREE", res.data.data.menus);
      //         this.$router.push("/dataStatistics");
      //       } else if (res.data.code == 203) {
      //         this.$message({
      //           message: "登录失败！账号或密码错误",
      //           type: "error"
      //         });
      //       } else {
      //         this.$message({
      //           message: res.data.message,
      //           type: "error"
      //         });
      //       }
      //     });
      //   } else {
      //     this.$message({
      //       message: "请输入对应的账号信息"
      //     });
      //     return false;
      //   }
      // });
    }
  },
  components: {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
#main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/ty_bg1.png") no-repeat;
  background-size: 100%;
  .loginBox {
    padding: 20px 40px;
    width: 306px;
    height: 230px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    .sysName {
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      margin-top: 8px;
    }
    .demo-ruleForm {
      .check {
        margin-top: -4px;
        display: flex;

        margin-bottom: 10px;
        .el-checkbox {
          align-items: center;
          color: #fff;
        }
      }
      .baseClass {
        background: url("../../assets/dl_ico_xz1.png") no-repeat;
        background-size: 18px 18px;
        display: flex;
        align-items: center;
        margin-top: -4px;
        margin-bottom: 10px;
        #check {
          margin-left: 10px;
          opacity: 0;
          span {
            color: #fff;
          }
        }
      }
      .checkClass {
        background: url("../../assets/dl_ico_xz2.png") no-repeat;
        background-size: 18px 18px;
        background-position: top left;
        display: flex;
        align-items: center;
        color: #fff;

        #check {
          margin-left: 10px;
          opacity: 0;
          span {
            color: #fff;
          }
        }
      }
    }
    /*   margin: auto;
    transform: translate(-50%, -50%); */
  }
}
</style>