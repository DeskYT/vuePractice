import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    count: 0,
    theme:(localStorage.getItem('theme') === 'true')
  },
  mutations: {
    setCount: (state, count) => state.count = count,
    setTheme: (state,theme) => {
      state.theme = theme
      //localStorage.setItem('theme', theme)
    },
    setUser: (state, user) => state.user = user,
  },
  getters: {
    getCount: (state) =>
    {
      return state.count
    },
    getTheme: (state) => {
      return state.theme
    },
    getUser: (state) => {
      return state.user
    }
  }
})