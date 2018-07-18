<template>
  <div id="home">
    <!--<h1>当前定位城市:</h1>-->
    <mt-header fixed :title="title.short_address">
      <!--<mt-header fixed  v-else title="strer.short_address▽">-->
      <router-link to="/" slot="left">
        <mt-button @click="searchShop">搜索</mt-button>
      </router-link>
      <mt-button icon="more" slot="right" @click="clear"></mt-button>
    </mt-header>

    <!--<div id="header">-->
    <!--&lt;!&ndash;<a href="/"><span>HOME</span></a>&ndash;&gt;-->

    <!--</div>-->
    <!--<div class="sd">-->
    <!--<mt-field placeholder="搜索饿了么商家、商品名称" type="text" v-model="shopName"></mt-field>-->
    <!--</div>-->

    <!--<input type="text" v-model="address">-->
    <!--<button @click="searchShop()">搜索</button>-->

  </div>
</template>

<script>

  import {setStorage, getStorage, removeStorage} from '@/config/Utils.js'
  import {MessageBox} from 'mint-ui';
  //import {Tabbar, TabItem} from 'mint-ui';

  export default {
    name: "home",
    data() {
      return {
        shopName: "",
        strer: [],
        title: []
      }
    },
    methods: {
      searchShop() {
        MessageBox.prompt('搜索饿了么商家、商品名称').then(({value, action}) => {
          //应该设置点什么
        }, () => {

        });
      },
      getjs(str) {
        let item = eval('(' + str + ')');
        //console.log(item);
        return item;
      },
      clear() {
        removeStorage('myStreet');
        removeStorage('myCity');
        console.log("删除成功");
      },
      setStreet() { //点击地址后跳转到地址设置页面
        $router.push({path: '#/souhuo'})
      }
    },
    mounted() {
      // 绑定click事件到mint-ui自动生成的头部标题上

      let h1 = document.getElementsByClassName('mint-header-title');
      let _this = this //下面如果要是用this就会变成内部的this,所以先把this复制给_this以便下面是用
      if (h1) {
        h1[0].addEventListener("click", function () {
          console.log(1);
          _this.$router.push({path: '/setStreet'});
        })
        //
      }

      //-------------------------------------
      let myStreet = getStorage('myStreet')
      //console.log(myStreet);
      if (!myStreet) {
        //this.$store.state.myStreet = myStreet;
        //console.log(12);
        this.title = {short_address: "未选择地址"}; //short_address . == "未选择地址"
      } else {
        this.$store.state.myStreet = myStreet;
        this.title = myStreet;
        //console.log(this.title);
      }
    },
    created() {
      // window.addEventListener('scroll', this.handleScroll, true);
    },
  }
</script>

<style scoped>


  .mint-field {
    width: 90%;
    line-height: 20px;
    left: 20px;
  }
</style>
