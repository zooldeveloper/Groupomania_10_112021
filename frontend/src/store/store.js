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
    passwordResMsg: null,
    posts: {}
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
    },
    GET_ALL_POSTS(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    // Makes the post request of the user sign up
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
    },
    // Makes the post request of the user login
    async logIn({ context, commit }, user) {
      try {
        let result = await instance.post('/auth/login', { 
          user: JSON.stringify({
              email: user.email,
              password: user.password 
           }) 
        })
        if (result.status == 200) {
          // document.cookie = JSON.stringify(`token=${result.data.token}`)
        }
      } catch (err) {
        if (err.response.status === 403) {
          context, // Put this line to avoid eslint errors!
            commit('EMAIL_ERROR_MESSAGE', err.response.data.message)
            setTimeout(() => {
              commit('EMAIL_ERROR_MESSAGE', null)
            }, 3000)
        } else if(err.response.status === 401) {
          commit('PASSWORD_ERROR_MESSAGE', err.response.data.message)
          setTimeout(() => {
            commit('PASSWORD_ERROR_MESSAGE', null)
          }, 3000)
        } else {
          console.log(err)
        }
      }
    },
    // // Makes the get request of all users posts
    async getAllPosts({ commit }) {
      try {
        let result = await instance.get('/posts')
        if (result.status === 200) {
          commit('GET_ALL_POSTS', result.data)
        }  
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {}
})
