// import Vue from 'vue'
// import Vuex from 'vuex'
import { createStore } from 'vuex';
import ipfs from './modules/ipfs'
// import core from './modules/core'
// import solid from './modules/solid'
// import terminal from './modules/terminal'
// import gun from './modules/gun'
// import automerge from './modules/automerge'

// Vue.use(Vuex)

const store = createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ipfs,//  core, solid, terminal, gun /*automerge*/
  }
})

export default store
