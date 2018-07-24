<template>
  <div id="restaurants">
    <filters>sd</filters>
    <h1 v-if="!isOk">--未设置地址--</h1>
    <section class="shoplist" v-else
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="8">
      <section class="index-container" v-for="(v,vindex) in restaurantsList" v-if="restaurantsList.length>0">
        <div class="index-shopInfo">
          <div class="logo-main">
            <img class="logo-logo"
                 :src="setPic(v.image_path)">
          </div>
          <div class="index-main">
            <section class="index-line">
              <h3 class="index-shopname">
                <i content="品牌" class="index-premium" v-if="v.is_premium">品牌</i>
                <span>{{v.name}}</span>
              </h3>
            </section>
            <section class="index-line">
              <div class="index-rateWrap">
                <div class="Rating-wrapper">
                  <div class="Rating-gray">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+">
                  </div>
                  <div class="Rating-actived" :style="{width:v.rating*20 +'%'}">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=">
                  </div>
                </div>
                <span class="index-rate">{{v.rating}}</span>
                <span>月售{{v.recent_order_num}}单</span>
              </div>
              <div class="delivery" v-if="v.delivery_mode">
                <div content="蜂鸟专送" alt="蜂鸟专送" class="delivery-icon">蜂鸟专送</div>
              </div>
            </section>
            <section class="index-line">
              <div class="index-moneylimit">
                <span>¥{{v.piecewise_agent_fee.rules[0].price}}起送</span>
                <span>{{v.piecewise_agent_fee.description}}</span>
              </div>
              <div class="index-distanceWrap">
                <span>x.xxkm</span>
                <span>{{v.order_lead_time}}分钟</span>
              </div>
            </section>
          </div>
        </div>
        <div class="index-activityWrap">
          <span>
            <img class="index-dashedline"
                 src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgLjI1TDI4MCAwIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjEiLz48L3N2Zz4=">
          </span>
          <section class="index-activities">
            <div class="index-activityList">
              <template v-for="(c,d) in v.activities">
                <div class="index-actRow" v-if="d>1" :style="{display: v.isShowActivitys}">
                <span class="index-iconWrap">
                  <span v-if="c.icon_name=='首'" class="index-icon" style="background-color: rgb(112, 188, 70);">首</span>
                  <span v-else-if="c.icon_name=='减'" class="index-icon"
                        style="background-color: rgb(240, 115, 115);">减</span>
                  <span v-else-if="c.icon_name=='折'" class="index-icon"
                        style="background-color: rgb(241, 136, 79);">折</span>
                  <span v-else-if="c.icon_name=='特'" class="index-icon"
                        style="background-color: rgb(241, 136, 79);">特</span>
                  <span v-else-if="c.icon_name=='换'" class="index-icon"
                        style="background-color: rgb(241, 136, 79);">换</span>
                  <span v-else-if="c.icon_name=='赠'" class="index-icon"
                        style="background-color: rgb(60, 199, 145);">赠</span>
                  <span v-else-if="c.icon_name=='爆'" class="index-icon"
                        style="background-color: rgb(240, 115, 115);">爆</span>
                  <span v-else-if="c.icon_name=='惠'" class="index-icon"
                        style="background-color: rgb(240, 115, 115);">惠</span>
                </span>
                  <span class="index-desc" v-if="c.description.length>18">{{c.description.substring(0,18)}}...</span>
                  <span class="index-desc" v-else>{{c.description}}</span>
                </div>
                <div class="index-actRow" v-else>
                <span class="index-iconWrap">
                  <span v-if="c.icon_name=='首'" class="index-icon" style="background-color: rgb(112, 188, 70);">首</span>
                  <span v-else-if="c.icon_name=='减'" class="index-icon"
                        style="background-color: rgb(240, 115, 115);">减</span>
                  <span v-else-if="c.icon_name=='折'" class="index-icon"
                        style="background-color: rgb(241, 136, 79);">折</span>
                  <span v-else-if="c.icon_name=='特'" class="index-icon"
                        style="background-color: rgb(241, 136, 79);">特</span>
                  <span v-else-if="c.icon_name=='换'" class="index-icon"
                        style="background-color: rgb(241, 136, 79);">换</span>
                  <span v-else-if="c.icon_name=='赠'" class="index-icon"
                        style="background-color: rgb(60, 199, 145);">赠</span>
                  <span v-else-if="c.icon_name=='爆'" class="index-icon"
                        style="background-color: rgb(240, 115, 115);">爆</span>
                  <span v-else-if="c.icon_name=='惠'" class="index-icon"
                        style="background-color: rgb(240, 115, 115);">惠</span>
                </span>
                  <span class="index-desc" v-if="c.description.length>18">{{c.description.substring(0,18)}}...</span>
                  <span class="index-desc" v-else>{{c.description}}</span>
                </div>
              </template>
            </div>
            <div class="index-activityBtn" v-if="v.activities.length>2" @click="showHideActivity(vindex)">
              <span>{{v.activities.length}}个活动</span>
              <img :class="{indexOpen:v.isShowActivitys==''}"
                   src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjOTk5IiBkPSJNNC41NzcgNS40MjNjLjc5Ljc3IDIuMDczLjc2NyAyLjg1NyAwbDQuMTItNC4wMjZDMTIuMzQ1LjYyNSAxMi4wOSAwIDEwLjk4NSAwSDEuMDI3Qy0uMDc3IDAtLjMzLjYzLjQ1NyAxLjM5N2w0LjEyIDQuMDI2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+"
                   class="index-open">
            </div>
          </section>
        </div>
        <hr>
      </section>
    </section>
    <div class="loading">
      <mt-spinner type="snake"></mt-spinner>

    </div>
  </div>
