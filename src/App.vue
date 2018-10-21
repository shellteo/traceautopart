<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-header style="background: #545c64;color: #fff;" class="headbox">
        <div class="title">汽车零配件溯源系统</div>
        <div class="userbox">一级供应商</div>
      </el-header>
      <el-container>
        <el-aside width="150px" style="background: #545c64;color: #fff;">
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            @select="select"
            active-text-color="#ffd04b">
            <el-menu-item index="entryInfo">
              <i class="el-icon-menu"></i>
              <span slot="title">录入信息</span>
            </el-menu-item>
            <el-menu-item index="getInfo">
              <i class="el-icon-setting"></i>
              <span slot="title">查看信息</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      defaultActive: 'entryInfo'
    }
  },
  methods: {
    select(i) {
      this.$router.push({ path: i })
    }
  },
  mounted() {
    this.defaultActive = this.$route.name;
  }
}
</script>

<style>
  html,body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  #app {
    height: 100%;
  }
  .headbox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>
