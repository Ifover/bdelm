<template>
  <div id="app">
    <!--<router-link to="/">Home</router-link>-->
    <router-view/>
    <router-view name="fenlei"></router-view>
    <router-view name="tuijian"></router-view>
    <mt-tabbar fixed class="sdsd">
      <mt-tab-item id="外卖">
        <img slot="icon">
        外卖
      </mt-tab-item>
      <mt-tab-item id="搜索">
        <img slot="icon">
        搜索
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon">
        订单
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon">
        我的
      </mt-tab-item>
    </mt-tabbar>
    <div class="bottoner"></div>
  </div>
</template>

<script>
  import {setStorage, getStorage, removeStorage} from '@/config/Utils.js'
  import {Toast} from 'mint-ui';
  export default {
    name: 'app',
    mounted() {
      /*
      * 我觉得最好还是在这个页面初始化所有的仓库变量好了
      *
      * */
      //this.getStreet();
      //console.log(this.$store.state.myCity);

      if (!this.$store.state.myStreet && !getStorage('myStreet') && this.$route.path != '/setStreet') {
        //console.log('---未设置街道信息---');
        let instance = Toast('未选择地址，2秒钟后跳转');

        let _this = this
        setTimeout(function () {
          instance.close();
          _this.$router.push({path: '/setStreet'})
        }, 2000);
        //console.log('---未设置myStreet-WebStorage---');
      }


      // if (!getStorage('name')) {
      //   let instance = Toast('未选择地址，2秒钟后跳转');
      //   setTimeout(function () {
      //     instance.close();
      //     _this.$router.push({path: '/setStreet'})
      //   }, 2000);
      //
      // } else {
      //   //console.log(this.strer);
      //   this.title = this.getjs(getStorage('name'))
      //   //console.log(this.strer);
      // }
      //上面这块的意思就是先判断仓库中myStreet中是否是未设置地址,
      //如果未设置则跳转到设置页面.并且是在最后的这个xxx毫秒之后跳转
      //console.log(this.$store.state.myCity);

    }
  }
</script>

<style>
  /*lang="stylus"*/
  .bottoner {
    position :relative;

    padding-bottom: 55px;
  }
  /*
    .sd {
      position: fixed;
      top: 30px;
      left: 0px;
      width: 100%;
      text-align: center;
      background-color: darkgrey;
    }

    #header {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 30px;
      background-color: darkgrey;
      a {
        float: left;
        margin-top: 5px;
        margin-left: 3px;
        //border: black solid 1px;
        //mso-font-width: 30px;
        //height: 30px;
      }
      input {
        float: left;
        margin-top: 5px;
      }
    }
  */
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

  }
</style>
