import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

const uuid = require("uuid/v4")

//untracked global variables that changes machine to machine(developing period)
import globalVariables from "./globalVariables.js"

//importing materialize css and javascript
import "materialize-css/dist/css/materialize.min.css"
import "materialize-css/dist/js/materialize.min.js"

//for modals
 import MicroModal from 'micromodal'

//swiper
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"

window.Swiper = Swiper

 window.MicroModal = MicroModal

//myAlert.css
//attaching functions to window object --> hence reachable anywhere
import "../public/js/myPreloader.js"
//color blending function
import "../public/js/myColor.js"

//myUtility.scss
import "../public/css/myUtility.scss"
//flexbox grid system additional to shity materialize grid system
import "../public/css/myGrid.css";
//myToolTip css
import "../public/css/myToolTip.css"

//mixin - mainly for global data
Vue.mixin({
  data : function() {
    return {
      //uuid
      uid : uuid,
      //untrackedGlobalVariables
      globalVariables,
      Vue
    }
  }
})

Vue.config.productionTip = false

Vue.use(VueRouter)


new Vue({
  render: h => h(App),
}).$mount('#app')
