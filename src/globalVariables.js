
export default
{
    "clientCredentials" : {
        apiKey: "AIzaSyDfywl2EI9FFLybwH42LZRhJwdi-W3RK28",
        authDomain: "damdam-c80fb.firebaseapp.com",
        databaseURL: "https://damdam-c80fb.firebaseio.com",
        projectId : "damdam-c80fb",
        storageBucket: "damdam-c80fb.appspot.com",
        messagingSenderId: "245002059595"
        },
    "colors" : {

        //hard coded app colors

        fixedAppColor_1 : "#000", //black - buttons and stuff
        fixedAppColor_2 : "#4caf50", //green light - for sending check request and stuff
        fixedAppColor_3 : "#e53935", //red - for cancelling and stuff
        fixedAppColor_4 : "#000", // white - for text color on colory things
        fixedAppColor_5 : "#4caf50", //dark green

            //text colors
        fixedAppColor_text_1 : "#000", //black
        fixedAppColor_text_2 : "#313131", //grey-dark
        fixedAppColor_text_3 : "#616161", //grey-light
        fixedAppColor_text_4 : "#fff", //white
            //background colors
        fixedAppColor_background_1 : "#000", //black
        fixedAppColor_background_2 : "#424242", //grey
        fixedAppColor_background_3 : "#4caf50", //dark green
        fixedAppColor_background_4 : "#e53935", //red
        fixedAppColor_background_5 : "#fafafa", //grey-white
            //filter color
        fixedAppColor_filter : "rgba(0,0,0,0.6)",

    },
    "pictures" : [
        "dessert.png",
        "fastfood.png",
        "spagetti.png"
    ],
    "options" : {
        //hard coded app colors
        colors : {
            dynamicAppColor_mainThemeColor : "#000",
            dynamicAppColor_mainTheme_textColor : "#fff",
            dynamicAppColor_helperThemeColor : "#f38000",
            dynamicAppColor_helperTheme_textColor : "#000",
        },

        bannerCover : {
            "exists" : true,
            "color" : "#fff",
            "opacity" : 0.5
        },
        bannerImage : {
            "heightRatio" : 85
        },
        languages : [ //the languages selected by restaurant
            "turkish",
            "english"
        ]
    },

}