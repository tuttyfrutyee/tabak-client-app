//importing languages
import english from "./languages/english"
import turkish from "./languages/turkish"

export default {
    english,
    turkish,
    supportedLanguages : [
        {
            name : "turkish",
            localName : "Türkçe",
            flagImageUrl : "turkishFlag.png",
            backgroundColor : "rgba(200,200,200,0.2)"
        },
        {
            name : "english",
            localName : "English",
            flagImageUrl : "englishFlag.png",
            backgroundColor : "rgba(200,200,200,0.2)"
        },
    ],
    
}
