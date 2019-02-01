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
            backgroundColor : "rgba(100,0,0,0.4)"
        },
        {
            name : "english",
            localName : "İngilizce",
            flagImageUrl : "englishFlag.png",
            backgroundColor : "rgba(0,0,100,0.4)"
        },
    ],
    
}
