<template>
  <div id="main">
    <div id="tools">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click.native="addDepart()"
        round
        size="small"
      >新增</el-button>
      <p class="blank"></p>
      <el-input v-model="searchValue" size="small" placeholder="请输入内容"></el-input>
      <el-button
        type="primary"
        class="search"
        @click.native="searchList()"
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
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="操作" width="144">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <!-- 编辑新增 -->
    <el-dialog
      :title="formType=='edt'?'编辑':'新增'"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="resetForm()"
      width="30%"
    >
      <EdtIns
        ref="edtins"
        @closeDialog="closeDialog"
        :formDataProps="formData"
        :formType="formType"
        :company="company"
      ></EdtIns>
    </el-dialog>
  </div>
</template>

<script>
import EdtIns from "./edtIns.vue";
export default {
  data() {
    return {
      searchValue: "",
      company: [],
      tableData: [],
      tableHeight: 500, //(表格高度默认500)
      loading: false, //表格加载动画
      dialogFormVisible: false, //编辑新增弹窗
      formData: {}, //编辑表单数据
      formType: "", //dialog类型edt:ins
      page: 15, //当前页总数
      currentpage: 1, //当前页
      total: 10 //总数
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
    //页数变化监听
    handleCurrentChange(val) {
      this.currentpage = val;
      this.initTable();
    },
    //查询列表
    searchList() {
      this.initTable();
    },
    //重置表单
    resetForm() {
      this.$refs.edtins.resetForm();
    },
    //关闭编辑新增窗口
    closeDialog() {
      this.dialogFormVisible = false;
      this.initTable();
    },
    //处理编辑
    handleEdit(index, row) {
      this.edtDepart(row);
    },
    //处理删除
    handleDelete(index, row) {
      this.delDepart(row.id, index);
    },
    //初始化table列表
    initTable() {
      this.loading = true;
      // this.$api.depart.depart
      //   .getDepartmentList(
      //     `name=${this.searchValue}&page=${this.currentpage}&companyId=`
      //   )
      //   .then(res => {
      //     if (res.data.code == 200) {
      //       this.tableData = res.data.data.departments;
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
    },
    //删除部门
    delDepart(id, index) {
      this.$confirm("此操作将删除该子公司, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$api.depart.depart
          //   .delDepartmentInfo(id)
          //   .then(res => {
          //     if (res.data.code == 200) {
          //       this.delItem(index);
          //       this.$message({
          //         type: "success",
          //         message: "删除成功!"
          //       });
          //     } else {
          //       this.$message({
          //         message: res.data.message,
          //         type: "error"
          //       });
          //     }
          //   })
          //   .catch(function(error) {
          //     console.log(error);
          //   });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //移除列表项
    delItem(index) {
      this.total--;
      this.tableData.splice(index, 1);
    },
    //添加部门
    addDepart() {
      this.dialogFormVisible = true;
      this.formType = "ins";
      this.formData = {};
    },
    edtDepart(row) {
      this.dialogFormVisible = true;
      this.formType = "edt";
    }
  },
  components: {
    EdtIns
  }
};
</script>

<style lang="less" scoped>
#main {
  height: calc(100% - 51px);
  padding: 10px;
  #tools {
    display: flex;
    margin-bottom: 10px;
    .el-button {
    }
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