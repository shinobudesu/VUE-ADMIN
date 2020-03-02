<template>
  <el-submenu
    class="_elsubmenu"
    v-if="menu.children && menu.children.length >= 1"
    :index="menu.route||menu.id+''"
  >
    <template slot="title">
      <i :class="menu.icon"></i>
      <span slot="title" :class="{'blod':menu.level==1}">{{menu.name}}</span>
    </template>
    <MenuTree v-for="(item,index) in menu.children" :key="index" :menu="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="menu.route" @click="handleRoute(menu)">
    <i :class="menu.icon"></i>
    <span slot="title" :class="{'blod':menu.level==1,'size':menu.level!=1}">{{menu.name}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "MenuTree",
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  created() {},
  methods: {
    handleRoute(menu) {
      // 通过菜单URL跳转至指定路由
      if (menu.route != this.$route.path) {
        this.$router.push(menu.route);
      }
    }
  }
};
</script>

<style lang="less" scoped>
._elsubmenu {
  text-align: left;
}
.blod {
  font-weight: bold;
}
.size {
  font-size: 12px;
  padding-left: 20px;
}
</style>

