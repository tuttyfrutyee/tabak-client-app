
//EXPORTING MODULE

export default {
    namespaced: true,
    state : {
        plate : [],
        trackingOrders : [],
    },
    mutations:{
        pushToPlate(state,order){
            //first check if the same kind does exists
            var didFind = false
            state.plate.forEach(_order=>{
                //check product equality
                if(_order.product.productUid === order.product.productUid){
                    //check options
                    if(_order.selectedOption.productOptionName === order.selectedOption.productOptionName){
                        //check extras
                        //check length
                        if(_order.selectedExtras.length === order.selectedExtras.length){
                            //check content
                            var areEqual = true
                            _order.selectedExtras.forEach(extra=>{
                                var exists = order.selectedExtras.find(selectedExtra=>{return selectedExtra.productExtraName === extra.productExtraName})
                                if(!exists)
                                    areEqual = false
                            })
                            if(areEqual){
                                //setting flag
                                didFind = true
                                //now increment the ordercount by 1
                                _order.orderCount ++;
                            }
                        }
                    }
                }
            })
            if(!didFind)
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