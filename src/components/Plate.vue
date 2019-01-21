<template>
  <div id="plate" class="fullWidth minHeight_full">
    <div id="background_plate" class="backgroundCard"></div>

    <div class="row noMargin">
        <div class="col s12 noPadding" style="height:15vmin;max-height:100px">
            <ul :style="{backgroundColor:globalVariables.colors.mainThemeColor}" class="tabs fullHeight">
                <li class="tab col s3 fullHeight">
                    <a href="#orders" class="tColorWhite beRelative fullHeight">
                        <div class="beAbsolute centerInCenter fluidFont-M" style="top:55%">
                            Tabağınız
                        </div>
                        <div class="beAbsolute" style="bottom:1.3vh;right:0px;height:50%;border:0.5px solid #cecece;width:0px"></div>
                    </a>
                </li>
                <li class="tab col s3 fullHeight">
                    <a href="#track" class="tColorWhite beRelative fullHeight">
                        <div class="beAbsolute centerInCenter fluidFont-M" style="top:55%">Takip</div>
                    </a>
                </li>
            </ul>
        </div>
        <div id="orders" class="col s12">
            <div class="row noMargin">
                <div class="col s12 beRelative noPadding orderBorder" style="height:16vmin;max-height:90px">
                    <div class="beAbsolute centerInHeight fluidFont-L" style="left:5%;">
                        Tabağınız
                    </div>
                </div>
                <!-- Orders here -->
                <div class="col s12 noPadding" v-if="plate.length>0">
                    <div class="row noMargin">
                        <div v-for="order in plate" class="col s12 beRelative noPadding order orderBorder" style="height:22vmin;max-height:100px">

                            <div class="beAbsolute centerInHeight fluidFont-L boldFont" style="left:2%">x{{order.orderCount}}</div>

                            <div class="beAbsolute centerInHeight fullHeight waves-effect z-indexLow" style="left:0;right:10%"></div>
                            
                            <div class="beAbsolute centerInHeight text" style="left:15%;width:70%">
                                <div class="fluidFont-L boldFont">{{order.product.productName}}</div>
                                <div class="fluidFont-M"><span v-if="order.selectedOption.productOptionName!=='Normal'">({{order.selectedOption.productOptionName}})</span><span v-if="order.selectedExtras.length>0"> +{{order.selectedExtras.length}} Ekstra</span></div>
                            </div>

                            <div class="beAbsolute centerInHeight fullHeight" style="right:0;width:10%">
                                <div class="beRelative fullWidth fullHeight">
                                    <div class="beAbsolute centerInHeight" style="height:40%;width:1px;left:0;background-color:#cecece"></div>
                                    <i class="material-icons beAbsolute centerInCenter tColorRed fluidFont-LL" style="left:60%">&#xe5cd</i>
                                </div>
                            </div>
                            
                        </div>

                        <div class="col s10 offset-s1 noPadding beRelative" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="height:18vmin;max-height:120px;margin-top:2.5vh;border-radius:4px">
                            <div class="beAbsolute centerInCenter fluidFont-L tColorWhite">
                                Siparişi Gönder
                            </div>
                        </div>
                    </div>
                    <div style="height:2px;width:100%;background-color:#bdbdbd;margin-top:5vmin"></div>
                    <div class="row noMargin" style="">
                        <div class="col s12 boldFont fluidFont-LL" style="margin-top:7vmin;">
                            Yanına yakışır...   
                        </div>
                        <div class="col s12 noPadding">

                            <div class="glide">
                                <div class="glide__track" data-glide-el="track">
                                    <ul class="glide__slides">
                                        <li v-for="product in suggestedProducts()" class="glide__slide">

                                            <div class="fullWidth beRelative suggestion" style="overflow:hidden">
                                                <div class="beAbsolute fullWidth fullHeight centerInCenter waves-effect"></div>
                                                     <img :src="product.productImages.productIconImage" class="beAbsolute centerInWidth" style="height:100%;top:0%">
                                                    <div class="beAbsolute fullWidth filter" style="bottom:0;left:0;height:40%;background-color:rgba(0,0,0,0.5)">
                                                        <div class="beRelative fullWidth fullHeight">
                                                            <div class="beAbsolute centerInCenter tColorWhite boldFont center fullWidth text addPaddingLAR-VS fluidFont-L">{{product.productName}}</div>
                                                        </div>
                                                    </div>
                                            </div>                                         

                                        </li>                                                                      
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div style="margin-bottom:5vh"></div>
                </div>
                <div class="col s12 noPadding boldFont center beRelative fluidFont-LL" style="margin-top:5vh;height:60vmax" v-else>
                    Tabağınızda ürün yok
                        <img src="../assets/tabakIcon.png" alt="" class="beAbsolute centerInCenter">
                </div>
            </div>
        </div>
        <div id="track" class="col s12">
            <div class="row noMargin">
                <div class="col s12 beRelative noPadding addMarginB-S" style="height:18vmin;">
                    <div class="beAbsolute centerInHeight boldFont" style="left:5%;font-size:5.5vmin">Takip Listesi</div>
                    <div class="beAbsolute centerInWidth z-indexMedium" style="bottom:5px;width:94%;height:2px;backgroundColor:#cecece"></div>
                </div>
                <!-- Order List here -->
                <div v-if="true" class="col s12 noPadding">
                    <div class="row noMargin">
                        <div v-for="(order,index) in plate" class="col s12 noPadding beRelative" style="height:12vh">
                            <div class="beAbsolute centerInHeight" style="left:5%">
                              <span style="font-size:5vw" class="boldFont">x{{order.orderCount}} </span> <span class="boldFont" style="font-size:6vw">{{order.product.productName}}</span>
                            </div>
                            <div v-if="index%2===0" class="beAbsolute centerInHeight" style="right:5%;width:20%">
                                <i class="material-icons displayBlock center" style="color:#34b7f1;font-size:8vw">&#xe877</i>
                                <p class="center noPadding noMargin">Hazırlanıyor</p>
                            </div>
                            <div v-else class="beAbsolute centerInHeight" style="right:5%;width:20%">
                                <i class="material-icons displayBlock center" style="color:#9e9e9e;font-size:8vw">&#xe877</i>
                                <p class="center noPadding noMargin">İletildi</p>
                            </div>
                            <div class="beAbsolute centerInWidth z-indexMedium" style="bottom:5px;width:98%;height:2px;backgroundColor:#cecece"></div>
                        </div>
                    </div>
                </div>
                <div class="col s12 noPadding boldFont center beRelative fluidFont-LL" style="margin-top:5vh;height:60vmax" v-else>
                    Tabağınızda ürün yok
                        <img src="../assets/tabakIcon.png" alt="" class="beAbsolute centerInCenter">
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

