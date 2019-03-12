
var axios = require("axios")
import apiList from "../apiList.js"


export default {

    getRestaurantSettings(context){
        context.commit("addProcess",null,{root:true})
        return new Promise((_res,_rej)=>{
            axios.post(apiList.getRestaurantSettings).then(res=>{
                if(res.data.restaurantSettings){
                    context.commit("removeProcess",null,{root:true})
                    context.commit("updateRestaurantSettings",res.data.restaurantSettings)
                    _res()
                }
            })
        })
    }
    
}