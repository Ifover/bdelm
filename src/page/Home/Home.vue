<template>
  <div id="home">
    <div v-if="isShow">
      <div id="header">
        <mt-header>
          <router-link to='/setStreet' slot="left">
            <mt-button style="font-size: 17px">📍 {{this.title.name}}▾</mt-button>
          </router-link>
          <!--<mt-button icon="more" slot="right" @click="clear"></mt-button>-->
        </mt-header>
        <div id="iput" v-bind:class="{isFixed:isActive}">
          <a id="content" @click="searchShop">
            <span>🔍搜索饿了么商家、商品名称</span>
          </a>
        </div>
      </div>
      <router-view/>
      <fen-lei :class="{cacsd:isActive}"></fen-lei>
      <restaurants></restaurants>
    </div>
    <div id="nostreet" v-else>
      <h1>跳转中~</h1>
    </div>
  </div>
</template>

<script>
  import {setStorage, getStorage, removeStorage} from '@/config/Utils.js'
  import {MessageBox} from 'mint-ui';
  //import {Tabbar, TabItem} from 'mint-ui';
  import FenLei from '@/page/Other/FenLei'
  import Restaurants from '@/page/Other/Restaurants'

  export default {
    name: "home",
    components: {
      FenLei, Restaurants
    },
    data() {
      return {
        shopName: "", //还没用到
        isShow: false, //判断是否有收获地址了没有就不显示这些东西
        title: [],
        isActive: false //判断是否可以激活搜索框置顶
      }
    },
    methods: {
      searchShop() {
        MessageBox('提示', '对，还没有这个功能！');
      },
      setStreet() { //点击地址后跳转到地址设置页面
        $router.push({path: '#/souhuo'})
      },
      handleScroll() {
        /**
         * 首先获取距离顶部的位置(这个高度是显示收货地址状态条的高度)
         * 如果大于40 则将搜索div的样式设置为特定的(让他置顶且置于最前)
         * 并且还要修改分类的上边距 以免变得太快让人觉得难受
         *
         */
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //console.log(scrollTop);
        this.isActive = scrollTop >= 40 ? true : false;
      }
    },
    mounted() {
      let myStreet = getStorage('myStreet');
      if (!myStreet) {
        /**
         *  判断是否设置好收货地址
         *  如果没有则获取IP所在城市
         *  然后跳转到地址设置页面 ↓
         */
        this.isShow = false;
        //获取ip所在城市信息
        let obj = {
          url: '/restapi/shopping/v1/cities/guess',
        }
        this.$store.dispatch('getAjax', obj).then(function (val) {
          setStorage('ipCity', val.data);
        }).then((what) => {
            this.$router.push({path: '/setStreet'});
          }
        );
      } else {
        /**
         *  如果获取到了收获地址
         *  就直接渲染内容
         */
        this.title = myStreet;
        if ( this.title.name.length > 6) {
          this.title.name =  this.title.name.substring(0, 6) + "...";
        }

        this.isShow = true;
      }
      //给窗体添加一个滚动的事件句柄 事件具体在上方说明
      window.addEventListener('scroll', this.handleScroll)

    }
  }
</script>

<style scoped lang="stylus">
  .isFixed {
    position fixed !important
    top 0 !important
    margin-bottom 10px
    z-index 999
  }

  #nostreet {
    text-align center
  }

  #iput {
    position relative
    padding 10px 0 10px
    //padding: .2rem .373333rem;
    width: 100%;
    text-align center
    background-color: #26a2ff;
    #content {
      display flex
      width 90%
      height: 40px;
      margin-left: 20px;
      color: #999;
      background: #fff;
      //vertical-align: middle;
      //text-align: center;
      justify-content: center;
      align-items: center;
      font-size 14px
      span {
        font-family: simsun;
      }
    }
  }

  .cacsd {
    padding-top 60px
  }

  .mint-field {
    width: 90%;
    line-height: 20px;
    left: 20px;
  }
</style>
