<template>
  <div id="categories" class="beAbsolute fullWidth minHeight_full" style="top:0px;left:0px">
      <div id="background_categories" class="backgroundCard"></div>
      <banner></banner>
      
      <div class="container" style="margin-top:3vh">
        <div class="row">

          <!-- Modal Trigger -->
          <div data-micromodal-trigger="modal-1" class="col10 offset-s1 categoryBorder waves-effect" style="height:60px;margin-bottom:20px">
            <div class="row noMargin fullHeight">
              <div class="col s6 valign-wrapper fullHeight">
                <p class="center noMargin" style="font-size:20px;margin-left:20px!important">Özel İstek</p>
              </div>
              <div class="col s3 offset-s3 beRelative fullHeight">
                <img src="../assets/categoryIcons_fordeveloping/note.png" style="height:35px" class="centerInCenter beAbsolute" alt="">
              </div>
            </div>
          </div>

          <!-- Modal Structure -->
          <div class="_modal micromodal-slide z-indexHigh" id="modal-1" aria-hidden="true">
            <div class="modal__overlay" data-micromodal-close>
              <div class="modal__container noPadding" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">

                  <div class="row noMargin">
                    <div class="col s12 beRelative" :style="{backgroundColor:globalVariables.colors.mainThemeColor}">
                      <h5 class="center tColorWhite boldFont fluidFont-L">Özel İstek</h5>
                      <i data-micromodal-close class="material-icons beAbsolute centerInHeight" :style="{color:globalVariables.colors.mainTextColor}" style="right:8px">&#xe5cd</i>
                    </div>
                    <div class="col s12">
                      <textarea id="customOrderInput" style="min-height:60px" class="materialize-textarea boldFont fluidFont-L" placeholder="İsteğinizi yazın (Peçete, buz, çatal...)"></textarea>
                    </div>
                  </div>

                  <div class="row noMargin" style="height:3rem">
                    <div class="col s5 offset-s7 fullHeight waves-effect beRelative" :style="{backgroundColor:globalVariables.colors.helperThemeColor}">
                      <div class="beAbsolute centerInCenter center boldFont" :style="{color:globalVariables.colors.helperTextColor}" style="font-size:1.1rem">Gönder</div>
                    </div>
                  </div> 

              </div>
            </div>
          </div>          

          <div @click="_selectCategory(category)" v-for="(category,index) in categories" class="col10 offset-s1 categoryBorder addMarginT-S waves-effect" style="height:80px" :key="category.categoryUid">
            <div class="row noMargin fullHeight">
              <div class="col s7 valign-wrapper fullHeight">
                <p class="center noMargin" style="font-size:21px;margin-left:20px!important">{{category.categoryTitle}}</p>
              </div>
              <div class="col s3 offset-s2 beRelative fullHeight">
                <img src="../assets/categoryIcons_fordeveloping/dessert.png" style="height:60px" class="centerInCenter beAbsolute" alt="">
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
import { mapActions, mapMutations, mapState } from "vuex";

import Banner from "./Banner.vue"

export default {
  name: 'categories',
  components : {
    Banner
  },
  data(){
    return {
    }
  },
  computed : {
//mapStates
  ...mapState("moduleCategories",[
    "categories"
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

    //mapMutations
    ...mapMutations([
      "updateBackgroundCard"
    ]),
    //mapActions
    ...mapActions("moduleCategories",[
      "selectCategory"
    ])
  },
  mounted(){


    this.updateBackgroundCard({
      elementId : "background_categories",
      change : this.$store.state.globalVariables.colors.whiteyColor,
      operation : "backgroundColor"
    })

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
