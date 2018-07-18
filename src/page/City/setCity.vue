/*
重新绘制该页面,用通讯录的方式显示城市
右侧一列显示ABC等序号
左侧试视图单一的显示该序号下有的城市
默认情况下显示热门城市 使用#号来收纳
*/
<template>
  <div id="setCity">
    <mt-header fixed title="选择你的城市">
      <!--<mt-header fixed  v-else title="strer.short_address▽">-->
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!--<span>猜你在<a href="/"> {{this.$store.state.myCity.name}} </a></span>-->
    <!--<ul>-->
    <!--<li class="liebiao" v-for="(v,k) in Citys">-->
    <!--<div class="paixu">{{k}}</div>-->
    <!--<ul>-->
    <!--<template v-for="(x,y) in v">-->
    <!--<a @click="showCityInfo(k,y)">-->
    <!--<li class="dizhi" v-if="x.name.length<5">{{x.name}}</li>-->
    <!--<li class="dizhi" v-else>{{x.name.substring(0,4)}}...</li>-->
    <!--</a>-->
    <!--</template>-->
    <!--</ul>-->
    <!--</li>-->
    <!--</ul>-->
    <mt-index-list>
      <mt-index-section  index="#" >
        <mt-cell :title="this.$store.state.myCity.name" ></mt-cell>
      </mt-index-section>
      <mt-index-section v-for="(v,k) in Citys" :index="k" :key="k">
        <mt-cell v-for="(x,y) in v" :title="x.name" :key="y"></mt-cell>
      </mt-index-section>

    </mt-index-list>
  </div>
</template>

<script>
  import store from '@/store/index.js'

  export default {
    name: "setCity",
    data() {
      return {
        Citys: [], //这里可能是中国所有的城市
        title: 'ABCDEFGHGKLMNPQRSTVWXYZ'
      }
    },
    /**
     * home.vue和serCity.vue统一说明(城市的获取)
     * 首先home显示会所在城市 以$store.state.myCity.name是否为空做判断,
     * 如果为空则首次运行获取当前城市.
     * 否则说明在setCity.vue里获取过用户设置的城市,或者在别的页面返回home.vue时不再获取所在城市(后半句待研究)
     * serCity中打开将立即获取当前城市,以此覆盖$store.state.myCity来刷新系统的猜测城市
     *
     * 考虑到vuex刷新会导致数据全部重置,可以考虑用那个方法 对就是那个 s什么的
     */
    methods: {
      showCityInfo(x, y) {
        this.$store.state.myCity = this.Citys[x][y];
        this.$router.push({path: '/'})
      },

    },
    mounted() {
      this.$store.dispatch('getMyCity'); //获取所在城市
      getCitys:{ //这里是获取所有的城市并且保存在该主键的Citys里共上方读取
        this.$store.state.obj = {
          url: '/restapi/shopping/v1/cities',
        }
        this.$store.dispatch('getAjax').then(response => {
          this.Citys = response.data;
        });
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 66px;
  }

  .paixu {
    /*color: #666;*/
    font-weight: 400;
    text-indent: .45rem;
    border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    width: 100%;
    font: .55rem/1.45rem Helvetica Neue;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    color: #333;
    font-weight: 400;
    font-family: Microsoft Yahei;
    box-sizing: border-box;
    width: 100%;
  }

  .liebiao {

    list-style: none;
  }

  .dizhi {
    float: left;
    text-align: center;
    color: #3190e8;
    /*border-bottom:0.025rem solid #e4e4e4;*/
    /*border-right:0.025rem solid #e4e4e4;*/
    width: 25%;
    height: 1.75rem;
    font: 0.6rem/1.75rem "Microsoft YaHei"
  }
</style>