</template>

<script>
  import {setStorage, getStorage, removeStorage} from '@/config/Utils.js'
  import {computePic} from '@/config/Tools'
  import Filters from '@/page/Restaurants/Filters'

  export default {
    name: "restaurants",
    components: {
      Filters
    },
    data() {
      return {
        isOk: false,
        restaurantsList: []
      }
    },
    methods: {
      setPic(img) {
        return computePic(img)
      },
      showHideActivity(index) {
        //console.log(this.restaurantsList[index]);
        let temp = this.restaurantsList[index].isShowActivitys;
        this.restaurantsList[index].isShowActivitys = temp == 'none' ? '' : 'none';
      },
      loadMore() {
        /**
         *   已知问题
         *  在最低端的时候如果继续下拉似乎会重复加载赵成有重复的店铺显示问题
         */
        //console.log(this.restaurantsList.length);
        //if (this.restaurantsList.length >= 8) return //测试时使用,屏蔽二次加载
        this.loading = true;
        //let isFirst = this.restaurantsList.length <= 8 ? 0 : 1200;
        setTimeout(() => {
          let tempStreet = getStorage('myStreet');
          let obj = {
            url: '/restapi/shopping/v3/restaurants',
            params: {
              latitude: tempStreet.latitude,
              longitude: tempStreet.longitude,
              offset: this.restaurantsList.length,
              limit: 8,
              order_by: 0,
              /**↑↑↑
               *  排序类型
               *  [0:综合(默认)]
               */
              extras: ['activities'],
              //geohash: tempStreet.geohash,
              extra_filters: 'home',
              rank_id: '190a4531e5d54b809b029549af66a7d1',
              terminal: 'h5'
            }
          }
          this.$store.dispatch('getAjax', obj).then(response => {
            //console.log(response.data.items);
            response.data.items.forEach(e => {
              e.restaurant.isShowActivitys = 'none';
              this.restaurantsList.push(e.restaurant);
            })
            //this.restaurantsList.push(response.data);
            //console.log(response);
          });
          this.loading = false;
        }, 100)

      }
    },
    mounted() {
      this.$store.state.myStreet = getStorage('myStreet');
      let tempStreet = this.$store.state.myStreet
      if (tempStreet) {
        //this.getRestaurants();
        this.isOk = true;
      }

    }
  }
</script>

