<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-view/>
    <router-view name="fenlei"></router-view>
    <router-view name="tuijian"></router-view>


  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        address: "",
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

<style lang="less">
  .sd {
    position: fixed;
    top: 30px;
    left: 0px;
    width: 100%;
    text-align: center;
    background-color: darkgrey;
  }

  #header {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 30px;
    background-color: darkgrey;
    a {
      float: left;
      margin-top: 5px;
      margin-left: 3px;
      //border: black solid 1px;
      //mso-font-width: 30px;
      //height: 30px;
    }
    input {
      float: left;
      margin-top: 5px;
    }
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
