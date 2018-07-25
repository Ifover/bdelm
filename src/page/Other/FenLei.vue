<template>
  <div id="fenlei">
    <div class="swipe-wrapper">
      <mt-swipe :auto="0" :defaultIndex="1">
        <mt-swipe-item class="swip-item-1 item">
          <template v-for="(v,k) in Tuijian">
            <a @click="join(k)" role="button" v-if="k>=10">
              <div class="container">
                <img
                  :src="setPic(v.image_hash)">
              </div>
              <span class="title">{{v.name}}</span>
            </a>
          </template>
        </mt-swipe-item>
        <mt-swipe-item class="swip-item-2 item">
          <template v-for="(v,k) in Tuijian">
            <a @click="join(k)" role="button" v-if="k<10">
              <div class="container">
                <img
                  :src="setPic(v.image_hash)">
              </div>
              <span class="title">{{v.name}}</span>
            </a>
          </template>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <hr>
  </div>

</template>

<script>
  import {setStorage, getStorage, clearStorage} from '@/config/Utils.js'
  import {computePic} from '@/config/Tools'
  import {MessageBox, Toast} from 'mint-ui';

  /**
   *
   *
   * 用localstorage
   *
   *
   */

  export default {
    name: "FenLei",
    data() {
      return {
        Tuijian: []
      }
    },
    methods: {
      getjs(str) {
        let item = eval('(' + str + ')');
        console.log(item);
        return item;
      },
      setPic(img) {
        return computePic(img)
      },
      join(k) {
        if (k == 10) {
          MessageBox.confirm('此操作会清空所有的LocalStorage').then(action => {
            clearStorage();
          }).catch(v => {

          });
        } else {
          MessageBox('提示', '对，' + this.Tuijian[k].name + '还不能点！');
        }
      }
    },
    mounted() {
      let ipCity = getStorage('ipCity');
      let setCity = getStorage('setCity');
      //console.log(setCity);
      let finalCity = setCity == null ? ipCity : setCity;
      if (finalCity) {
        let obj = {
          url: '/restapi/shopping/openapi/entries',
          params: {
            latitude: finalCity.latitude,
            longitude: finalCity.longitude,
            templates: ['main_template',]
            // 'templates[]':  'favourable_template'
          }
        }
        this.$store.dispatch('getAjax', obj).then(response => {
          this.Tuijian = response.data[0].entries;
          setStorage('INDEX_ENTRY_DATA', response.data[0].entries)
        });
      }

    }
  }
</script>

<style scoped lang="stylus">
  #fenlei {
    margin-top: 10px;
    width: 100%;
  }

  .swipe-wrapper {
    width: 100%;
    height: 170px;
  }

  a {
    //position: relative;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    float: left;
    width: 20%;
    outline: 0;
    color: inherit;
    text-decoration: none;
    .container {
      //position: relative;
      //padding-left: 5px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .title {
      display: block;
      //margin-top: 10px;
      color: #666;
      text-align: center;
      font-size: .32rem;
    }

  }


</style>
