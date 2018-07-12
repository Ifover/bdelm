import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)
const state = {
  myCity: [],
  obj: [],
  response: null,
  error: null
}

const mutations = {}

const actions = {
  getAjax({}) {
    return new Promise((resolve, reject) => {
      //console.log(state);
      axios({
        method: 'get',
        url: state.obj.url,
        params: state.obj.params,
        withCredentials: true
      }).then(function (response) {
        resolve(response);
        //console.log(response);
      }).catch(error => {
          reject(error);
        }
      )
    })
  },
  getMyCity(context) {
    state.obj = {
      url: '/restapi/shopping/v1/cities/guess',
      params: {type: 'guess'}
    }
    context.dispatch('getAjax').then(response => {
      state.myCity = response.data;
    })
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})