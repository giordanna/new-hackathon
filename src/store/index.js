import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyAysAicX-7gOgFum4DW7--7yZLXXCIFiNA",
  authDomain: "the-big-hackathon.firebaseapp.com",
  databaseURL: "https://the-big-hackathon.firebaseio.com",
  projectId: "the-big-hackathon",
  storageBucket: "the-big-hackathon.appspot.com",
  messagingSenderId: "479271084207"
}

firebase.initializeApp(config)

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      // idToken: null,
      // userId: null,
      // logado: false,
      score: 0,
      cards: [],
      times: []
    },
    mutations: {
      authUser (state, userData) {
        state.idToken = userData.idToken
        state.userId = userData.userId
        state.logado = userData.logado
      },
      updateCards (state, cards) {
        state.cards = cards
      },
      updateTimes (state, times) {
        state.times = times
      },
      updateScore (state, score) {
        state.score = score
      }
    },
    actions: {
      checkUser ({ commit }) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            firebase.auth().currentUser.getIdToken()
              .then((token) => {
                commit('authUser', {
                  idToken: token,
                  userId: firebase.auth().currentUser.uid,
                  logado: true
                })
              })
          }
        })
      },
      login ({ commit }, authData) {
        firebase.auth()
          .signInWithEmailAndPassword(authData.email, authData.senha)
          .then(() => {
            firebase.auth().currentUser.getIdToken()
              .then((token) => {
                commit('authUser', {
                  idToken: token,
                  userId: firebase.auth().currentUser.uid
                })
              })
          }, (erro) => console.log(erro))
      },
      logout ({ commit }) {
        firebase.auth().signOut()
          .then(() => {
            commit('authUser', {
              idToken: null,
              userId: null,
              logado: false
            })
          }, (erro) => console.log(erro))
      },
      getCards ({ commit }) {
        return new Promise((resolve) => {
          firebase.database().ref('cards').on('value', (snapshot) => {
            commit('updateCards',
              Object.values(snapshot.val()).reverse()
            )
            resolve()
          })
        })
      },
      getScore ({ state, commit }) {
        return new Promise((resolve) => {
          let somaScore = 0
          state.cards.map((card) => {
            somaScore += card.checkout ? card.pontuacao : 0
          })
          commit('updateScore', somaScore)
          resolve()
        })
      },
      addCard ({ dispatch }, dados) {
        let key = firebase.database().ref('cards').push().key
        dados.id = key
        firebase.database().ref('cards/' + key).set(dados, (erro) => {
          if (erro) {
            console.error(erro)
          } else {
            dispatch('getCards')
            .then(() => {
              dispatch('getScore')
            })
          }
        })
      },
      updateCard ({ dispatch }, dados) {
        firebase.database().ref('cards/' + dados.id)
          .set(dados, (erro) => {
            if (erro) {
              console.error(erro)
            } else {
              dispatch('getCards')
                .then(() => {
                  dispatch('getScore')
                })
            }
          }
          )
      },
      deleteCard ({ dispatch }, id) {
        firebase.database().ref('cards/' + id)
          .set(null, (erro) => {
            if (erro) {
              console.error(erro)
            } else {
              dispatch('getCards')
              .then(() => {
                dispatch('getScore')
              })
            }
          }
          )
      },
      getTimes ({ commit }) {
        return new Promise((resolve) => {
          firebase.database().ref('times').on('value', (snapshot) => {
            commit('updateTimes',
              Object.values(snapshot.val()).reverse()
            )
            resolve()
          })
        })
      },
      addTime ({ dispatch }, dados) {
        let key = firebase.database().ref('times').push().key
        dados.id = key
        firebase.database().ref('times/' + key).set(dados, (erro) => {
          if (erro) {
            console.error(erro)
          } else {
            dispatch('getTimes')
          }
        })
      },
      updateTime ({ dispatch }, dados) {
        firebase.database().ref('times/' + dados.id)
          .set(dados, (erro) => {
            if (erro) {
              console.error(erro)
            } else {
              dispatch('getTimes')
            }
          }
          )
      },
      deleteTime ({ dispatch }, id) {
        firebase.database().ref('times/' + id)
          .set(null, (erro) => {
            if (erro) {
              console.error(erro)
            } else {
              dispatch('getTimes')
            }
          }
          )
      }
    },
    getters: {
      logado (state) {
        return state.logado
      },
      cards (state) {
        return state.cards
      },
      times (state) {
        return state.times
      },
      score (state) {
        return state.score
      }
    }
  })

  return Store
}
