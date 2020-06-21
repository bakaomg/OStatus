import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vHeadTitle: '',
    backBtn: ''
  },
  mutations: {
    changeVHeadTitle: (state, value) => {
      state.vHeadTitle = value.value
    },
    changeBackBtn: (state, value) => {
      state.backBtn = value.value
    }
  },
  actions: {
  },
  modules: {
  }
})
