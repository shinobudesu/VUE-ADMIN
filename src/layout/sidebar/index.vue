<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical"
    text-color="#000"
    active-text-color="#44c7f1"
    :unique-opened="true"
    :collapse="this.$store.state.menu.flag"
    :collapse-transition="false"
  >
    <!-- 导航菜单树组件，动态加载菜单 -->
    <MenuTree v-show="menuTree" v-for="(item,index) in menuTree" :key="index" :menu="item"></MenuTree>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
import MenuTree from "@/components/menutree";
export default {
  data() {
    return {
      toggleMenu: false,
      activeMenu: "/demo"
    };
  },
  mounted() {},
  watch: {
    "$route.path": {
      handler(v1, v2) {
        this.activeMenu = v1;
      },
      immediate: true
    }
  },
  methods: {},
  computed: {
    ...mapState({
      menuTree: state => {
        if (typeof state.menu.menuTree == "object") {
          return state.menu.menuTree;
        } else {
          return JSON.parse(state.menu.menuTree);
        }
      }
    })
  },
  components: {
    MenuTree
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
}
.el-menu-vertical {
  overflow: hidden;
  min-height: 100%;
  /deep/ .el-menu-item {
    text-align: left;
    height: 40px;
    line-height: 40px;
  }
  /deep/ .el-submenu__title {
    height: 40px;
    line-height: 40px;
  }
}
</style>