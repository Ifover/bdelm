<template>
  <div id="setStreet">
    <mt-header fixed title="选择收货地址">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div id="hhh" v-if="this.isShow">
      <div class="stt">
        <div class="title">
          <a href="#/cityset">
            <span v-if="this.setCity.name.length>3">{{this.setCity.name.substring(0,3)}}.. ▾</span>
            <span v-else>{{this.setCity.name}} ▾</span>
          </a>
        </div>
        <div class="inputt">
          <div class="city-1d">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="city-1r">
              <path fill-opacity=".38"
                    d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path>
            </svg>
          </div>
          <input type="text" v-model="address" placeholder="请输入地址">
        </div>
      </div>
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
        isShow: false,
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
      this.isShow = true;
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

  .city-1d {
    position: absolute;
    left: 70px;
    top: 17px;

    .city-1r {
      width: 3.733333vw;
      height: 3.733333vw;

    }
  }

  .stt {
    position relative
    display flex
    width 100%
    height 40px
    .title {
      margin-top 5px
      padding 5px 0 0 10px
      height 24px
      width 15%
      font-size: 12px
      a {
        display: flex;
        margin-top: 7px;
        text-decoration none
        color: #000
      }
    }
    .inputt {
      //padding-left 10px
      margin 5px 0 5px 0
      padding-left: 10px;
      height: 40px;
      background: #f2f2f2;
      width 75%
      font-size: .346667rem;
      input {
        margin: 9px 0 0 10px
        //padding-right: 5px;
        display: inline-block;
        text-align: start;
        //margin: 0em;
        border 0
        line-height 20px
        outline: none
        width: 90%;
        color: #999;
        background: #f2f2f2;
        border-radius: .266667vw;
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
