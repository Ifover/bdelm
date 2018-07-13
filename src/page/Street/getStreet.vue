<template>
  <div id="getStreet">
    <h1>ass</h1>
  </div>
</template>

<script>
  export default {
    name: "getStreet",
    data() {
      return {
        address: "天河新街",
        addressList: []
      }
    },

    mounted() {
      console.log(this.$store.state);
      this.address = this.$route.params.address
    }
  }
</script>

<style scoped>

</style>
