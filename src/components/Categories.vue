<template>
  <div v-if="dynamicColors" id="categories" class="beAbsolute fullWidth minHeight_full fontF_OpenSans" style="top:0px;left:0px">
      <div id="background_categories" class="backgroundCard"></div>
      <banner></banner>
      
      <div class="container" style="margin-top:1rem">
        <div class="row">

          <!-- Modal Trigger -->
          <div v-if="restaurantSettings.appType==='menuAndOrder'" data-micromodal-trigger="modal-specialRequest" class="col10 offset-s1 categoryBorder waves-effect" style="height:3.1rem;margin-bottom:1rem">
            <div class="row noMargin fullHeight">
              <div class="col s8 valign-wrapper fullHeight">
                <p class="center noMargin fontSSmall_R" style="margin-left:20px!important;fullWidth">{{preferredLanguage.categories.specialRequest.title}}</p>
              </div>
              <div class="col s3 offset-s1 beRelative fullHeight">
                <img src="../assets/categoryIcons_fordeveloping/note.png" style="height:2rem" class="centerInCenter beAbsolute" alt="">
              </div>
            </div>
          </div>

          <!-- Modal Structure -->
          <div class="_modal micromodal-slide z-indexHigh" id="modal-specialRequest" aria-hidden="true">
            <div class="modal__overlay" data-micromodal-close>
              <div class="modal__container noPadding" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">

                  <div class="row noMargin borderRadius_toTop">
                    <div class="col s12 beRelative borderRadius_toTop" :style="{backgroundColor: dynamicColors.mainThemeColor.background, color: dynamicColors.mainThemeColor.text}">
                      <div class="center boldFont fontSSmall_R" style="padding:0.3rem">{{preferredLanguage.categories.specialRequest.title}}</div>
                      <i data-micromodal-close class="material-icons beAbsolute centerInHeight" :style="{color:globalVariables.colors.mainTextColor}" style="right:8px">&#xe5cd</i>
                    </div>
                    <div class="col s12">
                      <textarea v-model="specialOrderContent" id="customOrderInput" class="materialize-textarea boldFont fontSVSmall_R" :placeholder="preferredLanguage.categories.specialRequest.placeholder"></textarea>
                    </div>
                  </div>

                  <div class="row noMargin" style="height:2.3rem">
                    <div @click="_sendSpecialRequest($event)" class="col s5 offset-s7 fullHeight waves-effect beRelative" :style="{backgroundColor: dynamicColors.helperThemeColor.background}">
                      <div class="beAbsolute centerInCenter center boldFont" :style="{color: dynamicColors.helperThemeColor.text}" style="font-size:1rem">{{preferredLanguage.categories.specialRequest.actionTitle}}</div>
                    </div>
                  </div> 

              </div>
            </div>
          </div>          

          <div @click="_selectCategory(category)" v-for="category in categories" class="col10 offset-s1 categoryBorder addMarginT-S" style="height:4rem" :key="category.categoryUid">
            <div class="row noMargin fullHeight">
              <div class="col s8 valign-wrapper fullHeight">
                <p class="noMargin " style="font-size:1.1rem;margin-left:15px!important">{{wireTitle(category.categoryTitle).content}}</p>
              </div>
              <div class="col s3 offset-s1 beRelative fullHeight">
                <img :src="getImage(category.categoryIcon.iconImageRelativeUrl)" style="height:3.2rem" class="centerInCenter beAbsolute">
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

import Banner from "./Banner.vue"
import globalVariables from '../globalVariables';

export default {
  name: 'categories',
  components : {
    Banner
  },
  data(){
    return {
      specialOrderContent : "",
    }
  },
  computed : {
//mapStates
  ...mapState([
    "preferredLanguage",
    "preferredLanguage_asString",
    "restaurantSettings"
  ]),
  ...mapState("moduleCategories",[
    "categories"
  ]),
  //mapGetters
  ...mapGetters([
    "dynamicColors"
  ])
  },
  methods : {
    scream(){
      console.log("screammm")
    },
    _selectCategory(category){
      this.selectCategory(category)
      this.$router.push("/subCategories")
    },
    _sendSpecialRequest(element){

      if(this.specialOrderContent!==""){

        this.sendSpecialRequest(this.specialOrderContent).then(()=>{
         M.toast({html: this.preferredLanguage.categories.specialRequest.verifiyingMessage})
        })


        this.specialOrderContent = ""

        var modal = document.getElementById("modal-specialRequest")
        //fucking micromodal is broken with close rjrjrj
        //closing it manually
        modal.classList.remove("is-open")
        modal.setAttribute('aria-hidden', 'true');     
      }

    },

    getDefaultTitle(titles){
      return titles.find(title=>{return title.languageName  === 'turkish'})
    },    

    wireTitle(titles){
      return titles.find(title=>{return title.languageName === this.preferredLanguage_asString})
    },

    getImage(relativeUrl){
      return this.globalVariables.serverAddress + relativeUrl
    },

    //mapMutations
    //mapActions
    ...mapActions("moduleCategories",[
      "selectCategory",
    ]),
    ...mapActions("modulePlate",[
      "sendSpecialRequest"
    ])
  },
  created(){
  },
  mounted(){

    MicroModal.init();

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.categoryBorder{
    border : 1px solid rgba(0,0,0,0.13) !important;
    border-radius : 5px;
  box-shadow:0 3px 13px rgba(0,0,0,0.2);
}

.waves-effect{
  display : block;
}
</style>