export default {
  name: 'plate',
  data(){
    return {

    }
  },
  methods : {
      suggestedProducts(){
        //for developing purposes
        var bag = []
        this.subCategories.forEach(subCategory=>{
            subCategory.products.forEach(product=>{bag.push(product)})
        })
        var wanteds = []
        for(var i = 0; i < 5 && bag[i]; i++)
            wanteds.push(bag[i])
        return wanteds        
      },
      removeOrder(order){
          this.removeFromPlate(order)
      },
      resize(){
          this.arrangeOrdersHeight();
          this.arrangeSuggestions();
      },
      //helper functions
    hexToRgb(hex){
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    //for styles
    arrangeOrdersHeight(){
        setTimeout(()=>{
            var allOrders = document.getElementsByClassName("order")

            for (let order of allOrders) {

                 var text = order.getElementsByClassName("text")[0]


                 if(text.offsetHeight > order.offsetHeight){

                     var text_name = text.getElementsByClassName("text_name")[0]
                     var text_extras = text.getElementsByClassName("text_extras")[0]
                     
                    order.style.height = text.offsetHeight + 8 + 'px'

                 }
            }
        },0)

    },

    arrangeSuggestions(){
        setTimeout(()=>{
            var suggestions = document.getElementsByClassName("suggestion")

            var wDh_ratio = (3/4)

            for(let suggestion of suggestions){
                console.log(suggestion.offsetWidth)
                suggestion.style.height = (suggestion.offsetWidth * wDh_ratio) + 'px'                
                var filterHeightRatio = 0.4
                
                var expectedFilterHeight = suggestion.offsetHeight * filterHeightRatio

                var text = suggestion.getElementsByClassName("text")[0]
                var filter = suggestion.getElementsByClassName("filter")[0]

                var textSpacing = 6 //in px
                var minimumNeededSpaceForText = text.offsetHeight + textSpacing

                if(minimumNeededSpaceForText > expectedFilterHeight)
                    filter.style.height = minimumNeededSpaceForText + 'px'
                else
                    filter.style.height = expectedFilterHeight + 'px'


            }
            
        },0)

    },

    ...mapMutations("modulePlate",["removeFromPlate"])
  },
  computed : {
       dilutedHelperThemeColor(){
           var opacity = 0.1;
           var rgb = this.hexToRgb(this.globalVariables.colors.helperThemeColor)
           var neww = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity +')'
           return neww
       },
      //mapState
      ...mapState("modulePlate",[
          "plate"
      ]),
      ...mapState("moduleSubCategories",[
          "subCategories"
      ]),
  },
  created(){
      window.addEventListener("resize",this.resize)
  },
  mounted(){

    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el, {});

    setTimeout(()=>{
            //styling some stuff dynamically
    var slideBar = document.getElementsByClassName("indicator")
        slideBar[0].style.backgroundColor = this.globalVariables.colors.helperThemeColor
        slideBar[0].style.height = "5px";
    },0)
    if(this.plate.length>0)
    new Glide('.glide',{
        type: 'carousel',
        startAt: 0,
        swipeThreshold : 30,
        dragThreshold : 50,
        perView : 2,
        touchAngle : 80,
        autoplay: 4000,
        breakpoints : {
              500 : {perView : 2},
              900 : {perView : 3},
              1200 : {perView : 4}
        }
    }).mount()

    this.arrangeOrdersHeight()

    this.arrangeSuggestions();


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabs .tab a:hover, .tabs .tab a.active {
    background-color: transparent !important;
}
#background_plate{
    background-color : white;  
}
.glide__slide{
    background-color: black
}
.orderBorder{
    border-bottom : 1px solid #bdbdbd
}
.containerr{
    width:100%;
    padding-top:75%;
    position : relative;
}
</style>
