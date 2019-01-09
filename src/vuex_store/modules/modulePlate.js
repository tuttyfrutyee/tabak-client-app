
//EXPORTING MODULE

export default {
    namespaced: true,
    state : {
        plate : [],
        trackingOrders : [],
    },
    mutations:{
        pushToPlate(state,order){
            state.plate.push(order)
        },
        removeFromPlate(state,order){
            var removalIndex = state.plate.indexOf(order)
            state.plate.splice(removalIndex,1)
            console.log(removalIndex)
        },
        clearPlate(state){
            state.plate = [];
        }
    },
    actions : {

    }
}

//helper Functions