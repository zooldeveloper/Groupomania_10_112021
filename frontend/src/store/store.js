import { createStore } from 'vuex'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json'}
})

export default createStore({
  state: {
    successResMsg: null,
    emailResMsg: null,
    passwordResMsg: null
  },
  mutations: {
    SUCCESS_MESSAGE(state, message) {
      state.successResMsg = message
    },
    EMAIL_ERROR_MESSAGE(state, message) {
      state.emailResMsg = message
    },
    PASSWORD_ERROR_MESSAGE(state, message) {
      state.passwordResMsg = message
    }
  },
  actions: { 
    async creatAccount({ context, commit, }, user) {
      try {
        let result = await instance.post('/auth/signup', {
          user: JSON.stringify({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              password: user.password
          }) 
        })
        if (result.status === 201) {
          commit('SUCCESS_MESSAGE', result.data.message)
          // state.responseSuccessMessage = result.data.message
        }
      } catch (err) {
        if (err.response.status === 402 || err.response.status === 409) {
            context, // Put this line to avoid eslint errors!
            commit('EMAIL_ERROR_MESSAGE', err.response.data.message)
            setTimeout(() => {
              commit('EMAIL_ERROR_MESSAGE', null)
            }, 3000)
        } else {
          console.log(err)
        }
      }
    }
  },
  modules: {}
})
