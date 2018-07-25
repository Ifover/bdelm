<template>
  <div id="filters">
    <div class="sxsxsx">推荐商家</div>
    <button @click="mynum"> change</button>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">
        <div @click="mynum">
          选项一
        </div>
      </mt-tab-item>
      <mt-tab-item id="2">
        <div>
          好评优先
        </div>
      </mt-tab-item>
      <mt-tab-item id="3">
        <div>
          距离最近
        </div>
      </mt-tab-item>
      <mt-tab-item id="4">
        <div>
          赛选
        </div>
      </mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected" v-if="isSecond">
      <mt-tab-container-item id="1">
        <mt-cell v-for="(n,y) in 10" :title="'内容 ' + n" :key="y"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <mt-cell title='赛选'/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>

  export default {
    name: "Filters",
    data() {
      return {
        selected: '1',
        isSecond: false
      }
    },
    methods: {
      mynum() {
        this.isSecond = !this.isSecond
        if (!this.isSecond) {
          this.selected = '0'
        }
        console.log($);
        console.log(this.selected);
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

        if (val == 2 || val == 3) {
          console.log(val);
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .sxsxsx {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    font-size: 18px;
    color: #000;
  }

  .sxsxsx:after, .sxsxsx:before {
    display: block;
    content: "";
    width 20px
    height 1px
    background-color: #999;
  }

  .sxsxsx:after {
    margin-left 13px
  }

  .sxsxsx:before {
    margin-right 13px
  }
</style>
