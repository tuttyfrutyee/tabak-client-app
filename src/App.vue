<template>
  <div :style="{color : globalVariables.colors.fixedAppColor_text_1}" id="app" class="minHeight_full">
      <router-view></router-view>
  </div>
</template>

<script>

//Vuex store
import store from "./vuex_store/index.js";

//Routing

import VueRouter from 'vue-router'



import Categories from "./components/Categories.vue"
import SubCategories from "./components/SubCategories.vue"
import Product from "./components/Product.vue"
import Plate from "./components/Plate.vue"

/* const Categories = () => import('./components/Categories.vue')
const SubCategories = () => import('./components/SubCategories.vue')
const Product = () => import('./components/Product.vue')
const Plate = () => import('./components/Plate.vue') */



const routes = [
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
  },
  {
    path : "/orderSettings",
    component : Product
  },
  {
    path : "/plate",
    component : Plate
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
      "calculatedTransition",
      "restaurantSettings"
    ])
  },
  methods : {
    handleRouteChange(to,from){

      //transitionTable is polarized, to access it transitionTable[to][from] --> FIRST refer to "to" then "from"
      var transitionTable = {

        "categories" : {
        },
        "subCategories" : {
         // "categories" : "slideLeft",
         // "product" : "slideRight"
        },
        "product" : {
        //  "subCategories" : "slideLeft"
        },
        "orderSettings" : {

        },
        "plate" : {
         // "subCategories" : "slideDown",
         // "categories" : "slideDown"
        }
      }

      this.updateCalculatedTransition( transitionTable[to][from] )

      this.pushToRouteHistory(to)

    },
    calculateRootFontSize(){

      var developingMode = false
      
      var width

      if(!developingMode)
        if(window.screen.width < window.screen.height)
          width = window.screen.width
        else
          width = window.screen.height
      else{
        if(window.innerWidth < window.innerHeight)
          width = window.innerWidth
        else
          width = window.innerHeight
      }

      var minFontSize = 12;
      var maxFontSize = 26;

      var maxSupportedWidthSize = 1000

      var calculatedFontSize = minFontSize + (maxFontSize - minFontSize) * (width / maxSupportedWidthSize)
      if(width > maxSupportedWidthSize)
        calculatedFontSize = maxFontSize

      var html = document.documentElement 

      html.style.fontSize = calculatedFontSize + 'px'

      //registering it into store
      this.updateRemSizeInPx(calculatedFontSize)

    },
    //mapActions
    ...mapActions([
      "getRestaurantSettings"
    ]),
    ...mapActions("moduleCategories",[
      "getProducts",
      "getConnections"
    ]),
    //mapMutations
    ...mapMutations([
      "updateCalculatedTransition",
      "updateUIDGenerator",
      "updateRemSizeInPx",
      "pushToRouteHistory",
      "changeThemeColor"
    ]),
  
  },
  created(){
    this.calculateRootFontSize()

    this.updateUIDGenerator(this.uid)

    this.getRestaurantSettings().then(()=>{
      console.log(this.restaurantSettings.dynamicColors.mainThemeColor.background)
      this.changeThemeColor(this.restaurantSettings.dynamicColors.mainThemeColor.background)
    })

    this.getProducts()    

    this.getConnections()

  },
  watch : {
  '$route' (to, from) {

    to = to.path.slice(1) //removes / from /routePath --> does not work for multiple depth
    from = from.path.slice(1)

    var knownPaths = [
      "categories",
      "subCategories",
      "plate",
      "product",
      "orderSettings"
    ]
    if(!knownPaths.includes(to) && this.restaurantSettings)
      return this.$router.push("/categories")
    
    this.handleRouteChange(to,from)
  },

  restaurantSettings(value){
    this.$router.push("/categories")
  }

  },
  mounted(){
    


  }
  
}
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */

/*-------------------  SlideLeft -------------------*/

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
/*-------------------  SlideRight ------------------- */
.slideRight-enter-active {

  transition: all .4s;
}
.slideRight-leave-active {
  transition: all .4s;
}
 .slideRight-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform : translate(100%);
}
.slideRight-enter-to{
  transform : translate(0);
}
.slideRight-enter {
  transform : translate(-100%)
}
/*-------------------  SlideDown ------------------- */

.slideDown-enter-active {

  transition: all 0.3s;
}
.slideDown-leave-active {
  transition: all 0.3s;
}
 .slideDown-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform : translate(0,0%);
}
.slideDown-enter-to{
  transform : translate(0,0);
}
.slideDown-enter {
  transform : translate(0,-100%)
}
</style>
