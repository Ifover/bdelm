<template>
  <div id="home">
    <div v-if="isShow">
      <div id="header">
        <mt-header>
          <router-link to='/setStreet' slot="left">
            <mt-button style="font-size: 17px">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 31" class="index-okfdP">
                <path fill="#FFF" fill-rule="evenodd"
                      d="M22.116 22.601c-2.329 2.804-7.669 7.827-7.669 7.827-.799.762-2.094.763-2.897-.008 0 0-5.26-4.97-7.643-7.796C1.524 19.8 0 16.89 0 13.194 0 5.908 5.82 0 13 0s13 5.907 13 13.195c0 3.682-1.554 6.602-3.884 9.406zM18 13a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"></path>
              </svg>
              <span class="index-2uW">{{this.title.name}}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8" class="index-2iXz3">
                <path fill="#FFF" fill-rule="evenodd"
                      d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"></path>
              </svg>
            </mt-button>
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
  import Restaurants from '@/page/Restaurants/Restaurants'

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
      this.$store.state.isShow = ''; //让导航栏显示

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
        if (this.title.name.length > 6) {
          this.title.name = this.title.name.substring(0, 7) + "...";
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

  .index-2uW {
    margin: 0 2px
    font-size: 18px;
    font-weight bold
    //max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .index-okfdP {
    //top 2px
    width: 13px;
    height: 15px;
    fill: #fff;
  }

  .index-2iXz3 {
    width: 7px;
    height: 9px;
    fill: #fff;
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
