
export default {

    changeActiveComponent(state,componentName){
        clearAllComponents(state.componentIsActive); 
        state.componentIsActive[componentName] = true
    },

    update_uTGlobalVariables(state,variables){
        state.uTGlobalVariables = variables
    },
    //change userIsLoggedIn
    update_userIsLoggedIn_toFirestoreRestaurant(state,bool){
        state.userIsLoggedIn_toFirestoreRestaurant = bool;
    },

//firestore helpers updates
    //update tabak firestore helpers

    //update restaurant firestore helpers
    update_rApp(state,app){
        state.r_app = app;
    },
    update_rDb(state,db){
        state.r_db = db;
    },
    update_rAuth(state,auth){
        state.r_auth = auth;
    },

    //update shared firestore
    update_firestore(state,firestore){
        state.firestore = firestore
    },
    update_http(state,http){
        state.http = http
    },

    updateUUIDGenerator(state,generator){
        state.uuid = generator;
    },

    //waiting screen --> process changers

    addProcess(state){
        //increase the count of process
        state.gadget_waitingScreen.onGoingProcessCount += 1;
        //if there is not any waiting screen add one
        if(!state.gadget_waitingScreen.waitingScreen){
            state.gadget_waitingScreen.waitingScreen = addWaitingScreen();
        }
    },
    removeProcess(state){
        //decrease the count of process
        state.gadget_waitingScreen.onGoingProcessCount -= 1;
        //if there is waiting screen and process count is 0 remove waiting screen
        if(state.gadget_waitingScreen.waitingScreen && state.gadget_waitingScreen.onGoingProcessCount === 0){
            removeWaitingScreen(state.gadget_waitingScreen.waitingScreen);
            state.gadget_waitingScreen.waitingScreen = null;
        }
    },
    changeThemeColor(state,color){
        var metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", color);

    },
    updateCalculatedTransition(state,value){
        state.calculatedTransition = value
    },

    //helpers

    updateBackgroundCard(state,details){

        var operation = details.operation
        var element = document.getElementById(details.elementId);
        var change = details.change

        element.style[operation] = change
    }

    
}


//helpers

//screen
function createScreen() {
    var allScreen = document.createElement("div");
    allScreen.style.width = "100vw";
    allScreen.style.height = "100vh";
    allScreen.style.position = "absolute";
    allScreen.style.top = "0px";
    allScreen.style.zIndex = 1000;
    return allScreen;
  }
  function addWaitingScreen() {
    var screen = createScreen();
    document.body.appendChild(screen);
    myPreloader.activatePreloaderAt(screen, "big");
    return screen;
  }
  function removeWaitingScreen(screen) {
    myPreloader.deActivatePreloaderAt(screen);
    document.body.removeChild(screen);
  }

//component management
  function clearAllComponents(componentListObject){

    for(var component in componentListObject){
        componentListObject[component] = false
    }
}