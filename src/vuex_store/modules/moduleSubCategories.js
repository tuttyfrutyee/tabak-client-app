
//EXPORTING MODULE

export default {
    namespaced: true,
    state : {
        subCategories : null,
    },
    mutations:{
        updateSubCategories(state,subCategories){
            state.subCategories = subCategories
        },

    },
    actions : {

    }
}

//helper Functions