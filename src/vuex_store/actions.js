var firebase = require("firebase/app");
require("firebase/auth")
require("firebase/firestore")
require("firebase/storage")
require("firebase/functions")
var uuid = require("uuid/v4")

var apiList = require("../apiList.js")


export default {

    //init secondary firestore project ( restaurant )
    setFirestoreForSelectedRestaurant(context,fromConfig){

        //only for developin code below is omitted, since incoming fromConfig is already an object
/*         try{
            fromConfig = eval(
                "({" + fromConfig + "})"
              );
        }catch(err){
            return console.log(err)
        } */

        
        var restaurantApp = firebase.initializeApp(fromConfig, uuid())

      

        var restaurant_db = restaurantApp.firestore()

        var restaurant_auth = restaurantApp.auth();

        restaurant_db.settings({
            timestampsInSnapshots: true
          });
  

        //committing mutations
        context.commit("update_rApp",restaurantApp)
        context.commit("update_rDb",restaurant_db);
        context.commit("update_rAuth",restaurant_auth);

    },

    getFirestoreClientPowers(context){

        return new Promise((resolve,rej)=>{
            context.dispatch("setFirestoreForSelectedRestaurant",context.state.globalVariables.clientCredentials)
            console.log("got the client powers honn")
            resolve();

            //for developin purposes just use the hardcoded clientCredentials
            /*
                Normally, user is already logged in to server with the query from qr code,
                but user has to request the client credentials and the token with it to do operations
                First user init the firestoreForSelectedRestaurant and then use the token to access client powers
                For developin purposes, in order to not to mess up with server right now, will use hard coded
                client credentials and not even use token, since all firestore security rules are not set yet
            */
/*             context.state.http
              .post(context.state.uTGlobalVariables.localNetworkIp+"/createTokenForAdminLogin")
              .then(res => {  
                if(!res.body.err)
                context.state.t_auth
                  .signInWithCustomToken(res.body)
                  .then(() => {
                    context.commit("removeProcess");
                    resolve({success:true})
                  })
                  .catch(err => {
                    context.commit("removeProcess")
                    rej(err)
                  });
                
                else{
                  context.commit("removeProcess");
                  rej(res.body.err)
                }
    
              }) */
        })

    },
    debug(context,content){
        context.rootState.http.post(apiList.debug,content)
    }
    
}