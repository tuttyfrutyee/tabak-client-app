import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueResource from 'vue-resource'

const uuid = require("uuid/v4")

//untracked global variables that changes machine to machine(developing period)
import untrackedGlobalVariables from "./untrackedGlobalVariables.json"
import globalVariables from "./globalVariables.json"

//importing materialize css and javascript
import "materialize-css/dist/css/materialize.min.css"
import "materialize-css/dist/js/materialize.min.js"
//icons
import "material-design-icons/iconfont/material-icons.css"

//myAlert.css
//attaching functions to window object --> hence reachable anywhere
import myPreloader from "../public/js/myPreloader.js"

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
      uuid,
      //untrackedGlobalVariables
      uTGlobalVariables : untrackedGlobalVariables,
      globalVariables,
    }
  }
})

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.interceptors.push((request,next)=>{
  request.credentials = true;
  next();
})

new Vue({
  render: h => h(App),
}).$mount('#app')
