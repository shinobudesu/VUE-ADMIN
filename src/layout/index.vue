<template>
  <el-container id="main">
    <el-header>
      <Navbar></Navbar>
    </el-header>
    <el-container>
      <el-aside :class="changeMenu">
        <Sidebar></Sidebar>
      </el-aside>
      <el-main>
        <Maincontent></Maincontent>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "@/layout/sidebar/index.vue";
import Maincontent from "@/layout/maincontent/index.vue";
import Navbar from "@/layout/navbar/index.vue";
export default {
  name: "layout",
  components: {
    Sidebar,
    Maincontent,
    Navbar
  },
  computed: {
    changeMenu() {
      return this.$store.state.menu.flag ? "close" : "open";
    }
  }
};
</script>

<style lang="less" scoped>
#main {
  height: 100%;
  width: 100%;
  min-height: 768px;
  min-width: 1280px;
  position: relative;
  z-index: 1;
  .el-container {
    height: calc(100% - 60px);
  }
  .el-header {
    position: relative;
    height: 60px !important;
    z-index: 1;
    padding: 0;
  }
  .el-main {
    position: relative;
    z-index: 2;
    padding: 0;
    margin: 0;
    background: #fff;
    border-left: 1px solid #ccc;
  }
  .el-aside {
    position: relative;
    z-index: 1;
    overflow-x: hidden;
  }
  .close {
    width: 64px !important;
  }
  .open {
    width: 180px !important;
  }
}
</style>