<template>
  <div id="banner" class="z-indexHigh z-depth-1">
      <div :style="{backgroundColor:dynamicColors.mainThemeColor.background}" class="row noMargin" style="height:3.6rem;" >


        <div v-if="isInSubCategories" @click="goBack()" class="col s2 beRelative fullHeight">
          <div :style="{backgroundColor:globalVariables.colors.fixedAppColor_background_2}" class="beAbsolute centerInHeight" style="left:3vmin;width:1.6rem;height:1.6rem;border-radius:50%">
            <div class="beRelative fullHeight fullWidth">
              <i class="beAbsolute centerInCenter material-icons tColorWhite fontSMedium_R">&#xe5cb</i>
            </div>
          </div>
        </div>

        <div v-if="languagesSupported.length>1&&!isInSubCategories" data-micromodal-trigger="modal-language" class="col s2 beRelative fullHeight noPadding">
          <!--Language Flag-->
          <div v-for="language in languages.supportedLanguages" style="display:contents" :key="language.name">
              <div v-if="preferredLanguage_asString===language.name" :style="{backgroundColor:language.backgroundColor}" class="beAbsolute fullWidth fullHeight" style="right:0;top:0"></div>
              <img v-if="preferredLanguage_asString===language.name" :src="getImg(language.flagImageUrl)" class="beAbsolute centerInCenter z-indexLow" style="max-height:70%;max-width:70%">
          </div>
        </div>

        <!--For placeholder-->
        <div v-if="(languagesSupported.length===1&&!isInSubCategories)" class="col s2"></div>

        <div class="col s8 beRelative fullHeight">
          <img class="centerInCenter beAbsolute" :style="{height: bannerImage.heightRatio + '%'}" style="z-index:2" :src="getImage(bannerImage.bannerImageRelativeUrl)" alt="">
          <div v-if="bannerImage.overlay.doesExist" class="beAbsolute centerInCenter fullHeight" style="width:80%;z-index:1;border-radius:2px" :style="{backgroundColor: bannerImage.overlay.color, opacity: bannerImage.overlay.opacity / 100}"></div>
        </div>

        <div id="plate" :style="{backgroundColor: dynamicColors.mainThemeColor.background}" :class="{'beFixed':isInSubCategories,'beRelative':!isInSubCategories}" @click="navigateToPlate" class="right overFlowVisible z-indexHigh z-depth-2" style="right:0.1rem;top:0.1rem;height:3.2rem;width:3.2rem;border-radius:50%">
          <div style="height:76%"  class="beAbsolute centerInCenter">
            <img id="tabakIcon" class="fullHeight animated" src="../assets/tabakIcon.png" >
            <div v-if="plate.length>0" class="beAbsolute" style="right:15%;bottom:15%;height:1.2rem;width:1.2rem">
              <div class="beRelative fullWidth fullHeight" :style="{backgroundColor: dynamicColors.helperThemeColor.background}" style="border-radius:50%">
                  <div :style="{color: dynamicColors.helperThemeColor.text}" class="beAbsolute centerInCenter boldFont fontSVSmall_R noPadding" style="line-height:normal">{{plate.length}}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Modal Structure -->
      <div class="_modal micromodal-slide z-indexHigh" id="modal-language" aria-hidden="true">
        <div class="modal__overlay" data-micromodal-close>
          <div class="modal__container noPadding" aria-modal="true" aria-labelledby="modal-language-title">


              <div class="fullWidth borderBox borderRadius_toTop beRelative" :style="{backgroundColor: dynamicColors.mainThemeColor.background}">
                <div :style="{color: dynamicColors.mainThemeColor.text}" class="center semiBold fontSSmall_R" style="padding:0.3rem">{{preferredLanguage.banner.languagePreference.title}}</div>
                <i data-micromodal-close class="material-icons beAbsolute centerInHeight tColorWhite" :style="{color: dynamicColors.mainThemeColor.text}" style="right:8px">&#xe5cd</i>
              </div>

              <div class="row noMargin">

                <div v-for="(availableLanguage,index) in availableLanguages" @click="updatePreferredLanguage(availableLanguage.name)" :class="{borderToRight:index%2===0}" class="col s6" style="height : 17vmax">
                  <div class="fullWidth beRelative">

                     <img :src="getImg(availableLanguage.flagImageUrl)" class="beAbsolute centerInWidth z-indexLow" style="top:1vmax;max-height:6vmax;max-width:70%">

                  </div>
                  <div class="fullWidth beRelative" style="height : 10vmax">
                      
                      <div class="beAbsolute centerInWidth semiBold fontSSmall_R" style="bottom:-1vmax">{{availableLanguage.localName}}</div>

                  </div>
                  <div class="fullWidth beRelative" style="height: 6vmax">

                    <i v-if="preferredLanguage_asString===availableLanguage.name" class="material-icons beAbsolute centerInCenter fontSLarge_R">radio_button_checked</i>
                    <i v-else class="material-icons beAbsolute centerInCenter fontSLarge_R">radio_button_unchecked</i>

                  </div>
                </div>

              </div>

          </div>
        </div>
      </div>        

  </div>
