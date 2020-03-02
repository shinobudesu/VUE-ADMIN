<template>
  <div id="mainconent">
    <Curmbs></Curmbs>
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
import Curmbs from "@/components/curmbs/index.vue";
export default {
  name: "maincontent",
  data() {
    return {};
  },
  computed: {
    key() {
      return this.$route.path;
    }
  },
  methods: {},
  components: {
    Curmbs
  }
};
</script>

<style lang="less" scoped>
#mainconent {
  position: relative;
  height: 100%;
}
</style>