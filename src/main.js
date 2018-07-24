import Vue from 'vue'
import App from './Index'
import router from './router'
import store from './store'
import axios from 'axios'
import lodash from 'lodash'
import $ from 'jquery'
//import MintUI from 'mint-ui'
//import 'mint-ui/lib/style.css'
import {
  Toast,
  Header,
  Button,
  Swipe,
  SwipeItem,
  Spinner,
  Search,
  Tabbar,
  TabItem,
  IndexList,
  IndexSection,
  Cell,
  InfiniteScroll,
  Navbar,TabContainer, TabContainerItem
} from 'mint-ui'

Vue.use(lodash)
//Vue.use(MintUI)
//Vue.component(Toast);

Vue.component(Search.name, Search);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Cell.name, Cell);
Vue.component(Spinner.name, Spinner);
Vue.component(Navbar.name, Navbar);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

Vue.use(InfiniteScroll);
Vue.config.productionTip = false
//Vue.use(axios)


Vue.prototype.$ajax = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
