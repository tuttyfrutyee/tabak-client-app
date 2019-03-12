var axios = require("axios")
import globalVariables from "./globalVariables"
var serverAddress = globalVariables.serverAddress

axios.defaults.withCredentials = true

console.log(serverAddress)

export default {

    getRestaurantSettings : serverAddress + "/getRestaurantSettings_asClient",

    getProducts : serverAddress + "/getProducts",

    getConnections : serverAddress + "/getConnections",

    handlePlateChange : serverAddress + "/handlePlateChange",

    /*
        params : {anything to be consoled to server terminal}
    */
    debug : serverAddress + "/debug",


}