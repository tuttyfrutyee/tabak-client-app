


export default {
    dynamicColors : state => {
        if(state.restaurantSettings)
        return state.restaurantSettings.dynamicColors
    },
    languagesSupported : state =>{
        if(state.restaurantSettings)
        return state.restaurantSettings.languagesSupported
    },
    bannerImage : state =>{
        if(state.restaurantSettings)
        return state.restaurantSettings.bannerImage
    }
}