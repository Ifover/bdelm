<template>
  <div id="home">
    <h1>当前定位城市:{{this.cityNow.title}}</h1>
  </div>
</template>

<script>
  //import axios from 'axios'

  export default {
    name: "home",
    data() {
      return {
        cityNow: {
          pinyin: null,
          title: null,
          abbr: null
        }
      }
    },
    methods: {
      getcity() {
        let url = '/news/latest';

        this.$ajax({
          url: '/cities',
          params: {
            type: 'guess'
          },
          method: 'get',
          withCredentials: true
        }).then(response => {
          console.log(response);
          this.cityNow.title=response.data.name;
          this.cityNow.pinyin=response.data.pinyin;
          this.cityNow.abbr=response.data.abbr;
        }).catch(error => {
          console.log(error);
        })
      }
    },
    mounted() {
      this.getcity();
    }
  }
</script>

<style scoped>

</style>
