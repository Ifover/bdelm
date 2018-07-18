import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import Index from '@/Index'
import Home from '@/page/Home/Home'
import Header from '@/page/Header/Header'
import setCity from '@/page/City/setCity'
import getStreet from '@/page/Street/getStreet'
import setStreet from '@/page/Street/setStreet'

import Restaurants from '@/page/Other/Restaurants'

//需要改名字
import FenLei from '@/page/Other/FenLei'
import TuiJian from '@/page/Other/TuiJian'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        header:Header,
        fenlei: FenLei,
        tuijian: Restaurants
      }
    },
    // {path: '/', name: 'Home', component: Home},
    {path: '/setCity', component: setCity},
    {path: '/setStreet', component: setStreet},
    {path: '/getStreet/:street', component: getStreet}
    // {path: '/restaurants/:geohash&:latitude&:longitude', component: Restaurants}
  ]
})
