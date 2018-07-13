<template>
  <div id="home">
    <!--<h1>当前定位城市:</h1>-->
    <mt-header fixed></mt-header>
    <div class="xxx">
      <a href="#/shouhuo"><span>{{this.$store.state.myStreet.short_address}}▽</span></a>
    </div>
    <!--<div id="header">-->
    <!--&lt;!&ndash;<a href="/"><span>HOME</span></a>&ndash;&gt;-->

    <!--</div>-->
    <div class="sd">
      <mt-field placeholder="搜索饿了么商家、商品名称" type="text" v-model="shopName"></mt-field>
    </div>
    <br>
    <br>
    <br>
    <!--<input type="text" v-model="address">-->
    <br>
    <br>
    <br>
    <!--<button @click="jumpGetStreet(address)">搜索</button>-->

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    name: "home",
    data() {
      return {
        shopName: "",
      }
    },
    methods: {
      handleTouchMove(e) {
        console.log(1);
      }
    },
    mounted() {
      // let _this = this //下面如果要是用this就会变成内部的this,所以先把this复制给_this以便下面是用
      // let instance =Toast('未选择地址，2秒钟后跳转');
      // setTimeout(function () {
      //   instance.close();
      //   if (_this.$store.state.myStreet.short_address == "未选择地址") {
      //     _this.$router.push({path: '/shouhuo'})
      //   }
      // }, 2000);

      //上面这块的意思就是先判断仓库中myStreet中是否是未设置地址,
      //如果未设置则跳转到设置页面.并且是在最后的这个xxx毫秒之后跳转
    },
    created() {
      window.addEventListener('scroll', this.handleScroll, true);
    },
  }
</script>

<style scoped>
  .xxx {
    position: fixed;
    z-index: 999;
    top: 0px;
    left: 0px;
  }

  .sd {
    position: fixed;
    z-index: 999;
    top: 30px;
    left: 0px;
    background-color: #26a2ff;
  }

  .mint-field {
    width: 90%;
    line-height: 20px;
    left: 20px;
  }
</style>
