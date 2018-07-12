<template>
  <div id="getStreet">
    <h1>112</h1>
  </div>
</template>

<script>
  export default {
    name: "getStreet",
    methods: {
      getStreet() {
        this.$store.state.obj = {
          url: '/restapi/v2/pois',
          params: {
            'extras[]': 'count',
            geohash: 'wsvz686d5xd0',
            keyword: this.address,
            limit: 20,
            type: 'nearby'
          }
        }
        this.$store.dispatch('getAjax').then(response => {
          //short_address address count
          this.addressList = response.data
          //console.log(response);
        });
      }
    },
    mounted() {
      console.log(this.$route.params);
      ;
    }
  }
</script>

<style scoped>

</style>
