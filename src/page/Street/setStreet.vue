<template>
  <div id="setStreet">
    <mt-header fixed title="选择收货地址">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div id="hhh">
      <a href="#/setCity">
        <span>{{this.myCity.name}}▽</span>
      </a>
      <input type="text" v-model="address" placeholder="请输入地址">
      <!--<button @click="getStreet()">搜索</button>-->
      <ul>
        <template v-for="(v,k) in  addressList" v-if="addressList.length!=0 && v.city_id==myCity.id">
          <li>
            <!---->
            <a class="link" @click="setStreet(k)">
              <p style="font-size: 10px">{{v.short_address}}</p>
              <p style="font-size: 10px;color: darkgrey" v-if="v.address.length>20">{{v.address.substring(0,20)}}...
                附近有{{v.count}}家商家 </p>
              <p style="font-size: 10px;color: darkgrey" v-else>{{v.address}} 附近有{{v.count}}家商家 </p>
            </a>
          </li>
        </template>
      </ul>
    </div>

  </div>
</template>

<script>
  import _ from 'lodash'
  import {setStorage, getStorage, removeStorage} from '@/config/Utils.js'

  export default {
    name: "setStreet",
    data() {
      return {
        address: "",
        addressList: [],
        myCity: []
      }
    },
    watch: {
      address: _.debounce(
        function () {
          this.myCity = this.$store.state.myCity;
          //console.log(this.myCity);
          this.$store.state.obj = {
            url: '/restapi/v2/pois',
            params: {
              extras: ['count'],
              keyword: this.address,
              limit: 20,
              type: 'nearby'
            }
          }
          this.$store.dispatch('getAjax').then(response => {
            //console.log(response);
            this.addressList = response.data;
          })
        }, 300  //这里就是延迟的时间 (毫秒)
      )
      /*
      *  以上watch中address就是监听输入框内容的变化
      *  并且再延迟xxx毫秒之后再进行function里面的操作
      *  function(){
      *  首先获取stroe.myCity并赋值给当前主键的变量
      *  然后给store里的事件传参数
      *  最后在1000毫秒后异步提交
      *  }
      *
      * */

    },
    methods: {

      setStreet(k) {
        //console.log(this.addressList[k]);
        //setStorage('myStreet', this.addressList[k]);
        //console.log(getStorage('name'));
        this.$store.state.myStreet = this.addressList[k];
        console.log('---街道信息已设置---');
        setStorage('myStreet', this.addressList[k]);
        console.log('---myStreet-WebStorage-已设置---');
        this.$router.push({path: '/'});
        //:href="'#/restaurants/'+v.geohash+'&'+v.latitude+'&'+v.longitude"
      }
    },
    mounted() {
      let x = this.$store.state.myCity
      //console.log(x);
      this.myCity = x;
    }
  }
</script>

<style scoped lang="stylus">
  h1 {
    font-size: 66px !important
  }

  ul {
    padding-left: 0px;

  }

  li {
    list-style: none;
  }

  .link {
    text-align: left;
  }
</style>
