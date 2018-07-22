/*
重新绘制该页面,用通讯录的方式显示城市
右侧一列显示ABC等序号
左侧试视图单一的显示该序号下有的城市
默认情况下显示热门城市 使用#号来收纳
*/
<template>
  <div id="setCity">
    <!--<mt-search cancel-text="取消" autofocus show>-->
    <!--<mt-cell-->
    <!--v-if="result"-->
    <!--v-for="(item,index ) in result"-->
    <!--:title="item.title"-->
    <!--:value="item.value"-->
    <!--:key="index">-->
    <!--</mt-cell>-->
    <!--</mt-search>-->
    <mt-header fixed title="选择你的城市">
      <!--<mt-header fixed  v-else title="strer.short_address▽">-->
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/citysearch" slot="right">
        <mt-button>搜索</mt-button>
      </router-link>
    </mt-header>

    <mt-index-list>
      <mt-index-section index="#" v-if="this.ipCity">
        <div @click="cityBack('YY','YY')">
          <mt-cell :title="'🚩 '+ this.ipCity.name"></mt-cell>
        </div>
      </mt-index-section>
      <mt-index-section v-for="(v,k) in Citys" :index="k" :key="k">
        <div @click="cityBack(k,y)" v-for="(x,y) in v">
          <mt-cell :title="x.name" :key="y"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>

  </div>
</template>

<script>
  import store from '@/store/index.js'
  import {setStorage, getStorage} from '@/config/Utils.js'

  export default {
    name: "setCity",
    data() {
      return {
        ipCity: [], //这里是定位出来的城市
        Citys: []  //这里可能是中国所有的城市
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
      cityBack(k, y) {
        //console.log(k, y);
        if (k == y) {
          setStorage('setCity', this.ipCity);
        } else {
          setStorage('setCity', this.Citys[k][y]);
        }
        this.$router.push({path: '/setStreet'});
      }
    },
    mounted() {
      this.$store.state.isShow = 'none'; //让导航栏隐藏因为属于次级页面还是隐藏比较好看
      this.ipCity = getStorage('ipCity');//获取ip所在城市
      /*
      *   以下:
      *     首先获取LocalStorage内ALL_CITYS
      *     如果未获取到内容则说明未设置该项
      *       开始从网络获取所有城市信息
      *       获取成功后赋值给data内的Citys
      *     如果成功获取到内容
      *       直接复制给data内的Citys
      * */
      let allCitys = getStorage('ALL_CITYS')
      if (allCitys) {
        this.Citys = allCitys;
      } else {
        let obj = {
          url: '/restapi/shopping/v1/cities',
        }
        this.$store.dispatch('getAjax', obj).then(response => {
          this.Citys = response.data;
          setStorage('ALL_CITYS', response.data);
        });
      }
    }
  }
</script>

<style scoped>
  #setCity {
    padding-top: 41px;
  }

  h1 {
    font-size: 66px;
  }

  mint-cell-title {
    text-align: left !important;
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