<style scoped lang="stylus">
  #restaurants {
    //text-align center
  }

  hr {
    opacity: 0.1;
    line-height: 1px;
  }

  .shoplist {
    background-color: #fff;
    .index-container {
      position: relative;
      //border-bottom: .133333vw solid #eee;
      color: #666;
      padding: 1px 0
      list-style: none;
      font-size: 12px;
      line-height: normal
      .index-shopInfo {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        padding: 0 10px
        .logo-main {
          position: relative;
          flex: none;
          z-index: 0;
          padding-top 10px
          width: 60px;
          height: 60px;
          .logo-logo {
            //box-sizing: border-box;
            //display: block;
            width: 100%;
            height: 100%;
            border: 0.5px solid rgba(0, 0, 0, .08);
          }
        }
        .index-main {
          flex-grow: 1;
          flex-direction: column;
          user-select: none;

          padding-top 10px

          padding-left: 10px
          display: flex;
          justify-content: space-between;
          overflow: hidden
          .index-line {
            display: flex;
            align-items: center;
            .index-shopname {
              display: flex;
              margin: 0;
              color: #333;
              font-weight: 700;
              font-size: 15px;
              overflow: hidden;
              .index-premium {
                position: relative;
                display: flex;
                margin-right: 5px;
                //padding: .266667vw .666667vw;
                color: transparent;
                text-align: center;
                font-weight: 700;
                font-style: normal;
              }
              .index-premium:after {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 0;
                content: attr(content);
                padding: 2px 5px;
                color: #6f3f15;
                font-weight: 700;
                font-size: 20px;
                //border-radius: 1.066667vw;
                background-image: linear-gradient(-139deg, #fff100, #ffe339);
                white-space: nowrap;
                transform: scale(.6);
                transform-origin: 0 0
              }
            }
            .index-rateWrap {
              display: flex;
              align-items: center;
              .Rating-wrapper {
                position: relative;
                overflow: hidden;
                display: inline-block;
                vertical-align: middle;
                .Rating-actived, .Rating-gray {
                  display: flex;
                }
                .Rating-actived {
                  position: absolute;
                  top: 0;
                  left: 0;
                  overflow: hidden;
                }
              }
              .index-rate {
                margin: 0 4px;
              }
            }
            .delivery {
              display: flex;
              align-items: center
              margin-left: 82px;
              .delivery-icon {
                position: absolute;
                right 5px
                content: attr(content);
                padding: 1px;
                border-radius: .8vw;
                transform: scale(.85)
                align-content: center
                color: #fff;
                border: 1px solid #0097ff;
                background-image: linear-gradient(45deg, #0085ff, #0af)
              }
            }
            .index-moneylimit {
              display: flex;
              align-content: center
              span + span:before {
                margin: 3px;
                color: #ddd;
                content: "|";
              }
            }
            .index-distanceWrap {
              position absolute
              //flex-shrink
              align-content: center
              //float right
              margin-left: 200px;
              //display: inline-block;
              transform: scale(.85)
              span + span:before {
                margin: 3px;
                color: #ddd;
                content: "|";
              }
            }
          }
        }
      }
      .index-activityWrap {
        padding-left: 80px
        .index-activities {
          position: relative;
          justify-content: space-between;
          align-content: stretch;
          overflow: hidden
          .index-activityList {
            flex: 1;
            //padding-right: 2.666667vw;
            overflow: hidden
          }
          .index-actRow {
            display: flex;
            align-items: center;
            font-size: 12px;
            line-height: 20px
            .index-iconWrap {
              display: inline-block;
              position: relative;
              //margin-right: 1.6vw;
              height: 20px;
              width: 20px;
              vertical-align: middle
              .index-icon {
                position: absolute;
                left: 0;
                top: 3px;
                z-index: 0;
                height: 28px;
                width: 28px;
                font-size: 22px;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                transform: scale(.5);
                transform-origin: 0 0
              }
            }
            .index-desc {
              display: inline-block;
              flex: 1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              vertical-align: middle

            }
          }
        }
        .index-activityBtn {
          position absolute
          top 2px
          right 0
          padding: 0 10px
          color: #999;
          text-align: right;
          img {
            position: relative;
            width: 7px;
            opacity: .9;
            margin-left: 3px;
            transition: all .3s ease-in-out;
            transform: rotate(0deg);
            fill: currentColor;
            will-change: transform;
            vertical-align: middle;
            z-index: 1;
          }
          .indexOpen {
            transform rotate(180deg)
          }
        }

      }
    }
  }
</style>
