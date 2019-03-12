var axios = require("axios")
import apiList from "../../apiList.js"

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
            var orderDate = Date.now();

            return new Promise((res,rej)=>{
                //for developing purposes 
                var orderPackUid = context.rootState.uid()
                setTimeout(()=>{
                    for(let order of context.state.plate){
                        //for notification stuff
                        context.commit("pushToTrackingOrders",Object.assign({},
                                order,
                                {
                                    orderType : "productRequest",
                                    isSeen:false,
                                    orderPackUid,
                                    orderDate,
                                    orderUid : context.rootState.uid(),                            
                                }
                            
                            )
                        )
                    }

                    //for ordernote
                    if(context.state.orderNote !== ""){
                        context.commit("pushToTrackingOrders",{
                            orderType : "orderNote",
                            orderNote : context.state.orderNote,
                            orderDate,
                            isSeen : false,
                            orderPackUid,
                            orderUid : context.rootState.uid()                                
                        })
                    }  

                    //clear ordernote
                    context.commit("updateOrderNote","")

                    context.commit("clearPlate")

                    context.commit("removeProcess",null,{root:true})
                    res()

                },1000)
            })
        },
        sendSpecialRequest(context,specialRequestContent){
            context.commit("addProcess",null,{root:true})
            var orderDate = Date.now()
            
            return new Promise((res,rej)=>{
                //for developing purposes
                var orderPackUid = context.rootState.uid()
                setTimeout(() => {
                    context.commit("pushToTrackingOrders",{
                        orderType : "specialRequest",
                        specialRequestContent,
                        orderDate,
                        isSeen : false,
                        orderPackUid,
                        orderUid : context.rootState.uid(),
                    })

                    context.commit("removeProcess",null,{root:true})

                    res();

                }, 1000);
            })
        },

        sendCheckRequest(context){
            context.commit("addProcess",null,{root:true})
            var orderDate = Date.now()

            return new Promise((res,rej)=>{
                //for developing purposes
                var orderPackUid = context.rootState.uid()
                setTimeout(()=>{
                    context.commit("pushToTrackingOrders",{
                        orderType : "checkRequest",
                        orderDate,
                        isSeen : true,
                        orderPackUid,
                        orderUid : context.rootState.uid()
                    })

                    context.commit("removeProcess",null,{root:true})

                    res()
                },1000)
            })
        },

        handlePlateChange(context,newOrder){
            var existingOrders = context.state.plate
            
            return new Promise((_res,_rej)=>{
                console.log("helllll")
                axios.post(apiList.handlePlateChange,{newOrder, existingOrders}).then(res=>{
                    console.log(res.data)
                })
            })
        }
    }
}

//helper Functions
function areTwoOrdersEqual(_order,order){
    if(_order.product.productUid === order.product.productUid){
        //check options
        if(getDefaultTitle(_order.selectedOption.option).content === getDefaultTitle(order.selectedOption.option).content){
            //check extras
            //check length
            if(_order.selectedExtras.length === order.selectedExtras.length){
                //check content
                var areEqual = true
                _order.selectedExtras.forEach(extra=>{
                    var exists = order.selectedExtras.find(selectedExtra=>{return getDefaultTitle(selectedExtra.productExtraName).content === getDefaultTitle(extra.productExtraName).content})
                    if(!exists)
                        areEqual = false
                })
                return areEqual
            }
        }
    }
}


function getDefaultTitle(titles){
    return titles.find(title=>{return title.languageName  === 'turkish'})
}