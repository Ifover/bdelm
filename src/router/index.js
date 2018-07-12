import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Restaurants from '@/page/Restaurants'

import setCity from '@/page/City/setCity'
import getStreet from '@/page/Street/getStreet'
import Home from '@/page/home'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: Home},
    {path: '/setCity', component: setCity},
    {path: '/home', name: 'Home', component: Home},
    {path: '/getStreet/:street/:id', component: getStreet},
    {path:'/restaurants/:geohash&:latitude&:longitude',component:Restaurants}
  ]
})