</template>

<script>
//For vuex store, mapState and mapActions
//Info : mapAction and mapMutations both inserted in methods block
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import languages from '../languages';

export default {
  name: 'banner',
  data(){
    return {

    }
  },
  methods : {
    navigateToPlate(){
      this.$router.push("/plate")
    },
    goBack(){
      this.$router.go(-1)
    },
    animatePlate(){
      var plate = document.getElementById("tabakIcon")
      plate.classList.remove("wiggle")
      this.Vue.nextTick(()=>{
         plate.classList.add("wiggle")
      },0)
    },
    setPlateHeight_whenScroll(){

      if(!this.isInSubCategories) //only for subCategories
        return 

      var scrollAmount = window.scrollY

      var minPlateHeight = 3.2 //in rem
      var maxPlateHeight = 4 // in rem

      var startPoint = 2 // in rem
      var limitScroll = 5 //rem //for performance

      //check if limit has been reached and did not passed lots( to enhance performance )
      if((scrollAmount > (limitScroll * this.remSize )))
          return
                   
      var plate = document.getElementById("plate")

      if(!plate) return

      if(scrollAmount > startPoint * this.remSize){
        plate.classList.add("getBig")
      }else{
        plate.classList.remove("getBig")       
      }


      
    },
    getImg(pic){
      //for developing purposes
      var images = require.context('../assets/', false, /\.png$/)
      return images('./' + pic)      
    },

    getImage(relativeUrl){
      return this.globalVariables.serverAddress + relativeUrl
    },
    
    //styles and classes
    //mapMutations and mapActions
    ...mapMutations([
      "updatePreferredLanguage"
    ]),
    ...mapActions("moduleAnimations",[
      "removeTodoAnimation"
    ])
  },
  computed : {
    immediateIconAnimation_required(){
      return this.todo_animations.immediate.icon
    },
    isInSubCategories(){
      return this.$route.path.includes("subCategories")
    },
    availableLanguages(){
      return this.languages.supportedLanguages.filter(language => {
        return this.languagesSupported.includes(language.name)
      })
    },
    //mapState
    ...mapState([
      "remSize",
      "languages", //supported languages by tabak app
      "preferredLanguage",
      "preferredLanguage_asString"
    ]),
    ...mapState("modulePlate",[
      "plate"
    ]),
    ...mapState("moduleAnimations",[
      "todo_animations"
    ]),
    //mapGetters
    ...mapGetters([
      "dynamicColors",
      "languagesSupported",
      "bannerImage"
    ])
  },
  watch:{
    immediateIconAnimation_required(value){
      if(value){
        this.animatePlate()
        this.removeTodoAnimation({type:'immediate',name:'icon'})
      }
    }
  },
  created(){
   // window.addEventListener("scroll",this.setPlateHeight_whenScroll)
  },
  mounted(){
    //check for immediate animation duties
    if(this.todo_animations.lazy.icon){

    
      this.animatePlate()  

      
      this.removeTodoAnimation({type:'lazy',name:'icon'});
    }


    MicroModal.init();


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.borderToRight{
  border-right: 2px solid #cecece
}
#tabakIcon
{

}
.animated {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 0s;
}

         @-webkit-keyframes wiggle {
  0% { transform: skewX(0deg); }
  10% { transform: skewX(-18deg); }
  20% { transform: skewX(12deg); }
  30% { transform: skewX(-12deg); }
  40% { transform: skewX(9deg); }
  50% { transform: skewX(-8deg); }
  60% { transform: skewX(6deg); }
  70% { transform: skewX(-6deg); }
  80% { transform: skewX(4deg); }
  90% { transform: skewX(-2deg); }
  100% { transform: skewX(0deg); }
}

@keyframes wiggle {
  0% { transform: skewX(0deg); }
  10% { transform: skewX(-18deg); }
  20% { transform: skewX(12deg); }
  30% { transform: skewX(-12deg); }
  40% { transform: skewX(9deg); }
  50% { transform: skewX(-8deg); }
  60% { transform: skewX(6deg); }
  70% { transform: skewX(-6deg); }
  80% { transform: skewX(4deg); }
  90% { transform: skewX(-2deg); }
  100% { transform: skewX(0deg); }
}

.wiggle {
  -webkit-animation-name: wiggle;
  animation-name: wiggle;
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
}

.animated.wiggle {
  -webkit-animation-duration: 0.95s;
  animation-duration: 0.95s;
}
</style>
