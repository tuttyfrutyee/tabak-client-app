<template>
  <div id="app">
    <transition :name="calculatedTransition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

//Vuex store
import store from "./vuex_store/index.js";

//Routing

import VueRouter from 'vue-router'



import Login from "./components/Login.vue"
import Categories from "./components/Categories.vue"
import SubCategories from "./components/SubCategories.vue"
import Product from "./components/Product.vue"

const routes = [
  {
    path : "/login",
    component : Login
  },
  {
    path : "/categories",
    component : Categories
  },
  {
    path : "/subCategories",
    component : SubCategories
  },
  {
    path : "/product",
    component : Product
  }
]


var router = new VueRouter({mode: 'history',routes});

//For vuex store, mapState and mapActions
//Info : mapAction and mapMutations both inserted in methods block
import { mapActions, mapMutations, mapState } from "vuex";



export default {
  name: 'app',
  components: {
  },
  store,
  router,
  computed : {
    //mapState
    ...mapState([
      "calculatedTransition"
    ])
  },
  methods : {
    handleRouteChange(to,from){

      //transitionTable is polarized, to access it transitionTable[to][from] --> FIRST refer to "to" then "from"
      var transitionTable = {
        "login" : {
          //no such operation occurs
        },
        "categories" : {
          "login" : "slideLeft"
        },
        "subCategories" : {
          "categories" : "slideLeft"
        },
        "product" : {
          "subCategories" : "slideLeft"
        },
        "tabak" : {

        }
      }

      this.updateCalculatedTransition( transitionTable[to][from] )

    },
    //mapMutations
    ...mapMutations([
      "update_http",
      "updateCalculatedTransition"
    ]),
    //mapActions
    ...mapActions([
      "getFirestoreClientPowers"
    ]),
    ...mapActions("moduleCategories",[
      "watchCategories"
    ])
  },
  created(){
    //connect to firestore
    this.getFirestoreClientPowers().then(()=>{
      this.watchCategories();
    })

    this.update_http(this.$http)

  },
  watch : {
  '$route' (to, from) {

    to = to.path.slice(1) //removes / from /routePath --> does not work for multiple depth
    from = from.path.slice(1)

    this.handleRouteChange(to,from)
  }
  },
  mounted(){
    this.$router.push("/login")

/*     console.log(screen.height,window.height,document.documentElement.clientHeight)
    this.$store.dispatch("debug",{
      "screen-height" : screen.height,
      "client-height" : document.documentElement.clientHeight
    }) */

  }
  
}
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slideLeft-enter-active {

  transition: all .4s;
}
.slideLeft-leave-active {
  transition: all .4s;
}
 .slideLeft-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform : translate(-100%);
}
.slideLeft-enter-to{
  transform : translate(0);
}
.slideLeft-enter {
  transform : translate(100%)
}
</style>
