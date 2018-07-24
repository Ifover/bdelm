/*
重新绘制该页面,用通讯录的方式显示城市
右侧一列显示ABC等序号
左侧试视图单一的显示该序号下有的城市
默认情况下显示热门城市 使用#号来收纳
*/
<template>
  <div id="setCity">
    <!--<mt-header fixed title="选择你的城市">-->
    <!--&lt;!&ndash;<mt-header fixed  v-else title="strer.short_address▽">&ndash;&gt;-->
    <!--<router-link to="/" slot="left">-->
    <!--<mt-button icon="back">返回</mt-button>-->
    <!--</router-link>-->
    <!--<router-link to="/citysearch" slot="right">-->
    <!--<mt-button>搜索</mt-button>-->
    <!--</router-link>-->
    <!--</mt-header>-->
    <mt-header title="城市选择">
      <router-link to="/setStreet" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right" @click="clear"></mt-button>-->
    </mt-header>

    <div class="citySearch">
      <div class="city-1d">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="city-1r">
          <path fill-opacity=".38"
                d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path>
        </svg>
      </div>
      <input type="text" v-model="SearchStr" placeholder="输入城市名或拼音查询">
      <!--、或首字母-->
    </div>

    <mt-index-list v-if="ALL_CITYS_IS_SHOW">
      <mt-index-section index="#" v-if="this.ipCity">
        <div @click="cityBack('YY','YY')">
          <mt-cell :title="'🚩 '+ this.ipCity.name"></mt-cell>
        </div>
      </mt-index-section>
      <mt-index-section v-for="(v,k) in Citys" :index="v.idx" :key="k">
        <div @click="cityBack(k,y)" v-for="(x,y) in v.cities">
          <mt-cell :title="x.name" :key="y"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>
    <div v-for="(item,index) in final" @click="ads(index)" v-else>
      <mt-cell
        v-if="final"
        :title="item.name"
        :key="index">
        <!--<a @click="ads"></a>-->
      </mt-cell>
    </div>

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
        Citys: [],  //这里可能是中国所有的城市
        SearchStr: '',
        ALL_CITYS_IS_SHOW: true,
        final: []
      }
    },
    watch: {
      SearchStr() {
        this.final = [];
        let inputValue = this.SearchStr;

        //console.log(inputValue);
        let resultTemp = this.Citys;
        //console.log(resultTemp[0]);

        if (inputValue) {     //如果value为空就不执行任何操作
          this.ALL_CITYS_IS_SHOW = false
          for (let e in resultTemp) {
            for (let x in resultTemp[e].cities) {
              if (resultTemp[e].cities[x].name.indexOf(inputValue) >= 0 ||
                // resultTemp[e][x].abbr.indexOf(inputValue.toUpperCase()) == 0 ||
                resultTemp[e].cities[x].pinyin.indexOf(inputValue.toLowerCase()) == 0) {
                //console.log(resultTemp[v]);
                this.final.push(resultTemp[e].cities[x]);
                //console.log(resultTemp[e].cities[x].name);
              }
            }
            //console.log(this.final);
            //this.result.push(temp[e][x])
            /**
             * 这里的if判断就是判断名字和输入的是否能匹配到(不管位置如何),
             * 或者输入的字母是否为地址的缩写 一律转换为大写(对象存储中全为大写)
             * 或者输入的拼音是否为地址的拼音 一律转换为小写(对象存储种全为小写)
             */
          }
          //console.log(this.final);
        } else {
          this.ALL_CITYS_IS_SHOW = true;
        }

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
      ads(index) {
        //console.log(this.final[index]);
        setStorage('setCity', this.final[index]);
        this.$router.push({path: '/setStreet'});

      },
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
      //console.log($);
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
        this.Citys = allCitys.cityList;
      } else {
        let obj = {
          url: '/lib/city-list@0.0.2/city_list.js',
          // url: '/restapi/shopping/v1/cities',
        }
        this.$store.dispatch('getAjax', obj).then(response => {
          this.Citys = response.data.cityList;
          //console.log(response.data.cityList);
          setStorage('ALL_CITYS', response.data);
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
  #setCity {
    //padding-top: 41px;
  }

  .citySearch {
    position: relative;
    text-align: center;
    height: 50px;
    background-color: #26a2ff;
    input {
      width: 320px;
      height: 30px;
      border: 0
      margin-top: 10px;
      padding-left: 30px;
      appearance: none;
      border-radius: 15px;
    }
  }

  .city-1d {
    position: absolute;
    left: 25px;
    top: 18px;

    .city-1r {
      width: 3.733333vw;
      height: 3.733333vw;

    }
  }

  .paixu {
    /*color: #666;*/
    font-weight: 400;
    text-indent: .45rem;
    border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    width: 100%;
    font: .55rem / 1.45rem Helvetica Neue;
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
    font: 0.6rem / 1.75rem "Microsoft YaHei"
  }
</style>
