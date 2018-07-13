import Vue from 'vue'
import App from './Index'
import router from './router'
import store from './store'
import axios from 'axios'
import lodash from 'lodash'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
//Vue.use(axios)
Vue.use(lodash)
Vue.use(Mint)
Vue.prototype.$ajax = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
