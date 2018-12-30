
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
            console.log(state.plate)
        },
        clearPlate(state){
            state.plate = [];
        }
    },
    actions : {

    }
}

//helper Functions