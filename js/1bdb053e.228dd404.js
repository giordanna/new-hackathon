(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["1bdb053e"],{8041:function(t,e,i){"use strict";var n=i("cddb"),r=i.n(n);r.a},"8b24":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"docs-input row justify-center",attrs:{padding:""}},[i("q-page",[i("h6",[t._v("Time 1: "+t._s(t.score))]),i("br"),i("q-progress",{attrs:{percentage:t.score/t.total*100,color:"warning",animate:"",stripe:"",height:"20px"}}),i("br"),i("h6",[t._v("Time 2: 100")]),i("br"),i("q-progress",{attrs:{percentage:100/t.total*100,color:"info",animate:"",stripe:"",height:"20px"}}),t._l(t.cards,function(e){return i("q-card",{key:e.id,staticClass:"q-ma-sm",staticStyle:{width:"300px"},attrs:{inline:"",color:"secondary",dark:""}},[i("q-card-title",[t._v("\n        "+t._s(e.titulo)+"\n        "),i("span",{attrs:{slot:"subtitle"},slot:"subtitle"},[t._v(t._s(e.subtitulo))]),i("q-icon",{attrs:{slot:"right",name:e.checkout?"check_circle":"alarm"},slot:"right"})],1),i("q-card-main",[t._v("\n        "+t._s(e.pontuacao)+" pontos\n      ")]),i("q-card-separator"),i("q-card-actions",[i("q-btn",{attrs:{flat:"",disabled:e.checkout},nativeOn:{click:function(i){t.finalizar(e)}}},[t._v("Feito")]),i("q-btn",{attrs:{flat:""},nativeOn:{click:function(i){t.$router.push("/cards/"+e.id)}}},[t._v("Editar")]),i("q-btn",{attrs:{flat:""},nativeOn:{click:function(i){t.excluir(e.id)}}},[t._v("Excluir")])],1)],1)})],2)],1)},r=[];n._withStripped=!0;var a={name:"PageIndex",computed:{cards:function(){return this.$store.getters.cards},score:function(){return this.$store.getters.score},total:function(){var t=0;return this.cards.map(function(e){return t+=e.pontuacao}),console.log(t),t}},mounted:function(){var t=this;this.$store.dispatch("getCards").then(function(){t.$store.dispatch("getScore")})},methods:{finalizar:function(t){this.$store.dispatch("updateCard",{id:t.id,titulo:t.titulo,subtitulo:t.subtitulo,pontuacao:t.pontuacao,checkout:!0})},excluir:function(t){this.$store.dispatch("deleteCard",t)}}},s=a,o=(i("8041"),i("2877")),c=Object(o["a"])(s,n,r,!1,null,null,null);c.options.__file="Index.vue";e["default"]=c.exports},cddb:function(t,e,i){}}]);