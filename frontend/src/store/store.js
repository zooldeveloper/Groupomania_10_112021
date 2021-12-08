import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    responseErrorMessage: null
  },
  mutations: {},
  actions: {
    async creatAccount({ context, state }, user) {
      try {
        let result = await axios.post('http://localhost:3001/api/auth/signup', {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        })
        console.log(result)
      } catch (err) {
        if (err.response.status === 409) {
          context,
          state.responseErrorMessage = err.response.data.message
        } else {
          console.log(err)
        }
      }
    }
  },
  modules: {}
})
