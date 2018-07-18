<template>
  <div id="restaurants">
    <h1 v-if="!isOk">--未设置地址--</h1>
    <!--<ul v-else>-->
    <!--<li v-for="v in restaurantsList">-->
    <!--<img :src="computePic(v.image_path)">-->
    <!--{{v.name}}-->
    <!--<p>{{v.rating}} 月售:{{v.recent_order_num}}</p>-->
    <!--<p>起送 ¥{{v.float_minimum_order_amount}}| 配送 ¥{{v.float_delivery_fee}}</p>-->
    <!--<p>{{v.flavors[0].name}}</p>-->
    <!--<p v-if="v.activities[1]">满减 {{v.activities[1].tips}}</p>-->
    <!--</li>-->
    <!--</ul>-->
    <div
      v-else
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="8">
      <div class="index-container" v-for="v in restaurantsList" v-if="restaurantsList.length>0">
        <div class="index-shopInfo">
          <div class="logo-main">
            <img :src="setPic(v.image_path)">
          </div>
          <div class="index-main">
            <div class="index-line">
              <h3 class="index-shopname">
                <span>{{v.name}}</span>
              </h3>
            </div>
            <div class="index-line">
              {{v.rating}} 月售{{v.recent_order_num}}单
            </div>
            <div class="index-line">
              起送 ¥{{v.float_minimum_order_amount}} | 配送 ¥{{v.float_delivery_fee}}
            </div>
          </div>
          <span>
        </span>
        </div>
        <div class="index-activety">
          <div class="index-activityList" v-if="v.activities[1]">
            满减 {{v.activities[1].tips.length>20?v.activities[1].tips.substring(0,20):v.activities[1].tips}}
          </div>
          <div class="index-activityBtn">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {setStorage, getStorage, removeStorage} from '@/config/Utils.js'
  import {computePic} from '@/config/Tools'

  export default {
    name: "restaurants",
    data() {
      return {
        isOk: false,
        restaurantsList: []
      }
    },
    methods: {
      setPic(img) {
        return computePic(img)
      },
      getjs(str) {
        let item = eval('(' + str + ')');
        //console.log(item);
        return item;
      },
      show() {
        //console.log(this.$route.params);
      },
      loadMore() {
        //console.log(1);
        this.loading = true;
        let tempStreet = getStorage('myStreet');
        //console.log(tempStreet);
        // this.$store.state.obj = {
        //   url: '/restapi/shopping/restaurants',
        //   params: {
        //     extras: ['activities'],
        //     geohash: tempStreet.geohash,
        //     latitude: tempStreet.latitude,
        //     offset: this.restaurantsList.length,
        //     limit: 8,
        //     longitude: tempStreet.longitude,
        //     terminal: 'web'
        //   }
        // }
        this.$store.state.obj = {
          url: '/restapi/shopping/v3/restaurants',
          params: {
            latitude: tempStreet.latitude,
            longitude: tempStreet.longitude,
            offset: this.restaurantsList.length,
            limit: 8,
            extras: ['activities'],
            //geohash: tempStreet.geohash,
            extra_filters: 'home',
            rank_id: '190a4531e5d54b809b029549af66a7d1',
            terminal: 'h5'
            //terminal: 'web'
          }
        }
        this.$store.dispatch('getAjax').then(response => {
          console.log(response.data.items);
          response.data.items.forEach(e => {
            this.restaurantsList.push(e.restaurant)
          })
          //this.restaurantsList.push(response.data);
          //console.log(response);
        });
        this.loading = false;
      },
      getRestaurants() {
        //console.log(this.$store.state.myStreet);
        let tempStreet = getStorage('myStreet');
        //console.log(tempStreet);
        //console.log('tempStreet:' + tempStreet);
        this.$store.state.obj = {
          url: '/restapi/shopping/restaurants',
          params: {
            extras: ['activities'],
            geohash: tempStreet.geohash,
            latitude: tempStreet.latitude,
            offset: 0,
            limit: 8,
            longitude: tempStreet.longitude,
            terminal: 'web'
          }
        }
        this.$store.dispatch('getAjax').then(response => {
          //console.log(response);
          this.restaurantsList = response.data;
        });
      }

    },
    mounted() {
      this.$store.state.myStreet = getStorage('myStreet');
      let tempStreet = this.$store.state.myStreet
      if (tempStreet) {
        //this.getRestaurants();
        this.isOk = true;
      }

    }
  }
</script>

<style scoped lang="stylus">


  .index-container {
    position: relative;
    border-bottom: .013333rem solid #eee;
    border-bottom: .133333vw solid #eee;
    background-color: #fff;
    color: #666;
    padding: .4rem 0;
    padding: 4vw 0;
    list-style: none;
    font-size: .293333rem;
    line-height: normal;
    font-family: Microsoft Yahei;

    .logo-main {
      position: absolute;
      width: 60px;
      height: 60px;
      img {
        width 100%
        height: 100%
      }
    }
    .index-main {
      padding-left: 2.666667vw;
      position: relative
      padding-left 60px

      .index-line {
        top: 0px
        text-align: left;
        .index-shopname {
          text-align center
          display: flex;
          margin: 5px;
          color: #333;
          font-weight: 700;
          font-size: .4rem;
          overflow: hidden;

          span {
            font-weight: 700;
          }
        }

      }
    }
  }


</style>
