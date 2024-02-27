import {createStore}  from 'vuex'


const stora =  createStore({
   state: {
    secciones: [],
    seccion: {},
    user: '',
   },
   mutations: {
    setSecciones (state, value) {
     state.secciones = value
    },
    getSeccion (state, value) {
      state.seccion = value 
    },
    getUser (state, value) {
      state.user = value
    }
   },

   actions: {

   },

   getters: {

   }

   
})

export default stora