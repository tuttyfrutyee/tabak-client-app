<template>

  <div v-if="dynamicColors" :style="{color:globalVariables.colors.fixedAppColor_text_1}" id="subCategories" class="beAbsolute fullWidth minHeight_full fontF_OpenSans" style="top:0px;left:0px">
        <div id="background_subCategories" class="backgroundCard"></div>
        <banner class="z-indexHigh"></banner>
        <div class="fullWidth fontSSmall_R semiBold beSticky z-indexMedium z-depth-1" style="padding-top:2px;padding-bottom:2px;padding-left:5px;top:-1px;" :style="{backgroundColor: dynamicColors.helperThemeColor.background,color: dynamicColors.helperThemeColor.text}">
             {{wireTitle(_categoryTitle).content}}
        </div>
        <!--Top best 4 -->
        <div v-if="selectedCategory.hasFavorites" class="invisibleWrapper">
            <div :style="{backgroundColor:globalVariables.colors.fixedAppColor_backgroundColor_5}" class=" beRelative" style="height:2.7rem;border-bottom: 1px solid #ddd">
                <div class="beAbsolute centerInCenter noMargin noPadding semiBold fontSVSmall_R">{{preferredLanguage.subCategories.titles.frequentlyOrdered}}</div>
                <i class="material-icons beAbsolute centerInHeight noMargin" style="font-size:1rem;left:5%;">&#xe838</i>
            </div>
            <div class=" noPadding">
                <div class="row noMargin">
                    <div :style="calculatePadding({realIndex:index,totalNumberOfItem:mostWanteds.length})" @click="_selectProduct(product)" v-for="(product,index) in mostWanteds" class="col s6 m4 l3 borderBox product">
                        <div class="fullHeight fullWidth beRelative z-depth-0 borderBox" style="overflow:hidden;border-radius:2px">
                            <div class="beAbsolute fullWidth fullHeight centerInCenter"></div>
                            <img v-on:load="arrangeProductImage($event)" :src="getImage(product.productImages.lowResolution)" class="beAbsolute centerInCenter productImage _fullWidth">
                            <div :style="{backgroundColor:globalVariables.colors.fixedAppColor_filter}" class="beAbsolute fullWidth filter" style="padding:0 5px 0 5px;bottom:0;left:0;height:30%">
                                <div class="beRelative fullWidth fullHeight">
                                    <div class="beAbsolute centerInCenter tColorWhite semiBold center fullWidth text addPaddingLAR-VS" style="font-size:1rem">{{wireTitle(product.productName).content}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- End of Best 4-->

        <!-- White Gap -->
        <div v-if="selectedCategory.hasFavorites" :style="{color:globalVariables.colors.fixedAppColor_text_2}" class="fullWidth z-indexMedium fontSVSmall_R semiBold" style="padding-top:0.1rem;padding-bottom:0.1rem;padding-left:0.4rem;border-bottom: 1px solid #ddd">-{{preferredLanguage.subCategories.titles.others}}</div>   
        <!-- End of White Gap -->

        <div class="z-indexLow" v-for="subCategory in subCategories" :key="subCategory.subCategoryUid">
            <div v-if="getDefaultTitle(subCategory.subCategoryTitle).content !== 'Alt Kategorisizler'" class="beRelative z-indexLow z-depth-1" :style="{backgroundColor:globalVariables.colors.fixedAppColor_backgroundColor_5,color:globalVariables.colors.fixedAppColor_text_3}" style="height:1.5rem;border-bottom: 1px solid #ddd">
                <p class="beAbsolute centerInHeight noMargin noPadding semiBold fontSVSmall_R" style="left:0.4rem">{{wireTitle(subCategory.subCategoryTitle).content}}</p>
            </div>
            <div class="noPadding">
                <div class="row noMargin">
                    <div :style="calculatePadding({realIndex:index,totalNumberOfItem:subCategory.products.length})" @click="_selectProduct(product)" v-for="(product,index) in subCategory.products" class="col s6 m4 l3 borderBox product">
                        <div class="fullHeight fullWidth beRelative z-depth-0 borderBox" style="overflow:hidden;border-radius:2px">
                            <div class="beAbsolute fullWidth fullHeight centerInCenter"></div>
                            <img v-on:load="arrangeProductImage($event)" :src="getImage(product.productImages.lowResolution)" class="beAbsolute centerInCenter productImage _fullWidth">
                            <div :style="{backgroundColor:globalVariables.colors.fixedAppColor_filter}" class="beAbsolute fullWidth filter" style="padding:0 5px 0 5px;bottom:0;left:0;height:30%">
                                <div class="beRelative fullWidth fullHeight">
                                    <div class="beAbsolute centerInCenter tColorWhite semiBold center fullWidth text addPaddingLAR-VS" style="font-size:1rem">{{wireTitle(product.productName).content}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="height : 0.5rem"></div>

  </div>
  
</template>

<script>
//For vuex store, mapState and mapActions
//Info : mapAction and mapMutations both inserted in methods block
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

import Banner from "./Banner.vue"

export default {
  name: 'subCategories',
  components : {
      Banner
  },
  data(){
    return {
        trigger : true
    }
  },
  methods : {
    _selectProduct(product){
        this.selectProduct(product)
        this.$router.push("/product")
    },
    executeAtNextTick(method){
        this.Vue.nextTick(()=>{
            method();
        },0)
    },
    arrangeProducts(){
        //evaluating height and filters height of the products
            var products = document.getElementsByClassName("product")

            var mode;

            var width = window.innerWidth;
            if(width <= 600){
                mode = 2
            }else if(width > 600 && width <= 992){
                mode = 3
            }else if(width > 992){
                mode = 4
            }


            var wDh_ratio = (3/4.0)

            for(let product of products){
                product.style.height = ((width/mode) * wDh_ratio) + 'px'
                
                var filterHeightRatio = 0.3

                var expectedFilterHeight = product.offsetHeight * filterHeightRatio

                var text = product.getElementsByClassName("text")[0]
                var filter = product.getElementsByClassName("filter")[0]

                var textSpacing = 6 // in px
                var minimumNeededSpaceForText = text.offsetHeight + textSpacing

                if(minimumNeededSpaceForText > expectedFilterHeight)
                    filter.style.height = minimumNeededSpaceForText + 'px'
                else
                    filter.style.height = expectedFilterHeight + 'px'
            }
    },
    arrangeProductImage(event){
        var image = event.currentTarget
        var cell_hDwRatio = 3/4
        var image_hDwRatio = image.offsetHeight / image.offsetWidth
        
        if(cell_hDwRatio < image_hDwRatio){
            image.style.width = "100%" 
            image.style.height = "auto"
        }else{
            image.style.height = "100%"
            image.style.width = "auto"
        }
    },
    //for if the images were already load
    arrangeProductsImages(){
        var images = document.getElementsByClassName("productImage")
        for(let image of images){

            //checking if image was loaded
            if(image.offsetHeight>0){
                var cell_hDwRatio = 3/4
                var image_hDwRatio = image.offsetHeight / image.offsetWidth
                
                if(cell_hDwRatio < image_hDwRatio){
                    image.style.width = "100%" 
                    image.style.height = "auto"
                }else{
                    image.style.height = "100%"
                    image.style.width = "auto"
                }                
            }
        }
    },
    calculatePadding(details){


        var realIndex = details.realIndex;
        var totalNumberOfItem = details.totalNumberOfItem


        var mode;

        mode = this.trigger //dummy operation

        var amount = 0.5
        var unit = "vmin"
        //the number are in terms of 'vmin'
        var padding = {
            leftPadding :  amount,
            topPadding : amount,
            rightPadding : amount,
            bottomPadding  : amount
        }
        var width = window.innerWidth;
        if(width <= 600){
            mode = 2
        }else if(width > 600 && width <= 992){
            mode = 3
        }else if(width > 992){
            mode = 4
        }

        var totalNumberOfLines = Math.floor(totalNumberOfItem/mode) + ((totalNumberOfItem % mode === 0)?0:1);
        var lineNumber = Math.floor(realIndex / mode)
        var index = realIndex % mode;
        
        //care for bottom and top
        if(lineNumber === 0)
            padding.topPadding = 0
       
        if(lineNumber === totalNumberOfLines-1)
            padding.bottomPadding = 0
        
        //care for left and right
        if(index === 0)
            padding.leftPadding = 0
       
        if(index === mode-1)
            padding.rightPadding  = 0
       
        if(realIndex === totalNumberOfItem-1)
            padding.rightPadding = 0

        
        return {
            "padding" : padding.topPadding+unit + " " + padding.rightPadding+unit + " " + padding.bottomPadding+unit + " " + padding.leftPadding+unit,                                    
            "backgroundColor" : "#fff"
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
    resize(){
        this.executeAtNextTick(this.arrangeProducts)
        this.trigger = !this.trigger
    },
    getTotalFavoritePoint(favoritePoint){return favoritePoint.natural + favoritePoint.artificial}, 

    //mapMutations and actions
    ...mapActions("moduleProduct",[
        "selectProduct"
    ])
  },
  computed : {
      _categoryTitle(){
          if(this.selectedCategory)
            return this.selectedCategory.categoryTitle
      },
    mostWanteds(){
        //for developing purposes
        var products = []
        if(this.subCategories)
        this.subCategories.forEach(subCategory=>{
            subCategory.products.forEach(product=>{products.push(product)})
        })
        
        products.sort((a,b)=>{
            return (this.getTotalFavoritePoint(a.favoritePoint) > this.getTotalFavoritePoint(b.favoritePoint)) ? -1 : 1
        })        
        
        var favorite4 = []
        for(var i = 0 ; i < 4 && i < products.length; i++)
            favorite4.push(products[i])
        
        return favorite4
    },
    //mapState
    ...mapState([
        "preferredLanguage",
        "preferredLanguage_asString"
    ]),
    ...mapState("moduleSubCategories",[
        "subCategories"
    ]),
    ...mapState("moduleCategories",[
        "selectedCategory"
    ]),
  //mapGetters
  ...mapGetters([
    "dynamicColors"
  ])    

  },
  created(){
      window.addEventListener("resize",this.resize)
  },

  mounted(){
      this.arrangeProducts()
      this.arrangeProductsImages()
  },
  destroyed(){
      window.removeEventListener("resize",this.resize)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.blurMe
{
      /* Add the blur effect */
  filter: blur(2px);
  -webkit-filter: blur(2px);
}
</style>
