<template>
  <div id="main">
    <div id="tools">
      <p class="blank"></p>
      <el-button
        type="primary"
        class="search"
        @click.native="initTable()"
        size="small"
        icon="el-icon-search"
        circle
      ></el-button>
    </div>
    <div id="content" ref="contentWrapper">
      <el-table
        :data="tableData"
        :height="tableHeight"
        border
        v-loading="loading"
        :header-cell-style="{'background-color':'#f8f8f8'}"
      >
        <el-table-column type="index" width="80" label="序号"></el-table-column>
        <el-table-column prop="createAt" label="创建日期"></el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="import(scope.row)">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="total>0"
        background
        @current-change="handleCurrentChange"
        layout="total,prev, pager, next"
        :total="total"
        :page-size="page"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      searchValue: "",
      tableData: [],
      tableHeight: 500, //(表格高度默认500)
      loading: false, //表格加载动画
      page: 15, //当前页总数
      currentpage: 1, //当前页
      total: 10, //总数
      day: new Date(),
      URL: process.env.VUE_APP_BASE
    };
  },
  created() {
    this.initTable();
  },
  mounted() {
    //此处需要通过延迟方法来设置值，不然会出现值已更新，但页面没更新的问题
    setTimeout(() => {
      this.tableHeight = this.$refs.contentWrapper.offsetHeight - 40;
    }, 100);
  },
  methods: {
    excel(blob, fileName, loadingInstance) {
      if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = blob;
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });
    },
    import(data) {
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: "导出中，请耐心等待"
      });
      let date =
        new Date().getFullYear() +
        "年" +
        (new Date().getMonth() + 1) +
        "月" +
        new Date().getDate() +
        "日";
      this.excel(`url`, date + "", loadingInstance);
    },
    //页数变化监听
    handleCurrentChange(val) {
      this.currentpage = val;
      this.initTable();
    },
    //初始化table列表
    initTable() {
      this.loading = true;
      // this.$api.logs.logs
      //   .getLogList(`page=${this.currentpage}`)
      //   .then(res => {
      //     if (res.data.code == 200) {
      //       this.tableData = res.data.data.dataBackups;
      //       this.total = res.data.data.pageInfo.totalEntities;
      //       this.page = res.data.data.pageInfo.pageSize;
      //       this.loading = false;
      //     } else {
      //       this.$message({
      //         message: res.data.message,
      //         type: "error"
      //       });
      //       this.loading = false;
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
#main {
  height: calc(100% - 51px);
  padding: 10px;
  #tools {
    display: flex;
    margin-bottom: 10px;
    .blank {
      flex: 1;
    }
    .el-select,
    .el-input {
      flex: 0 1 150px;
      margin: 0 4px;
    }
    .el-button.search {
      flex: none;
    }
  }
  #content {
    height: calc(100% - 42px);
    .el-table {
      width: 100%;
      margin-bottom: 8px;
    }
  }
}
</style>