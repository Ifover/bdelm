<template>
  <div id="fenlei">
    <div class="swipe-wrapper">
      <mt-swipe :auto="0" ref="swipeWrapper">
        <mt-swipe-item class="swip-item-1 item">
          <template v-for="(v,k) in Tuijian">
            <a role="button" v-if="k<10">
              <div class="container">
                <img
                  :src="setPic(v.image_hash)">
              </div>
              <span class="title">{{v.name}}</span>
            </a>
          </template>
        </mt-swipe-item>
        <mt-swipe-item class="swip-item-2 item">
          <template v-for="(v,k) in Tuijian">
            <a role="button" v-if="k>=10">
              <div class="container">
                <img
                  :src="setPic(v.image_hash)">
              </div>
              <span class="title">{{v.name}}</span>
            </a>
          </template>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!--<ul>-->
    <!--<template v-for="(v,k) in Tuijian">-->
    <!--<li>-->
    <!--{{v.name}}-->
    <!--</li>-->
    <!--</template>-->
    <!--</ul>-->
    <hr>
  </div>

</template>

<script>
  import {Swipe, SwipeItem} from 'mint-ui';
  import {setStorage, getStorage, removeStorage} from '@/config/Utils.js'
  import {computePic} from '@/config/Tools'

  export default {
    name: "FenLei",
    data() {
      return {
        Tuijian: []
      }
    },

    methods: {
      getjs(str) {
        let item = eval('(' + str + ')');
        console.log(item);
        return item;
      },
      setPic(img) {
        return computePic(img)
      },
      getFenlei() {
        let tempStreet = this.$store.state.myCity;
        //console.log('wtf');
        this.$store.state.obj = {
          url: '/restapi/shopping/openapi/entries',
          params: {
            latitude: tempStreet.latitude,
            longitude: tempStreet.longitude,
            templates: ['main_template',]
            // 'templates[]':  'favourable_template'

          }
        }
        this.$store.dispatch('getAjax').then(response => {
          //console.log("FenLei:\r\n");
          //console.log(response.data);
          this.Tuijian = response.data[0].entries;
        });
      }
    },
    mounted() {
      let _this = this;
      // console.log(this.$store.state.myCity);
      // this.$store.state.myCity = getStorage('myCity')
      // console.log(this.$store.state.myCity);
      if (!this.$store.state.myCity) {
        // console.log('---未设置城市信息---');
        getMyCity:{ //获取所在城市,设置仓库我的城市信息
          this.$store.state.obj = {
            url: '/restapi/shopping/v1/cities/guess',
          }
          this.$store.dispatch('getAjax').then(response => {
            this.$store.state.myCity = response.data;
            // console.log("Done");
            // console.log(this.$store.state.myCity);
            //setStorage('myCity', this.$store.state.myCity);
            // console.log('---城市信息已设置---');
            this.getFenlei();
          });
        }
      }
    }
  }
</script>

<style scoped>
  #fenlei {
    margin-top: 40px;
    width: 100%;
  }

  a {
    position: relative;
    float: left;
    width: 20%;
    outline: 0;
    color: inherit;
    text-decoration: none;
  }

  .container {
    position: relative;
    padding-left: 5px;
    width: 60px;
    height: 60px;

  }

  .container img {
    width: 100%;
    height: 100%;
  }

  .title {
    display: block;
    margin-top: 10px;
    color: #666;
    font-size: .32rem;
  }

  .swipe-wrapper {
    width: 100%;
    height: 200px;
  }

  /*.swip-item-1, .swip-item-2 {*/
  /*background: red;*/
  /*}*/

  /*.item {*/
  /*text-align: center;*/
  /*font-size: 40px;*/
  /*color: white;*/
  /*}*/

  /*.button-wrapper {*/
  /*display: flex;*/
  /*height: 100px;*/
  /*}*/

  .flex-item {
    flex: 1;
    display: inline-block;
    text-align: center;
    height: 100%;
    line-height: 100%;
    font-size: 40px;
  }

  .prev-button {
    background: darkorange;
  }

  .next-button {
    background: green;
  }

</style>
