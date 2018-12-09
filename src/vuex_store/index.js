import Vue from "vue";
import Vuex from "vuex"
import main_actions from "./actions.js";
import main_mutations from "./mutations.js";


Vue.use(Vuex);

//untracked global variables that changes machine to machine(developing period)
import untrackedGlobalVariables from "../untrackedGlobalVariables.json"

export default new Vuex.Store({
    state : {
        //global variables
        uTGlobalVariables : untrackedGlobalVariables,
        //shared firestore // it does not matter
        firestore : null,
        //http requests from vuex files
        http : null,
        //waiting screen gadget
        gadget_waitingScreen : {
            onGoingProcessCount : 0,
            waitingScreen : null,
        },

        //login stuff
        userIsLoggedIn_toFirestoreRestaurant : false,

        //restaurant datebase,
        r_app : null,
        r_db : null,
        r_auth : null,
    },
    mutations : main_mutations,
    actions :   main_actions,
    modules : {

        
    }
})