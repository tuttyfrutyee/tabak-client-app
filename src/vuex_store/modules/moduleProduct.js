
//EXPORTING MODULE

export default {
    namespaced: true,
    state : {
        selectedProduct : null,
        //for orderSettingsMode
        orderSelectedToBeChanged : [],
    },
    mutations:{
        updateProduct(state,product){
            state.selectedProduct = product
        },
        updateOrderSelectedToBeChanged(state,orders){
            state.orderSelectedToBeChanged = orders
        }
    },
    actions : {
        selectProduct(context,product){
            context.commit("updateProduct",product)
        },
        pushToPlate(context,order){
            if(context.state.selectedProduct)
            context.commit("modulePlate/pushToPlate",{order},{root:true})
        }
    }
}

//helper Functions