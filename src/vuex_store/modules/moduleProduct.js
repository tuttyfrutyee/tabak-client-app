
//EXPORTING MODULE

export default {
    namespaced: true,
    state : {
        selectedProduct : null,
    },
    mutations:{
        updateProduct(state,product){
            state.selectedProduct = product
        }

    },
    actions : {
        selectProduct(context,product){
            context.commit("updateProduct",product)
        }
    }
}

//helper Functions