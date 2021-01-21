<!--目录组-->
<template>
  <el-dialog width="40%" class="demo-dialog" @opened="handleOpen"
             :before-close="handleClose" title="目录组" :visible.sync="dialogGroupVisible">
    <el-form :rules="rules" ref="ruleForm" :model="form">
      <el-form-item label="期号" prop="issureNumber" :label-width="formLabelWidth">
        <el-input v-model="form.issureNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="报送日期" prop="submissionDate" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.submissionDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="词云" prop="wordCloud" :label-width="formLabelWidth">
        <el-input v-model="form.wordCloud" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上传人" prop="uploadUser" :label-width="formLabelWidth">
        <el-input v-model="form.uploadUser" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="file" :label-width="formLabelWidth">
        <el-upload
          class="upload-demo"
          :auto-upload="false"
          :action="'xxx'"
          multiple
          :limit="1"
          :on-change="onChange"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import {rest_s} from "../../http";

  export default {
    name: "create",
    props: ['dialogGroupVisible', "editId"],
    data() {
      return {
        form: {
          issureNumber: "",
          title: "",
          submissionDate: "",
          wordCloud: "",
          uploadUser: "",
          file: "",
        },
        fileList: [],
        rules: {
          issureNumber: [
            {required: true, message: '请输入期号', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
          submissionDate: [
            {required: true, message: '请输入日期', trigger: 'change'},
          ],
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      onChange(file) {
        console.log(file);
        this.form.file = file.raw;
      },
      async handleOpen() {
        if (this.editId) {
          const resp = await this.$axios.post(`${rest_s}/special/query/reportById?id=${this.editId}`, {});
          if (resp.errcode == '0') {
            Object.keys(this.form).forEach(e => {
              this.form[e] = resp.data[e];
            })
            this.form.file = resp.data.fileAddress;
            this.fileList = [{
              name: resp.data.fileName
            }]
          }
        }
      },
      //提交
      submitForm(formName) {
        if (!this.form.file) {
          this.$message.warning('请上传文件')
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editId) {
              this.updateItem();
            } else {
              this.addItem();
            }
          }
        });
      },
      //新增
      async addItem() {
        const resp = await this.$axios.post(`${rest_s}/special/insert/report`, this.$utils.JsonToFormData(this.form));
        if (resp.errcode === '0') {
          this.$message.success("新增成功");
          this.handleClose();
        }
      },
      //更新
      async updateItem() {
        const data = Object.assign(this.form, {id: this.editId});
        const resp = await this.$axios.post(`${rest_s}/special/update/report`, this.$utils.JsonToFormData(data));
        if (resp.errcode === '0') {
          this.$message.success("更新成功");
          this.handleClose();
        }
      },
      //关闭弹窗
      handleClose() {
        Object.keys(this.form).forEach(e => {
          this.form[e] = "";
        })
        this.fileList = [];
        this.$emit('close-dialog')
      }
    }
  }
</script>

<style scoped>
</style>
