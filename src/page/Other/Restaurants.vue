<template>
  <div id="restaurants">
    <h1 v-if="restaurantsList.length==0">没有</h1>
    <!--<ul v-else v-for="v in restaurantsList">-->
    <!--<li>-->
    <!--<img :src="computePic(v.image_path)">-->
    <!--{{v.name}}-->
    <!--<p>{{v.rating}} 月售:{{v.recent_order_num}}</p>-->
    <!--<p>起送 ¥{{v.float_minimum_order_amount}}| 配送 ¥{{v.float_delivery_fee}}</p>-->
    <!--<p>{{v.flavors[0].name}}</p>-->
    <!--<p v-if="v.activities[1]">满减 {{v.activities[1].tips}}</p>-->
    <!--</li>-->
    <!--</ul>-->
    <ul
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      v-else>
      <li v-for="v in restaurantsList">
        <img :src="computePic(v.image_path)">
        {{v.name}}
        <p>{{v.rating}} 月售:{{v.recent_order_num}}</p>
        <p>起送 ¥{{v.float_minimum_order_amount}}| 配送 ¥{{v.float_delivery_fee}}</p>
        <p>{{v.flavors[0].name}}</p>
        <p v-if="v.activities[1]">满减 {{v.activities[1].tips}}</p>
      </li>
    </ul>
  </div>
</template>

<script>


  export default {
    name: "restaurants",
    data() {
      return {
        restaurantsList: []
      }
    },
    methods: {
      show() {
        //console.log(this.$route.params);
      },
      computePic(content) {
        //计算店铺的真实图标地址
        let link1 = 'https://fuss10.elemecdn.com/';
        let link0 = '?imageMogr2/thumbnail/70x70';
        let page1 = content.substring(0, 1);
        let page2 = content.substring(1, 3);
        let page3 = content.substring(3, 32);
        let realPic = link1 + page1 + '/' + page2 + '/' + page3;
        realPic += content.length > 35 ? 'jpeg.jpeg' : 'png.png';
        realPic += link0
        //console.log(realPic);
        return realPic
      },
      getRestaurants() {
        console.log(this.$store.state.myStreet);
        this.$store.state.obj = {
          url: '/restapi/shopping/restaurants',
          params: {
            'extras[]': 'activities',
            geohash: this.$store.state.myStreet.geohash,
            latitude: this.$store.state.myStreet.latitude,
            limit: 30,
            longitude: this.$store.state.myStreet.longitude,
            offset: 0,
            terminal: 'web'
          }
        }
        this.$store.dispatch('getAjax').then(response => {
          this.restaurantsList = response.data;
        });
      }

    },
    mounted() {
      if (this.$store.state.myStreet.short_address != '未选择地址') {
        //this.show();
        this.getRestaurants();
      }

    }
  }
</script>

<style scoped>
  li {
    list-style: none;
  }
</style>
