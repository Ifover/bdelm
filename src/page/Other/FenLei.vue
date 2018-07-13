<template>
  <div id="fenlei">


    <ul>
      <template v-for="(v,k) in Tuijian">
        <li>
          {{v.name}}
        </li>
      </template>
    </ul>
    <hr>
  </div>
</template>

<script>
  export default {
    name: "FenLei",
    data() {
      return {
        Tuijian: []
      }
    },
    methods: {
      getFenlei() {
        this.$store.state.obj = {
          url: '/restapi/shopping/openapi/entries',
          params: {
            latitude: this.$store.state.myStreet.latitude,
            longitude: this.$store.state.myStreet.longitude,
            'templates[]': 'main_template'
          }
        }
        this.$store.dispatch('getAjax').then(response => {
          console.log(response.data[0].entries);
          this.Tuijian = response.data[0].entries;
        });
      }
    },
    mounted() {
      this.getFenlei();
    }
  }
</script>

<style scoped>

</style>
