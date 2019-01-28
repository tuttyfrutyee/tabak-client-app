
//EXPORTING MODULE

export default {
    namespaced: true,
    state : {
        //plate part
        plate : [],
        orderNote : "",
        plateHashCode : null,
        //tracking part
        trackingOrders : [],
    },
    mutations:{
        //plate part
        pushToPlate(state,details){
            var order = details.order
            var insertionIndex = details.insertionIndex
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
            if(!didFind){
                if(insertionIndex)
                    state.plate.splice(insertionIndex, 0, order);
                else
                    state.plate.push(order)
            }
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
        },
        //tracking part
        pushToTrackingOrders(state,order){
            state.trackingOrders.push(order)
        },
        removeFromTrackingOrders(state,order){
            var counter = 0;
            for(let _order of state.trackingOrders){
                if(areTwoOrdersEqual(_order,order)){
                    state.trackingOrders.splice(counter,1)  
                    return
                }
                counter++
            }
        },
        markTrackingOrdersSeen(state,stuff){
            state.trackingOrders.forEach(trackingOrder=>{
                trackingOrder.isSeen = true
           })
        }

    },
    actions : {

        kickAndReplaceOrder(context,details){
            var order_willBeKicked = details.order_willBeKicked
            var orders_willReplace = details.orders_willReplace


            var indexOfTarget = context.state.plate.indexOf(order_willBeKicked)

            for(let order of order_willBeKicked){
                context.commit("removeFromPlate",order)
            }            
            for(let order of orders_willReplace){
                context.commit("pushToPlate",{order,insertionIndex : indexOfTarget})
            }

        },

        sendOrders(context){
            context.commit("addProcess",null,{root:true})

            return new Promise((res,rej)=>{
                //for developing purposes 
                var orderPackUid = context.rootState.uid()
                setTimeout(()=>{
                    for(let order of context.state.plate){
                        //for notification stuff
                        context.commit("pushToTrackingOrders",Object.assign({},order,{isSeen:false,orderPackUid}))
                    }
                    context.commit("clearPlate")

                    context.commit("removeProcess",null,{root:true})
                    res()
                },1000)
            })
        }
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