import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {},
    gettingUsers: false,
    totalPayable: null
    // newUser: {}
  },
  getters: {
    getUsers: (state) => state.userData,
    gettingUsers: (state) => state.gettingUsers,
    getTotal: (state) => state.totalPayable,
  },
  mutations: {
    setUsers(state, users){
      state.userData = users
    },
    setGettingUsers: (state, status) => {
      state.gettingUsers = status;
    },
    setTotal(state, pay){
      state.totalPayable = pay
    },
  },
  actions: {
    getUsers: async(context) => {
    context.commit('setGettingUsers', true);
    await axios.get('https://cornie-assessment.herokuapp.com/users/6iC46vxqNsvax5y')
     .then((res) => {
      context.commit('setUsers', res.data)
      const unpaid = res.data.data.filter(user => user.paymentStatus === 'unpaid')
      const overdue = res.data.data.filter(user => user.paymentStatus === 'overdue')
      const unpaidPrice = unpaid.map(user => user.amountInCents).reduce((prev, next) => prev + next);
       if (overdue.length > 0) {
        const overduePrice = overdue?.map(user => user.amountInCents).reduce((prev, next) => prev + next);
        const total = unpaidPrice + overduePrice
        context.commit('setTotal', total)
       } else{
        context.commit('setTotal', unpaidPrice)
       }
      
     })
     .catch((err) => {
      console.log(err)
      // toastr.error('An error ocurred')
     })
     .finally(() => {
      context.commit('setGettingUsers', false);
    });
    },
    markPaid: async(context, payload) => {
      // context.commit('setGettingUsers', true);
      await axios.patch(`https://cornie-assessment.herokuapp.com/mark-paid/${payload}`)
       .then(() => {
        // toastr.success(`Payment status changed to ${res.data.data.paymentStatus}`)
       })
       .catch((err) => {
        console.log(err)
       })
       .finally(() => {
        // context.commit('setGettingUsers', false);
      });
      },
  },
  modules: {
  }
})
