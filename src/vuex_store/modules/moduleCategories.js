var axios = require("axios")
import apiList from "../../apiList.js"

//EXPORTING MODULE

export default {
    namespaced: true,
    state : {
        categories : null,
        connections : null,
        selectedCategory : null,
    },
    mutations:{
        updateCategories(state,categories){
            state.categories = categories
        },
        updateConnections(state,connections){
            state.connections = connections
        },
        updateSelectedCategory(state,category){
            state.selectedCategory = category
        },

    },
    actions : {

        getProducts(context){
            context.commit("addProcess",null,{root:true})
    
            return new Promise((_res,_rej)=>{
                axios.post(apiList.getProducts).then(res=>{
                    if(res.data.products){
                        context.commit("removeProcess",null,{root:true})
                        context.commit("updateCategories",res.data.products.categories)
                    }
                })
            })
        },

        getConnections(context){
            return new Promise((_res,_rej)=>{
                axios.post(apiList.getConnections).then(res=>{
                    if(res.data.connections){
                        context.commit("updateConnections",res.data.connections)
                    }
                    console.log(res.data)
                })
            })
        },

        selectCategory(context,category){
            context.commit("updateSelectedCategory",category)
            context.commit("moduleSubCategories/updateSubCategories",category.subCategories,{root:true})
        }
    }
}

//helper Functions