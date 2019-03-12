import Vue from "vue";
import Vuex from "vuex"
import main_actions from "./actions.js";
import main_mutations from "./mutations.js";
import main_getters from "./getters.js"


Vue.use(Vuex);

//untracked global variables that changes machine to machine(developing period)
import globalVariables from "../globalVariables.js"

//modules
import moduleCategories from "./modules/moduleCategories"
import moduleSubCategories from "./modules/moduleSubCategories"
import moduleProduct from "./modules/moduleProduct"
import modulePlate from "./modules/modulePlate"

import moduleAnimations from "./modules/moduleAnimations"

//language 
import languages from "../languages"

export default new Vuex.Store({
    state : {
        Vue,
        globalVariables,
        //waiting screen gadget
        gadget_waitingScreen : {
            onGoingProcessCount : 0,
            waitingScreen : null,
        },
        //animation tracker
        calculatedTransition : "nothing",
        //the calculated remsize for the device
        remSize : null,

        //language
        languages,
        preferredLanguage_asString : "turkish",
        preferredLanguage : languages["turkish"], //preselecting

        //restaurantSettings
        restaurantSettings : null,

        //route
        routeHistory : [],
    },
    mutations : main_mutations,
    actions :   main_actions,
    getters : main_getters,
    
    modules : {
        moduleCategories,
        moduleSubCategories,
        moduleProduct,
        modulePlate,

        moduleAnimations,
    }
})