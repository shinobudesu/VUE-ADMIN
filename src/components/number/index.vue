<template>
  <div id="number">
    <div
      class="item"
      v-for="(item,index) in num.toString().split('')"
      :key="index"
      :class="returnV(item,index)"
    >
      <span v-for="(item2,index2) in 10" :key="index2" :class="returnC(index2)">{{index2}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    num: Number
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    returnC(c) {
      return "c" + c;
    },
    returnV(vt, v) {
      return "v" + v + " " + "vt" + vt;
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
#number {
  position: relative;
  height: 30px;
  overflow: hidden;
  .item {
    top: 0;
    position: absolute;
    display: inline-block;
    height: 300px;
    width: 20px;
    transition: all 0.2s;
    span {
      position: absolute;
      display: block;
      line-height: 30px;
      width: 20px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .c0 {
      top: 0;
    }
    .c1 {
      top: 30px;
    }
    .c2 {
      top: 60px;
    }
    .c3 {
      top: 90px;
    }
    .c4 {
      top: 120px;
    }
    .c5 {
      top: 150px;
    }
    .c6 {
      top: 180px;
    }
    .c7 {
      top: 210px;
    }
    .c8 {
      top: 240px;
    }
    .c9 {
      top: 270px;
    }
  }
  .v0 {
    left: 0px;
  }
  .v1 {
    left: 20px;
  }
  .v2 {
    left: 40px;
  }
  .v3 {
    left: 60px;
  }
  .v4 {
    left: 80px;
  }
  .v5 {
    left: 100px;
  }
  .v6 {
    left: 120px;
  }
  .v7 {
    left: 140px;
  }
  .v8 {
    left: 160px;
  }
  .v9 {
    left: 180px;
  }
  .v10 {
    left: 200px;
  }
  .vt0 {
    top: 0px;
  }
  .vt1 {
    top: -30px;
  }
  .vt2 {
    top: -60px;
  }
  .vt3 {
    top: -90px;
  }
  .vt4 {
    top: -120px;
  }
  .vt5 {
    top: -150px;
  }
  .vt6 {
    top: -180px;
  }
  .vt7 {
    top: -210px;
  }
  .vt8 {
    top: -240px;
  }
  .vt9 {
    top: -270px;
  }
}
</style>