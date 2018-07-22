<template>
  <div id="setStreet">
    <mt-header fixed title="选择收货地址">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div id="hhh" v-if="this.setCity">
      <div class="stt">
        <div class="title">
          <a href="#/cityset">
            <span>{{this.setCity.name}}▾</span>
          </a>
        </div>
        <div class="inputt">
          <input type="text" v-model="address" placeholder="🔍 请输入地址">
        </div>
      </div>
      <!--<button @click="getStreet()">搜索</button>-->
      <!--<ul>-->
      <!--<template v-for="(v,k) in  addressList" v-if="addressList.length!=0 && v.city_id==myCity.id">-->
      <!--<li>-->
      <!--&lt;!&ndash;&ndash;&gt;-->
      <!--<a class="link" @click="setStreet(k)">-->
      <!--<p style="font-size: 10px">{{v.short_address}}</p>-->
      <!--<p style="font-size: 10px;color: darkgrey" v-if="v.address.length>20">{{v.address.substring(0,20)}}...-->
      <!--附近有{{v.count}}家商家 </p>-->
      <!--<p style="font-size: 10px;color: darkgrey" v-else>{{v.address}} 附近有{{v.count}}家商家 </p>-->
      <!--</a>-->
      <!--</li>-->
      <!--</template>-->
      <!--</ul>-->
      <div class="ccc">
        <div v-for="(v,k) in  addressList" v-if="addressList.length!=0 && v.city_id==setCity.id" @click="setStreet(k)">
          <mt-cell
            :title="v.name"
            :label="v.address"
            is-link
            :value="v.distance">
          </mt-cell>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {setStorage, getStorage} from '@/config/Utils.js'
  import {mapGetters} from 'vuex'

  export default {
    name: "setStreet",
    data() {
      return {
        address: "",
        addressList: [],
        setCity: []
      }
    },
    watch: {
      address: _.debounce(
        function () {
          if (this.address && this.address.indexOf(" ") < 0) {
            let city = this.setCity;
            //console.log(city);
            let obj = {
              url: '/restapi/bgs/poi/search_poi_nearby_alipay',
              params: {
                keyword: this.address,
                offset: 0,
                limit: 20,
                latitude: city.latitude,
                longitude: city.longitude
              }
            }
            this.$store.dispatch('getAjax', obj).then(response => {
              //console.log(response);
              this.addressList = response.data;
            })
          } else {
            this.addressList = [];
          }
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
        setStorage('myStreet', this.addressList[k]);
        this.$router.push({path: '/'});
      }
    },
    mounted() {
      this.$store.state.isShow = 'none'; //让导航栏隐藏因为属于次级页面还是隐藏比较好看
      //setStorage('ipCity',this.$store.state.myCity);

      let ipCity = getStorage('ipCity'); //获取localstorage中存储的ip城市信息
      let setCity = getStorage('setCity'); //获取localstorage中存储的自定城市信息
      /**
       *  首先查看localstorage里面的myCity
       *  为空则使用ipCity 并且打印ipCity
       *  否则直接显示myCity的城市信息
       *  因为一个是用户自己规定的城市一个是系统推荐的城市(貌似百度的这个api,GG了?)
       */
      this.setCity = setCity ? setCity : ipCity;
      //console.log(this.setCity);
    }
  }
</script>

<style scoped lang="stylus">
  #setStreet {
    padding-top 41px
    //text-align center
  }

  #hhh {
    //padding 0 20px 0 20px
  }

  .stt {
    position relative
    display flex

    width 100%
    height 40px
    .title {
      padding-top: 8px;
      padding-left 10px
      height 24px
      width 15%
      //font-size: .346667rem;
      a {
        text-align center
        text-decoration none
        color: #000
      }
    }
    .inputt {
      //padding-left 10px
      padding-top: 5px;
      width 75%
      font-size: .346667rem;
      input {
        width 100%
        line-height 24px
        //▴
      }
    }
  }

  h1 {
    font-size: 66px !important
  }

  .mint-cell-text {
    font-weight 600 !important
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
