
//EXPORTING MODULE

export default {
    namespaced: true,
    state : {
        plate : [],
        orderNote : ""
    },
    mutations:{
        pushToPlate(state,order){
            //first check if the same kind does exists
            var didFind = false
            state.plate.forEach(_order=>{
                //check product equality
                if(areTwoOrdersEqual(_order,order)){
                    //setting flag
                    didFind = true
                    //now increment the ordercount by 1
                    _order.orderCount ++;
                }
            })
            if(!didFind)
                state.plate.push(order)
        },
        removeFromPlate(state,order){
            var counter = 0;
            for(let _order of state.plate){
                if(areTwoOrdersEqual(_order,order)){
                    state.plate.splice(counter,1)  
                    return
                }
                counter++
            }
        },
        clearPlate(state){
            state.plate = [];
        },
        updateOrderNote(state,newValue){
            state.orderNote = newValue
        }
    },
    actions : {

    }
}

//helper Functions
function areTwoOrdersEqual(_order,order){
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
                return areEqual
            }
        }
    }
}