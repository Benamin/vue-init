<template>
  <div class="allList">
    <div class="input-div">
      <el-button type="primary" @click="dialogCreateVisible = true">新增</el-button>
    </div>
    <div class="table_list">
      <el-table
        :data="tableData"
        ref="multipleTable"
        v-loading="loading"
        border
        style="width: 100%">
        <el-table-column
          label="期号"
          align="center"
          prop="issureNumber"></el-table-column>
        <el-table-column
          prop="title"
          width="180"
          label="标题"></el-table-column>
        <el-table-column
          prop="submissionDate"
          label="报送日期"></el-table-column>
        <el-table-column
          prop="wordCloud"
          label="词云"></el-table-column>
        <el-table-column
          prop="uploadUser"
          label="上传人"></el-table-column>
        <el-table-column
          prop="fileAddress"
          label="文件地址"></el-table-column>
        <el-table-column
          prop="SYS_NAME"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editItem(scope.row)" type="text">编辑</el-button>
            <el-button @click="deleteItem(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: right"
                     background
                     @current-change="handleCurrentChange"
                     :current-page.sync="obj.pageNum"
                     :page-size="obj.pageSize"
                     layout="prev, pager, next"
                     :total="total">
      </el-pagination>
    </div>
    <create :dialog-group-visible="dialogCreateVisible"
            :edit-id="editId" @close-dialog="handleClose"></create>
  </div>
</template>

<script>
  import {rest_s} from "../http";
  import Create from "./dialog/create";

  export default {
    name: "list",
    components: {Create},
    data() {
      return {
        loading: false,
        obj: {
          page: 1,
          size: 10
        },
        total: 0,
        dialogCreateVisible: false,
        tableData: [],
        editId: ''
      }
    },
    created() {
      this.GetList();
    },
    methods: {
      async GetList() {
        this.loading = true;
        const resp = await this.$axios(`${rest_s}/special/query/reportpage${this.$utils.toQuery(this.obj)}`)
        if (resp.errcode === "0") {
          this.tableData = resp.data.records;
        }
        this.loading = false;
      },
      //编辑
      editItem(row) {
        this.dialogCreateVisible = true;
        this.editId = row.id;
      },
      //删除
      async deleteItem(row) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const resp = await this.$axios.delete(`${rest_s}/special/delete/report?id=${row.id}`);
          if (resp.errcode === '0') {
            this.$message.success('删除成功')
            this.GetList();
          }
        });
      },
      handleCurrentChange(val) {
        this.obj.pageNum = val;
        this.GetList();
      },
      handleClose() {
        this.editId = "";
        this.GetList();
        this.dialogCreateVisible = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .allList {
    margin: 50px;
  }

  .input-div {
    margin-bottom: 20px;
  }
</style>
