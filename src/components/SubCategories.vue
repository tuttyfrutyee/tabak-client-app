<template>

  <div id="subCategories" class="beAbsolute fullWidth minHeight_full" style="top:0px;left:0px">
      <div id="background_subCategories" class="backgroundCard"></div>
      <banner></banner>
      hello from subcategories

    <ul class="collapsible noMargin noBorder">
        <li v-for="subCategory in subCategories">
        <div class="collapsible-header beRelative" style="height:3.8rem" :style="{backgroundColor:globalVariables.colors.mainThemeColor}">
            <p class="beAbsolute centerInCenter noMargin noPadding boldFont tColorWhite">{{subCategory.subCategoryName}}</p>
            <i class="material-icons beAbsolute centerInHeight tColorWhite" style="right:0px">add</i>
        </div>
        <div class="collapsible-body noPadding">
            <div class="row noMargin">
                <div @click="_selectProduct(product)" v-for="product in subCategory.products" class="col s6 noPadding">
                    <div class="containerr" style="overflow:hidden">
                        <div class="beAbsolute fullWidth fullHeight centerInCenter waves-effect"></div>
                        <img :src="product.productImages.productIconImage" class="beAbsolute centerInWidth" style="height:100%;top:0%">
                        <div class="beAbsolute fullWidth " :style="{backgroundColor:'rgba(243,128,0,0.7)'}" style="bottom:0;left:0;height:25%">
                            <div class="beRelative fullWidth fullHeight">
                                <div class="beAbsolute centerInCenter tColorWhite boldFont center fullWidth" style="font-size:1.3rem">{{product.productName}}</div>
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
    ...mapActions("moduleProduct",[
        "selectProduct"
    ])
  },
  computed : {
    //mapState
    ...mapState("moduleSubCategories",[
        "subCategories"
    ]),

  },
  mounted(){

   var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems,{accordion:true});

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

/* If you want text inside of the container */
.text {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.blurMe
{
      /* Add the blur effect */
  filter: blur(2px);
  -webkit-filter: blur(2px);
}
</style>
