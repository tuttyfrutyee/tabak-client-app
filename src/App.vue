<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

//Vuex store
import store from "./vuex_store/index.js";

//Routing
import VueRouter from "vue-router"

import Login from "./components/Login.vue"

const routes = [
  {path : "/login", component : Login}
]

var router = new VueRouter({mode : "history", routes})

//For vuex store, mapState and mapActions
//Info : mapAction and mapMutations both inserted in methods block
import { mapActions, mapMutations, mapState } from "vuex";

import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'app',
  components: {
    HelloWorld
  },
  router,
  store,
  computed : {

  },
  methods : {
    //mapMutations
    ...mapMutations([
      "update_http"
    ]),
    //mapActions
    ...mapActions([
      "getFirestoreClientPowers"
    ])
  },
  created(){
    //connect to firestore
    this.getFirestoreClientPowers().then(()=>{
      this.$router.push("/login")
    })

    this.update_http(this.$http)
  },
  mounted(){

    console.log(screen.height,window.height,document.documentElement.clientHeight)
    this.$store.dispatch("debug",{
      "screen-height" : screen.height,
      "client-height" : document.documentElement.clientHeight
    })

  }
  
}
</script>

<style>

</style>
