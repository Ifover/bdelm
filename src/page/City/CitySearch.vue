<template>
  <div id="citysearch">
    <mt-search fixed v-model="value" autofocus show>
      <div style="padding-top: 20px">
        <mt-cell
          v-if="final"
          v-for="(item,index ) in final"
          :title="item.name"
          :value="item.id"
          :key="index">
        </mt-cell>
      </div>
    </mt-search>
  </div>
</template>

<script>
  /**
   * 上面这个padding-top想想办法 太low了
   * 突然想到一个算法之类的
   * 用户输入完一个地名的一部分的时候筛选出来地址过多,但是先保存这次搜索的结果
   * 输入第二个字符的时候先判断输入的内容和上次的内容是不是是增加的情况
   * 如果是就从上次保存的结果中继续查找以此类推.
   * 不知道这样子会不会省资源 还是说会更多bug 待研究
   *
   * --------------------------------------------------------------------------------------
   * 从localstorage里获取到Key为citys的对象,并且直接赋给result对象
   * 监控value
   */
  import {setStorage, getStorage} from '@/config/Utils.js'

  export default {
    name: "CitySearch",
    data() {
      return {
        value: '',
        result: [],
        final: []
      }
    },
    watch: {
      value() {
        this.final = [];
        let temp = this.value;
        console.log(temp);
        let resultTemp = this.result;
        if (temp) {     //如果value为空就不执行任何操作
          //console.log(resultTemp);
          for (let v in resultTemp) {
            /**
             * 这里的if判断就是判断名字和输入的是否能匹配到(不管位置如何),
             * 或者输入的字母是否为地址的缩写 一律转换为大写(对象存储中全为大写)
             * 或者输入的拼音是否为地址的拼音 一律转换为小写(对象存储种全为小写)
             */
            if (resultTemp[v].name.indexOf(temp) >= 0 ||
              resultTemp[v].abbr == temp.toUpperCase() ||
              resultTemp[v].pinyin == temp.toLowerCase()) {
              console.log(resultTemp[v]);
              this.final.push(resultTemp[v]);
            }
          }
          console.log(this.final);
        }

      }
    },
    mounted() {
      this.result = getStorage('citys');
      //console.log(this.result);
      // if (temp) {
      //   for (let e in temp) {
      //     console.log(temp[e]);
      //   }
      // }
    }
  }
</script>

<style scoped>
  .mint-search {
    top: 0;
    height: 100% !important;
  }

  .mint-search-list {
    padding-top: 60px !important;
  }
</style>
