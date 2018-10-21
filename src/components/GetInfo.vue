<template>
  <div class="hello">
    <el-form :inline="true">
      <el-form-item label="配件address">
        <el-input style="width: 450px;" v-model="productKey" placeholder="请输入配件address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getInfo">查询配件信息</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="step" label="录入步骤"></el-table-column>
      <el-table-column prop="id" label="配件id"></el-table-column>
      <el-table-column prop="name" label="配件名称"></el-table-column>
      <el-table-column prop="original" label="是否原厂配件">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.original" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="其他描述"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import nem from 'nem-sdk';

export default {
  name: 'GetInfo',
  data () {
    return {
      message: '点击生成nem的private key',
      form: {
        id: '',
        name: '',
        original: true,
        desc: ''
      },
      tableData: [],
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
    getInfo() {
      axios.get(`http://localhost:3000/getInfo?key=${this.productKey}`).then((response) => {
        console.log(response);
        let list = []
        response.data.data.forEach((item) => {
          let msg = item.transaction.message;
          console.log(msg);
          let fmg = nem.utils.format.hexMessage(msg);
          if (this.isJSON(fmg)) {
            console.log(JSON.parse(fmg));
            let parseMsg = JSON.parse(fmg);
            if (parseMsg.name) {
              list.push(parseMsg)
            }
          } else {
            console.log(fmg);
          }
          this.tableData = list;
        })
      }).catch((error) => {
        console.log(error);
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
  .searchInfo {
    display: flex;
  }
</style>
