
//EXPORTING MODULE

export default {
    namespaced: true,
    state : {
        categories : null,
        isWatchingCategories : false,
        selectedCategory : null,
    },
    mutations:{
        updateCategories(state,categories){
            state.categories = categories
        },
        updateIsWatchingCategories(state,boolean){
            state.isWatchingCategories = boolean
        },
        updateSelectedCategory(state,category){
            state.selectedCategory = category
        },

    },
    actions : {
        watchCategories(context){
            if(context.state.isWatchingCategories)
            return
            context.commit("updateIsWatchingCategories",true);

            context.commit("addProcess",null,{root:true})

            context.rootState.r_db.collection("productCategories").onSnapshot(querySnapShot=>{

                var categories = [];
                querySnapShot.forEach(doc=>{
                    categories.push(doc.data())
                })
                context.commit("updateCategories",categories)
                context.commit("removeProcess",null,{root:true})

            })
        },
        selectCategory(context,category){
            context.commit("updateSelectedCategory",category)
            context.commit("moduleSubCategories/updateSubCategories",category.subCategories,{root:true})
        }
    }
}

//helper Functions