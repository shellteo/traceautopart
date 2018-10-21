<template>
  <div class="hello">
    <div style="margin-bottom: 40px;">
      <el-steps :active="1">
        <el-step title="汽车厂" icon="el-icon-edit"></el-step>
        <el-step title="物流跟踪" icon="el-icon-upload"></el-step>
        <el-step title="汽车维修商" icon="el-icon-upload"></el-step>
        <el-step title="销售平台" icon="el-icon-upload"></el-step>
        <el-step title="线下门店" icon="el-icon-upload"></el-step>
      </el-steps>
    </div>
    <el-form :rules="rules" :model="form" label-width="120px">
      <el-form-item label="商品ID" prop="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="商品名字" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="原厂配件签名" prop="original">
        <el-switch v-model="form.original"></el-switch>
      </el-form-item>
      <el-form-item label="汽车配件描述" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="entryInfo">立即录入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import nem from 'nem-sdk';

export default {
  name: 'EntryInfo',
  data () {
    return {
      message: '点击生成nem的private key',
      rules: {
        id: { required: true, message: '请输入配件ID', trigger: 'blur' },
        name: { required: true, message: '请输入配件名称', trigger: 'blur' },
        original: { required: true, message: '请输入配件名称', trigger: 'blur' }
      },
      form: {
        id: '',
        name: '',
        original: true,
        desc: ''
      },
      productKey: 'TACY7PKC5OFDYUSNIALG6TFNTTAOFMAYRMA3CSAD'
    }
  },
  methods: {
    genPrivateKey() {
      axios.get('http://localhost:3000/genkey?userName=zx').then((response) => {
        console.log(response);
        this.message = response.data.message;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    entryInfo() {
      if (this.form.id === '') {
        this.$message('请输入配件ID');
        return;
      }
      if (this.form.name === '') {
        this.$message('请输入配件名称');
        return;
      }
      this.$confirm('确定录入吗？录入到区块链之后，就不可修改了。', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let message = {
          step: '汽车厂', // 当前步骤
          ...this.form
        };
        axios.post('http://localhost:3000/entryInfo', {
          message: JSON.stringify(message)
        }).then((response) => {
          console.log(response);
          this.$message({
            type: 'success',
            message: '录入成功!'
          });
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: 'error',
            message: '录入失败!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消录入'
        });
      });
    },
    isJSON(str) {
      try {
        if (typeof JSON.parse(str) === "object") {
          return true;
        }
      } catch(e) {
      }
      return false;
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
