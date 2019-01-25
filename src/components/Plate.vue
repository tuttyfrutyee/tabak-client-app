<template>
  <div id="plate" class="fullWidth minHeight_full">
    <div id="background_plate" class="backgroundCard"></div>

    <div class="row noMargin">

        <div class="col s12 noPadding" style="height:8vmax;min-height:56px">
            <ul :style="{backgroundColor:globalVariables.colors.mainThemeColor}" class="tabs fullHeight beRelative">
                <div @click="goBack()" class="beAbsolute centerInHeight z-indexMedium" style="left:3vmin;min-width:22px;min-height:22px;max-width:38px;max-height:38px;width:8vmin;height:8vmin;border-radius:50%;background-color:#424242">
                    <div class="beRelative fullHeight fullWidth">
                        <i class="beAbsolute centerInCenter material-icons tColorWhite fluidFont-XL">chevron_left</i>
                    </div>
                </div>
                <li class="tab col s7 fullHeight">
                    <a @click="arrangeOrdersHeight()" href="#orders" class="tColorWhite beRelative fullHeight">
                        <div class="beAbsolute centerInCenter fluidFont-M" style="top:55%">
                            Tabağınız
                        </div>
                        <div class="beAbsolute centerInHeight" style="right:0px;height:60%;border:0.5px solid #cecece;width:0px"></div>
                    </a>
                </li>
                <li @click="arrangeOrdersHeight()" class="tab col s5 fullHeight">
                    <a href="#track" class="tColorWhite beRelative fullHeight">
                        <div class="beAbsolute centerInCenter fluidFont-M" style="top:55%">Takip</div>
                    </a>
                </li>
            </ul>
        </div>
        <div id="orders" class="col s12">
            <div class="row noMargin">
                <div class="col s12 beRelative noPadding orderBorder" style="height:13vmin;max-height:70px">
                    <div class="beAbsolute centerInHeight fluidFont-L" style="left:5%;">
                        Tabağınız
                    </div>
                </div>
                <!-- Orders here -->
                <div class="col s12 noPadding" v-if="plate.length>0">
                    <div class="row noMargin">
                        <div v-for="order in plate" class="col s12 beRelative noPadding order orderBorder" style="height:18vmin;max-height:100px!important">

                            <div class="beAbsolute centerInHeight fluidFont-L semiBold" style="left:2%">x{{order.orderCount}}</div>

                            <div @click="navigateToOrderSettings(order)" class="beAbsolute centerInHeight fullHeight waves-effect z-indexLow" style="left:0;right:10%"></div>
                            
                            <div class="beAbsolute centerInHeight text" style="left:15%;width:70%">
                                <div class="fluidFont-L semiBold">{{order.product.productName}}</div>
                                <div class="fluidFont-M"><span v-if="order.selectedOption.productOptionName!=='Normal'">({{order.selectedOption.productOptionName}})</span><span v-if="order.selectedExtras.length>0"> +{{order.selectedExtras.length}} Ekstra</span></div>
                            </div>

                            <div class="beAbsolute centerInHeight fullHeight" style="right:0;width:10%">
                                <div class="beRelative fullWidth fullHeight">
                                    <div class="beAbsolute centerInHeight" style="height:40%;width:1px;left:0;background-color:#cecece"></div>
                                    <i @click="removeFromPlate(order)" class="material-icons beAbsolute centerInCenter tColorRed fluidFont-XL" style="left:60%">&#xe5cd</i>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col s12">
                            <div class="row" style="height:16vmin;max-height:100px;margin-top:4.5vmin;margin-bottom:2.5vmin">
                                <div class="col s7 offset-s1 noPadding beRelative fullHeight" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="border-radius:4px">
                                    <div class="beAbsolute centerInCenter fluidFont-L fullWidth center tColorWhite">
                                        Siparişi Gönder
                                    </div>
                                </div>
                                <div class="col s2 offset-s1 beRelative fullHeight">
                                    <div class="beAbsolute centerInCenter">
                                        <div class="beRelative">
                                            <!-- Modal Trigger -->
                                            <div data-micromodal-trigger="modal-1" class="beRelative fullWidth" style="height:5vmax">
                                                <img src="../assets/categoryIcons_fordeveloping/note.png" class="beAbsolute centerInCenter" style="height:5vmax" alt="">
                                                <i class="material-icons beAbsolute fluidFont-XL semiBold" style="color:green;top:-0.5vmax;right:-0.5vmax">check</i>
                                            </div>                                                                                         
                                            <div class="center fluidFont-S" style="line-height:1">Sipariş Notu</div>
                                        </div>
                                    </div>
                                            <!-- Modal Structure -->
                                            <div class="_modal micromodal-slide z-indexMedium" id="modal-1" aria-hidden="true">
                                                <div class="modal__overlay" data-micromodal-close>
                                                <div class="modal__container noPadding" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">

                                                    <div class="row noMargin">
                                                        <div class="col s12 beRelative" :style="{backgroundColor:globalVariables.colors.mainThemeColor}">
                                                        <h5 class="center tColorWhite semiBold fluidFont-M">Sipariş Notunuz</h5>
                                                        <i data-micromodal-close class="material-icons beAbsolute centerInHeight" :style="{color:globalVariables.colors.mainTextColor}" style="right:8px">&#xe5cd</i>
                                                        </div>
                                                        <div class="col s12">
                                                        <textarea id="customOrderInput" style="min-height:70px;height:10vmin" class="materialize-textarea semiBold fluidFont-L" placeholder="İletilmesini istediğiniz sipariş notunu yazın..."></textarea>
                                                        </div>
                                                    </div>

                                                    <div class="row noMargin" style="height:3rem">
                                                        <div class="col s5 offset-s7 fullHeight waves-effect beRelative" :style="{backgroundColor:globalVariables.colors.helperThemeColor}">
                                                        <div class="beAbsolute centerInCenter center semiBold" :style="{color:globalVariables.colors.helperTextColor}" style="font-size:1.1rem">Tamam</div>
                                                        </div>
                                                    </div> 

                                                </div>
                                                </div>
                                            </div>                                    
                                </div> 
                            </div>
                        </div>
                       
                    </div>
                    <div style="height:2px;width:100%;background-color:#bdbdbd;margin-top:4vmin"></div>

                    <div v-if="suggestedProducts().length>0" class="row noMargin">
                        <div class="col s12 semiBold fluidFont-LL" style="margin-top:7vmin">
                            Yanına yakışır...
                        </div>
                        <div class="col s12 noPadding" style="margin-top:5vmin">
                            <!-- Swiper -->
                            <div class="swiper-container overFlowVisible">
                                <div class="swiper-wrapper">

                                    <div v-for="product in suggestedProducts()" class="swiper-slide" :key="product.productUid">
                                        <div @click="navigateToProduct(product)" class="fullWidth beRelative suggestion" style="overflow:hidden; border-radius:2px">
                                            <div class="beAbsolute fullWidth fullHeight centerInCenter waves-effect"></div>
                                                    <img v-on:load="arrangeProductImage($event)" :src="product.productImages.productIconImage" class="beAbsolute centerInCenter productImage _fullWidth">
                                                <div class="beAbsolute fullWidth filter" style="bottom:0;left:0;height:40%;background-color:rgba(0,0,0,0.5)">
                                                    <div class="beRelative fullWidth fullHeight">
                                                        <div class="beAbsolute centerInCenter tColorWhite semiBold center fullWidth text addPaddingLAR-VS fluidFont-L">{{product.productName}}</div>
                                                    </div>
                                                </div>
                                        </div>                                         

                                    </div> 
                                </div>
                                <!-- Add Pagination -->
                                <div class="swiper-pagination centerInWidth" style="bottom:-30px"></div>
                            </div>
                        </div>
                    </div>

                    <div style="margin-bottom:5vh"></div>
                </div>
                <div class="col s12 noPadding semiBold center beRelative fluidFont-LL" style="margin-top:5vh;height:60vmax" v-else>
                    Tabağınızda ürün yok
                        <img src="../assets/tabakIcon.png" alt="" class="beAbsolute centerInCenter">
                </div>
            </div>
        </div>
        <div id="track" class="col s12">
            <div class="row noMargin">
                <div class="col s12 beRelative noPadding orderBorder" style="height:13vmin;max-height:70px">
                    <div class="beAbsolute centerInHeight fluidFont-L" style="left:5%;">
                        Takip
                    </div>
                </div>
                <!-- Order List here -->
                <div v-if="true" class="col s12 noPadding">
                    <div class="row noMargin">
                        <div v-for="(order,index) in plate" class="col s12 noPadding beRelative order orderBorder" style="height:18vmin;max-height:100px!important">

                            <div class="beAbsolute centerInHeight fluidFont-L semiBold" style="left:2%">x{{order.orderCount}}</div>

                            <div class="beAbsolute centerInHeight text" style="left:15%;width:58%">
                                <div class="fluidFont-L semiBold">{{order.product.productName}}</div>
                                <div class="fluidFont-M"><span v-if="order.selectedOption.productOptionName!=='Normal'">({{order.selectedOption.productOptionName}})</span><span v-if="order.selectedExtras.length>0"> +{{order.selectedExtras.length}} Ekstra</span></div>
                            </div>                            

                            <div v-if="index%2===0" class="beAbsolute centerInHeight text" style="right:5%;width:20%">
                                <i class="material-icons displayBlock center fluidFont-L" style="color:#34b7f1;">&#xe877</i>
                                <p class="center noPadding noMargin fluidFont-M">Hazırlanıyor</p>
                            </div>

                            <div v-else class="beAbsolute centerInHeight text" style="right:5%;width:20%">
                                <i class="material-icons displayBlock center fluidFont-L" style="color:#9e9e9e;">&#xe877</i>
                                <p class="center noPadding noMargin fluidFont-M">İletildi</p>
                            </div>

                        </div>
                    </div>
                    <div  class="fullWidth beFixed waves-effect z-depth-4" :style="{backgroundColor:globalVariables.colors.fixedAppColor_2}" style="bottom:0;left:0;height:12vmax;-webkit-transform: translateZ(0);">
                        <div class="beRelative fullWidth fullHeight">
                            <div style="line-height:0.8" class="beAbsolute centerInCenter center boldFont tColorWhite fluidFont-XL fullWidth">
                                Hesap İste<br><span class="fluidFont-M"> (Garson Çağırır)</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col s12 noPadding semiBold center beRelative fluidFont-LL" style="margin-top:5vh;height:60vmax" v-else>
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

        for(let subCategory of this.subCategories){
            subCategory.products.forEach(product=>{bag.push(product)})
        }

        var wanteds = []
        for(var i = 0; i < 5 && bag[i]; i++)
            wanteds.push(bag[i])
        return wanteds        
      },
      removeOrder(order){
          this.removeFromPlate(order)
      },
      goBack(){
         this.$router.go(-1)
      },
      navigateToProduct(product){
          this.selectProduct(product)
          this.$router.push("/product")
      },
      navigateToOrderSettings(order){
          this.selectProduct(order.product)
          this.$router.push("/orderSettings")
      }   ,   
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
        this.Vue.nextTick(()=>{
            var allOrders = document.getElementsByClassName("order")

            for (let order of allOrders) {

                 var text = order.getElementsByClassName("text")[0]


                 if(text.offsetHeight > order.offsetHeight){

                     var text_name = text.getElementsByClassName("text_name")[0]
                     var text_extras = text.getElementsByClassName("text_extras")[0]
                     
                    order.style.height = text.offsetHeight + 8 + 'px'

                 }else{
                     order.style.height = "18vmin"
                 }
            }
        },0)

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
    arrangeSuggestions(){
        this.Vue.nextTick(()=>{
            var suggestions = document.getElementsByClassName("suggestion")

            var wDh_ratio = (3/4)

            for(let suggestion of suggestions){

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
    //mapMutations and actions
    ...mapMutations("modulePlate",["removeFromPlate"]),
    ...mapActions("moduleProduct",[
        "selectProduct"
    ])
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
          "plate",
          "orderNote"
      ]),
      ...mapState("moduleSubCategories",[
          "subCategories"
      ]),
  },
  created(){
      window.addEventListener("resize",this.resize)
      window.scroll(0,0)
  },
  destroyed(){
      window.removeEventListener("resize",this.resize)
  },
  mounted(){

        var el = document.querySelectorAll('.tabs');
        var instance = M.Tabs.init(el, {});

        this.Vue.nextTick(()=>{
                //styling some stuff dynamically
        var slideBar = document.getElementsByClassName("indicator")
            slideBar[0].style.backgroundColor = this.globalVariables.colors.helperThemeColor
            slideBar[0].style.height = "5px";
        },0)


        if(this.plate.length>0 && this.suggestedProducts().length>0)
            var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                1024: {
                slidesPerView: 4,
                spaceBetween: 40,
                },
                768: {
                slidesPerView: 3,
                spaceBetween: 20,
                },
                550: {
                slidesPerView: 2,
                spaceBetween: 10,
                },
            },
            autoplay: {
                delay: 5000,
            },
            loop: true,
            on: {
                    resize : this.arrangeSuggestions,
                    slideChangeTransitionStart	 : this.arrangeProductsImages
                },
            });

        this.arrangeOrdersHeight()

        this.arrangeSuggestions()

        MicroModal.init();


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

.orderBorder{
    border-bottom : 1px solid #bdbdbd
}

    .swiper-container {
      width: 100%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
</style>
