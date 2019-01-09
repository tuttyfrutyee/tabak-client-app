<template>

  <div id="subCategories" class="beAbsolute fullWidth minHeight_full" style="top:0px;left:0px">
      <div id="background_subCategories" class="backgroundCard"></div>
      <banner></banner>
      <div class="fullWidth" style="height:1vh" :style="{backgroundColor:globalVariables.colors.helperThemeColor}" ></div>
    <ul class="collapsible noMargin noBorder">
        <li @click="arrangeFiltersHeight()" class="active">
            <div class="collapsible-header beRelative" style="height:3.8rem" :style="{backgroundColor:globalVariables.colors.mainThemeColor}">
                <p class="beAbsolute centerInCenter noMargin noPadding boldFont tColorWhite">Tercih Edilenler</p>
                <i class="material-icons beAbsolute centerInHeight tColorWhite noMargin add noDisplay" style="right:5%">add</i>
                <i class="material-icons beAbsolute centerInHeight tColorWhite noMargin remove" style="right:5%">remove</i>
                <i class="material-icons beAbsolute centerInHeight tColorWhite noMargin" style="left:5%">star</i>
            </div>
            <div class="collapsible-body noPadding">
                <div class="row noMargin">
                    <div @click="_selectProduct(product)" v-for="product in mostWanteds" class="col s6 noPadding">
                        <div class="containerr" style="overflow:hidden">
                            <div class="beAbsolute fullWidth fullHeight centerInCenter waves-effect"></div>
                            <img :src="product.productImages.productIconImage" class="beAbsolute centerInWidth" style="height:100%;top:0%">
                            <div class="beAbsolute fullWidth filter" :style="{backgroundColor:'rgba(243,128,0,0.7)'}" style="bottom:0;left:0;height:25%">
                                <div class="beRelative fullWidth fullHeight">
                                    <div class="beAbsolute centerInCenter tColorWhite boldFont center fullWidth text" style="font-size:5.2vw">{{product.productName}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <li @click="arrangeFiltersHeight()" v-for="subCategory in subCategories">
            <div class="collapsible-header beRelative" style="height:3.8rem" :style="{backgroundColor:globalVariables.colors.mainThemeColor}">
                <p class="beAbsolute centerInCenter noMargin noPadding boldFont tColorWhite">{{subCategory.subCategoryName}}</p>
                <i class="material-icons beAbsolute centerInHeight tColorWhite noMargin add" style="right:5%">add</i>
                <i class="material-icons beAbsolute centerInHeight tColorWhite noMargin remove noDisplay" style="right:5%">remove</i>
            </div>
            <div class="collapsible-body noPadding">
                <div class="row noMargin">
                    <div @click="_selectProduct(product)" v-for="product in subCategory.products" class="col s6 noPadding">
                        <div class="containerr" style="overflow:hidden">
                            <div class="beAbsolute fullWidth fullHeight centerInCenter waves-effect"></div>
                            <img :src="product.productImages.productIconImage" class="beAbsolute centerInWidth" style="height:100%;top:0%">
                            <div class="beAbsolute fullWidth filter" :style="{backgroundColor:'rgba(243,128,0,0.7)'}" style="bottom:0;left:0;height:25%">
                                <div class="beRelative fullWidth fullHeight">
                                    <div class="beAbsolute centerInCenter tColorWhite boldFont center fullWidth text" style="font-size:1.3rem">{{product.productName}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>

  </div>
  
</template>

<script>
//For vuex store, mapState and mapActions
//Info : mapAction and mapMutations both inserted in methods block
import { mapActions, mapMutations, mapState } from "vuex";

import Banner from "./Banner.vue"

export default {
  name: 'subCategories',
  components : {
      Banner
  },
  data(){
    return {

    }
  },
  methods : {
    _selectProduct(product){
        this.selectProduct(product)
        this.$router.push("/product")
    },
    //styles
    arrangeFiltersHeight(){
        setTimeout(()=>{
            var allFilters = document.getElementsByClassName("filter")

            for (let filter of allFilters) {
                 var text = filter.getElementsByClassName("text")[0]

                 if(text.offsetHeight > filter.offsetHeight){
                     text.style.fontSize = "4.7vw"
                    if(!(filter.parentNode.offsetHeight / 4 > (text.offsetHeight + 4)))
                    filter.style.height = (text.offsetHeight + 4) + 'px'
                    console.log(text.offsetHeight,filter.offsetHeight)
                 }
            }
        },0)

    },
    ...mapActions("moduleProduct",[
        "selectProduct"
    ])
  },
  computed : {
    mostWanteds(){
        //for developing purposes
        var bag = []
        this.subCategories.forEach(subCategory=>{
            subCategory.products.forEach(product=>{bag.push(product)})
        })
        var wanteds = []
        for(var i = 0; i < 4 && bag[i]; i++)
            wanteds.push(bag[i])
        return wanteds
    },
    //mapState
    ...mapState("moduleSubCategories",[
        "subCategories"
    ]),

  },
  mounted(){

   var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems,{accordion:true,
    onOpenStart : (element)=>{
         element.getElementsByClassName("add")[0].classList.toggle("noDisplay")
         element.getElementsByClassName("remove")[0].classList.toggle("noDisplay")
    },
    onCloseStart : (element)=>{
         element.getElementsByClassName("add")[0].classList.toggle("noDisplay")
         element.getElementsByClassName("remove")[0].classList.toggle("noDisplay")
    }
    });
    this.arrangeFiltersHeight()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.containerr {
  width: 100%;
  padding-top: 75%; /* 1:1 Aspect Ratio */
  position: relative; /* If you want text inside of it */
}


.blurMe
{
      /* Add the blur effect */
  filter: blur(2px);
  -webkit-filter: blur(2px);
}
</style>
