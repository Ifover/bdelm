<template>
  <div id="tuijian">
    <h1 v-if="this.$store.state.myStreet.short_address=='未选择地址'">滚</h1>

    <!--{{this.$store.state.myStreet.short_address}}-->
  </div>
</template>

<script>
  export default {
    name: "TuiJian",
    data() {
      return {
        Restaurants: [],
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
