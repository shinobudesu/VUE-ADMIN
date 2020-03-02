<template>
  <div id="breadcrumb">
    <i :class="rotate" @click="toggleMenu()"></i>
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <span v-if="index==levelList.length-1||!item.meta.tolink">{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  computed: {
    rotate() {
      return this.$store.state.menu.flag
        ? "el-icon-s-grid menu"
        : "el-icon-menu menu";
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    //控制菜单
    toggleMenu() {
      this.$store.state.menu.flag = !this.$store.state.menu.flag;
    },
    //通过路由获取
    getBreadcrumb() {
      // only show routes with meta.title

      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;

      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;

      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      if (item.meta.back == "auction") {
        this.$router.push({
          path: this.pathCompile(path),
          query: { id: this.$store.state.auction.id }
        });
      } else {
        this.$router.push(this.pathCompile(path));
      }
    }
  }
};
</script>

<style lang="less" scoped>
#breadcrumb {
  display: flex;
  border-bottom: 1px solid #ccc;
  .menu {
    flex: 0 1 30px;
    font-size: 24px;
    margin: 3px;
    cursor: pointer;
    transition: all 0.5s;
  }
  .breadcrumb.el-breadcrumb {
    flex: 1;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;

    /* breadcrumb transition */
    .breadcrumb-enter-active,
    .breadcrumb-leave-active {
      transition: all 0.2s;
    }

    .breadcrumb-enter,
    .breadcrumb-leave-active {
      opacity: 0;
      transform: translateX(20px);
    }

    .breadcrumb-move {
      transition: all 0.2s;
    }

    .breadcrumb-leave-active {
      position: absolute;
    }
  }
}
</style>
