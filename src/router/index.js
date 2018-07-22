import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import Index from '@/Index'
import Home from '@/page/Home/Home'
import Header from '@/page/Header/Header'

import getStreet from '@/page/Street/getStreet'
import setStreet from '@/page/Street/setStreet'


import CitySet from '@/page/City/CitySet'
import CitySearch from '@/page/City/CitySearch'

import MSite from '@/page/Other/MSite'

//需要改名字
import FenLei from '@/page/Other/FenLei'
import Restaurants from '@/page/Other/Restaurants'
import TuiJian from '@/page/Other/TuiJian'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Home,
    },
    {
      path: '/',
      component: Index,
      children: [
        {path: 'home', component: Home},
        {path: 'setStreet/:cityid?', component: setStreet}

      ]
    },
    // {
    //   path: '/',
    //   components: {
    //     default: Home,
    //     header:Header,
    //     fenlei: FenLei,
    //     tuijian: Restaurants
    //   }
    // },
    // {path: '/', name: 'Home', component: Home},
    {path: '/cityset', component: CitySet},
    {path: '/citysearch', component: CitySearch},
    {path: '/getStreet/:street', component: getStreet}
    // {path: '/restaurants/:geohash&:latitude&:longitude', component: Restaurants}
  ]
})
