import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vHeadTitle: ''
  },
  mutations: {
    changeVHeadTitle: (state, value) => {
      state.vHeadTitle = value.value
    }
  },
  actions: {
  },
  modules: {
  }
})
