import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)
const state = {
  myStreet: null,
  myCity: null,
  Citys: null,
  obj: [],
  response: null,
  error: null,
  isShow: ''
}

const mutations = {}

const actions = {
  getAjax(context, obj) {
    return new Promise((resolve, reject) => {
      //console.log(obj.url);
      axios({
        method: 'get',
        url: obj.url,
        params: obj.params,
        withCredentials: true
      }).then(function (response) {
        resolve(response);
      }).catch(error => {
          reject(error);
        }
      )
    })
  },
  // getMyCity(context) {
  //   state.obj = {
  //     url: '/restapi/shopping/v1/cities/guess',
  //     // params: {type: 'guess'}
  //   }
  //   context.dispatch('getAjax').then(response => {
  //     context.state.myCity = response.data;
  //     console.log('----下面是store-------');
  //     console.log(context.state.myCity);
  //   })
  // }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
