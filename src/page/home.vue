<template>
  <div id="home">
    <!--<h1>当前定位城市:</h1>-->
    <a href="#/setCity">
      <span>{{this.$store.state.myCity.name}}▽</span>
    </a>
    <br>
    <br>
    <br>
    <input type="text">
    <!--<input type="text" v-model="address">-->
    <br>
    <br>
    <br>
    <button @click="jumpGetStreet(address)">搜索</button>
    <!--<ul v-if="addressList.length!=0 && v.city_id==cityNow.id" v-for="v in  addressList">-->
    <!--<a :href="'#/restaurants/'+v.geohash+'&'+v.latitude+'&'+v.longitude">-->
    <!--<li>-->
    <!--<p style="font-size: 10px">{{v.short_address}}</p>-->
    <!--<p style="font-size: 10px;color: darkgrey">{{v.address}} 附近有{{v.count}}家商家 </p>-->
    <!--</li>-->
    <!--</a>-->
    <!--</ul>-->
  </div>
</template>

<script>
  import store from '@/store/index.js'

  export default {
    name: "home",
    data() {
      return {
        address: "天河新街",
        addressList: []
      }
    },
    methods: {
      jumpGetStreet(str){
        this.$router.push({path: '/getStreet/1/1'});
      }
    },
    mounted() {
      //this.getStreet();
      //console.log(this.$store.state.myCity);
      if (!this.$store.state.myCity.name) {
        //对于此处的说明已经放置在serCity.vue里的mounted处
        this.$store.dispatch('getMyCity');
      }
      //console.log(this.$store.state.myCity);

    }
  }
</script>

<style scoped>

</style>
