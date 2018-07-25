<template>
  <div id="filters">
    <mt-navbar v-model="selected" v-if="order_by.length != 0">
      <mt-tab-item id="1">
        <div @click="mynum">
          {{order_by.inside_sort_filter[inside_filter_choosed].name}}
          <svg viewBox="0 0 72 32" class="dropdown-icon">
            <path d="M36 32l36-32h-72z"></path>
          </svg>
        </div>
      </mt-tab-item>
      <mt-tab-item id="2">
        <div @click="test(order_by.outside_sort_filter[0].value,'2')">
          {{order_by.outside_sort_filter[0].name}}
        </div>
      </mt-tab-item>
      <mt-tab-item id="3">
        <div @click="test(order_by.outside_sort_filter[1].value,'3')">
          {{order_by.outside_sort_filter[1].name}}
        </div>
      </mt-tab-item>
      <mt-tab-item id="4">
        <div @click="mynum">
          <span>筛选</span>
          <svg class="filter-nav-more__icon" viewBox="0 0 26 26" id="more-filter" width="100%" height="100%">
            <path
              d="M9.001 15.009V23a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7.981l7.788-10.01a1 1 0 0 0-1.578-1.228l-8 10.28a1 1 0 0 0-.21.615V22h-4v-7.324a1 1 0 0 0-.2-.6L4.001 5h14a1 1 0 0 0 0-2H2a1 1 0 0 0-.8 1.6L9 15.009z"></path>
          </svg>
        </div>
      </mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container class="mttab" v-model="selected" v-if="isSecond && order_by && Screen" :class="{isIndex:isIndex}">
      <mt-tab-container-item id="1">
        <div v-for="(n,y) in order_by.inside_sort_filter" @click="test(n.value,y)">
          <mt-cell :title="n.name" :key="n.value"/>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <dl class="allpp">
          <dt>商家服务(可多选)</dt>

          <dd v-for="(v,y) in Screen.supports" @click="serverChoose(y)" :class="v.i ? 'chosd' :'dd'">
            <span>{{v.name}}</span>
          </dd>
          <dt>优惠活动(单选)</dt>
          <dd v-for="v in Screen.activity_types" class="dd">
            <span>{{v.name}}</span>
          </dd>
          <dt>优惠活动(单选)</dt>
          <dd v-for="v in Screen.average_costs" class="dd">
            <span>{{v.description}}</span>
          </dd>
        </dl>
      </mt-tab-container-item>
    </mt-tab-container>
    <!--<button @click="demo">Test</button>-->

  </div>
</template>

<script>
  import {setStorage, getStorage} from '@/config/Utils.js'

  export default {
    name: "Filters",
    data() {
      return {
        selected: '1',
        isSecond: false,
        order_by: [],
        Screen: [],
        inside_filter_choosed: 0
      }
    },
    methods: {
      serverChoose(y) {
        this.$forceUpdate();
        this.Screen.supports[y].i = !this.Screen.supports[y].i;
      },
      mynum() {
        this.isSecond = !this.isSecond
        if (!this.isSecond) {
          let x = getStorage('Filters')
          setTimeout(() => {
            this.selected = x == null ? '1' : x.selected
          }, 10)
        }
        //console.log(this.selected);
      },
      demo() {

        //console.log();
      },
      test(id, valueChoosed) {
        console.log(valueChoosed);

        if (valueChoosed == '2' || valueChoosed == '3') {
          this.selected = valueChoosed;
          this.inside_filter_choosed = 0;
        } else {
          this.inside_filter_choosed = valueChoosed;
        }


        this.isSecond = false
        //this.selected = '1'
        let saveStorage = {
          selected: this.selected,
          inside_filter_choosed: this.inside_filter_choosed,
          storeMode: id
        }
        console.log(saveStorage);
        //setStorage('Filters', saveStorage);
        //this.$router.go(0);
      }
    },
    watch: {
      selected: function (val, oldVal) {
        //val     切换后 id
        //oldVal  切换前 id
        //console.log(val, oldVal);
        if (val == oldVal) {
          console.log(1);
        }

        if (val == 5 || val == 7) {
          console.log(val);
        }
      }
    },
    mounted() {

      //https://h5.ele.me/?latitude=27.994921&longitude=120.699387&terminal=h5
      let myStreet = getStorage('myStreet');

      let obj = {
        url: '/restapi/shopping/v1/restaurants/outside_filter/attributes',
        params: {
          latitude: myStreet.latitude,
          longitude: myStreet.longitude,
          terminal: 'h5'
        }
      }
      this.$store.dispatch('getAjax', obj).then((val) => {
        this.order_by = val.data;
      });
      obj = {
        url: '/restapi/shopping/v1/restaurants/filter-bar/attributes',
        params: {
          latitude: myStreet.latitude,
          longitude: myStreet.longitude,
          terminal: 'h5'
        }
      }
      this.$store.dispatch('getAjax', obj).then((val) => {
        this.Screen = val.data;
        val.data.supports.forEach((e) => {
          e.i = false;
        })
      });
      let saveStorage = getStorage('Filters');
      //console.log(saveStorage);
      if (saveStorage) {
        this.selected = saveStorage.selected;
        this.inside_filter_choosed = saveStorage.inside_filter_choosed;
      }
    }
  }
</script>

<style scoped lang="stylus">
  .mttab {
    background-color white
  }

  .isindex {
    position fixed !important
    top 60px !important
    width 100%
    //margin-bottom 10px
    z-index 999
  }

  .allpp {
    width 100%
    dt {
      width 100%
      font-size 16px
      float left
    }
    .dd {
      width 20%
      font-size 12px
      float left
      background-color #fafafa
      span {
        font-size 10px
      }
    }
    .chosd {
      width 20%
      font-size 12px
      float left
      background-color #0a00fa
      span {
        font-size 10px
        font-weight 900
      }
    }
  }

  .dropdown-icon {
    width: 1.6vw;
    height: .8vw;
    margin-left: 1.333333vw;
    margin-bottom: .533333vw;
    fill: #333;
    will-change: transform;
    transition: transform .3s;
  }

  .filter-nav-more__icon {
    margin-left: .533333vw;
    width: 10px;
    height: 10px;
    fill: #666;
  }
</style>
