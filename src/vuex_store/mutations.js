
export default {

    updateUIDGenerator(state,generator){
        state.uid = generator;
    },
    updateRemSizeInPx(state,remSize){
        state.remSize = remSize
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
        if(state.gadget_waitingScreen.onGoingProcessCount < 0)
            state.gadget_waitingScreen.onGoingProcessCount =0

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

    updateRestaurantSettings(state,restaurantSettings){
        state.restaurantSettings = restaurantSettings
    },

    //language
    updatePreferredLanguage(state,language){
        state.preferredLanguage_asString = language
        state.preferredLanguage = state.languages[language]
    },    

    //push to route history
    pushToRouteHistory(state,history){
        
        state.routeHistory.push(history)

        if(state.routeHistory.length>5)
             state.routeHistory.shift()
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
    allScreen.style.position = "fixed";
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