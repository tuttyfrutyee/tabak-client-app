<template>

  <div id="subCategories" class="beAbsolute fullWidth minHeight_full" style="top:0px;left:0px">
      <div id="background_subCategories" class="backgroundCard"></div>
      <banner></banner>
      <div class="fullWidth fluidFont-L boldFont" style="padding-top:1vmin;padding-bottom:1vmin" :style="{backgroundColor:globalVariables.colors.helperThemeColor}">
          {{selectedCategory.categoryTitle}}
      </div>
    <ul class="collapsible noMargin noBorder">
        <li @click="arrangeProducts()" class="active">
            <div class="collapsible-header beRelative z-depth-3" style="height:10vmin;min-height:3.8rem;background-color:#fafafa">
                <p class="beAbsolute centerInCenter noMargin noPadding boldFont  fluidFont-M">Sıkça Tercih Edilenler</p>
                <i class="material-icons beAbsolute centerInHeight  noMargin add noDisplay fluidFont-L" style="right:5%">&#xe145</i>
                <i class="material-icons beAbsolute centerInHeight  noMargin remove fluidFont-L" style="right:5%">&#xe15b</i>
                <i class="material-icons beAbsolute centerInHeight  noMargin fluidFont-L" style="left:5%">&#xe838</i>
            </div>
            <div class="collapsible-body noPadding">
                <div class="row noMargin">
                    <div :style="calculatePadding({realIndex:index,totalNumberOfItem:mostWanteds.length})" @click="_selectProduct(product)" v-for="(product,index) in mostWanteds" class="col s6 m4 l3 borderBox product">
                        <div class="fullHeight fullWidth beRelative z-depth-0 borderBox" style="overflow:hidden;border-radius:2px">
                            <div class="beAbsolute fullWidth fullHeight centerInCenter waves-effect"></div>
                            <img :src="product.productImages.productIconImage" class="beAbsolute centerInWidth" style="height:100%;top:0%">
                            <div class="beAbsolute fullWidth filter" style="bottom:0;left:0;height:40%;background-color:rgba(0,0,0,0.5)">
                                <div class="beRelative fullWidth fullHeight">
                                    <div class="beAbsolute centerInCenter tColorWhite boldFont center fullWidth text addPaddingLAR-VS fluidFont-L" style="">{{product.productName}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <li @click="arrangeProducts()" v-for="subCategory in subCategories">
            <div class="collapsible-header beRelative" style="height:10vmin;min-height:3.8rem;background-color:#fafafa">
                <p class="beAbsolute centerInCenter noMargin noPadding boldFont fluidFont-M">{{subCategory.subCategoryName}}</p>
                <i class="material-icons beAbsolute centerInHeight noMargin add fluidFont-L" style="right:5%">&#xe145</i>
                <i class="material-icons beAbsolute centerInHeight noMargin remove noDisplay fluidFont-L" style="right:5%">&#xe15b</i>
            </div>
            <div class="collapsible-body noPadding">
                <div class="row noMargin">
                    <div :style="calculatePadding({realIndex:index,totalNumberOfItem:subCategory.products.length})" @click="_selectProduct(product)" v-for="(product,index) in subCategory.products" class="col s6 m4 borderBox product">
                        <div class="fullHeight fullWidth beRelative z-depth-0 borderBox" style="overflow:hidden;border-radius:2px">
                            <div class="beAbsolute fullWidth fullHeight centerInCenter waves-effect"></div>
                            <img :src="product.productImages.productIconImage" class="beAbsolute centerInWidth" style="height:100%;top:0%">
                            <div class="beAbsolute fullWidth filter" style="bottom:0;left:0;height:40%;background-color:rgba(0,0,0,0.5)">
                                <div class="beRelative fullWidth fullHeight">
                                    <div class="beAbsolute centerInCenter tColorWhite boldFont center fullWidth text addPaddingLAR-VS fluidFont-L">{{product.productName}}</div>
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
        trigger : true
    }
  },
  methods : {
    _selectProduct(product){
        this.selectProduct(product)
        this.$router.push("/product")
    },
    //styles
    arrangeProducts(){
        //evaluating height and filters height of the products
        setTimeout(()=>{
            var products = document.getElementsByClassName("product")

            var wDh_ratio = (3/4)

            for(let product of products){
                product.style.height = (product.offsetWidth * wDh_ratio) + 'px'
                
                var filterHeightRatio = 0.4

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
        },0)
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
    resize(){
        this.arrangeProducts();
        this.trigger = !this.trigger
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
    ...mapState("moduleCategories",[
        "selectedCategory"
    ])

  },
  created(){
      window.addEventListener("resize",this.resize)
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
    this.arrangeProducts()
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
