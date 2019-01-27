<template>
  <div id="plate" class="fullWidth minHeight_full">
    <div id="background_plate" class="backgroundCard"></div>

    <div class="row noMargin">

        <div class="col s12 noPadding" style="height:3.2rem;min-height:56px">
            <ul :style="{backgroundColor:globalVariables.colors.mainThemeColor}" class="tabs fullHeight beRelative">

                <div @click="goBack()" class="beAbsolute centerInHeight z-indexMedium" style="width:2.8rem;height:3.2rem;">
                    <div class="beAbsolute centerInHeight z-indexMedium" style="left:3vmin;width:1.6rem;height:1.6rem;border-radius:50%;background-color:#424242">
                        <div class="beRelative fullHeight fullWidth">
                            <i class="beAbsolute centerInCenter material-icons tColorWhite fontSMedium_R">chevron_left</i>
                        </div>
                    </div>
                </div>

                <li class="tab col s7 fullHeight">
                    <a @click="arrangeOrdersHeight()" href="#orders" class="tColorWhite beRelative fullHeight">
                        <div class="beAbsolute centerInCenter fontSVSmall_R">
                            Tabağınız
                        </div>
                        <div class="beAbsolute centerInHeight" style="right:0px;height:60%;border:0.5px solid #cecece;width:0px"></div>
                    </a>
                </li>
                <li @click="handleTrackingOrdersTabTap()" class="tab col s5 fullHeight">
                    <a href="#track" class="tColorWhite beRelative fullHeight">
                        <div class="beAbsolute centerInCenter fontSVSmall_R">Takip</div>
                    </a>
                </li>
            </ul>
        </div>
        <div id="orders" class="col s12 noOverflow">
            <div class="row noMargin">
                <div class="col s12 beRelative noPadding orderBorder" style="height:3rem">
                    <div class="beAbsolute centerInHeight fontSSmall_R" style="left:5%;">
                        Tabağınız
                    </div>
                </div>
                <!-- Orders here -->
                <div class="col s12 noPadding" v-if="plate.length>0">
                    <div class="row noMargin">
                        <div v-for="order in plate" class="col s12 beRelative noPadding order orderBorder" style="height:3.5rem">

                            <div class="beAbsolute centerInHeight fontSSmall_R semiBold" style="left:2%">x{{order.orderCount}}</div>

                            <div @click="navigateToOrderSettings(order)" class="beAbsolute centerInHeight fullHeight waves-effect z-indexLow" style="left:0;right:10%"></div>
                            
                            <div class="beAbsolute centerInHeight text" style="left:15%;width:70%">
                                <div class="fontSSmall_R semiBold">{{order.product.productName}}</div>
                                <div class="fontSVSmall_R"><span v-if="order.selectedOption.productOptionName!=='Normal'">({{order.selectedOption.productOptionName}})</span><span v-if="order.selectedExtras.length>0"> +{{order.selectedExtras.length}} Ekstra</span></div>
                            </div>

                            <div class="beAbsolute centerInHeight fullHeight" style="right:-0.50rem;width:15%">
                                <div @click="removeFromPlate(order)" class="beRelative fullWidth fullHeight">
                                    <div class="beAbsolute centerInHeight" style="height:40%;width:1px;left:0;background-color:#cecece"></div>
                                     <i class="material-icons beAbsolute centerInCenter tColorRed fontSLarge_R" style="left:60%">&#xe5cd</i>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col s12">
                            <div class="row" style="height:3.5rem;max-height:100px;margin-top:1rem;margin-bottom:0.5rem">
                                <div data-micromodal-trigger="modal-3" class="col s7 offset-s1 noPadding beRelative fullHeight" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="border-radius:4px">
                                    <div class="beAbsolute centerInCenter fontSSmall_R fullWidth center tColorWhite">
                                        Siparişi Gönder
                                    </div>
                                </div>
                                <div class="col s2 offset-s1 beRelative fullHeight">
                                    <div class="beAbsolute centerInCenter">
                                        <div class="beRelative">
                                            <!-- Modal Trigger -->
                                            <div data-micromodal-trigger="modal-1" class="beRelative fullWidth" style="height:2rem">
                                                <span class="beAbsolute centerInCenter" style="height:2rem;width:2rem">
                                                    <div class="beRelative fullWidth fullHeight">
                                                        <img src="../assets/categoryIcons_fordeveloping/note.png" class="beAbsolute centerInCenter fullWidth">
                                                        <i v-if="orderNote.length>0" class="material-icons beAbsolute fontSLarge_R boldFont" style="color:green;top:0.5rem;left:5px;transform:translate(50%,-50%)">check</i>
                                                        <div v-if="orderNote.length>0" class="beAbsolute" style="font-size:0.8rem;color:green;top:1.5rem;left:5px;transform:translate(40%,-70%)">Eklendi</div>                                                        
                                                    </div>
                                                </span>
                                            </div>                                                                                         
                                            <div data-micromodal-trigger="modal-1" class="center fontSVSmall_R" style="line-height:1">Sipariş Notu</div>
                                        </div>
                                    </div>
                                            <!-- Modal Structure -->
                                            <div class="_modal micromodal-slide z-indexMedium" id="modal-1" aria-hidden="true">
                                                <div class="modal__overlay" data-micromodal-close>
                                                <div class="modal__container noPadding" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">

                                                    <div class="row noMargin">
                                                        <div class="col s12 beRelative" :style="{backgroundColor:globalVariables.colors.mainThemeColor}">
                                                        <h5 class="center tColorWhite semiBold fontSVSmall_R">Sipariş Notunuz</h5>
                                                        <i data-micromodal-close class="material-icons beAbsolute centerInHeight" :style="{color:globalVariables.colors.mainTextColor}" style="right:8px">&#xe5cd</i>
                                                        </div>
                                                        <div class="col s12">
                                                          <textarea v-model="l_orderNote" id="customOrderInput" style="min-height:60px;" class="materialize-textarea semiBold fontSVSmall_R" placeholder="İletilmesini istediğiniz sipariş notunu yazın..."></textarea>
                                                        </div>
                                                    </div>


                                                </div>
                                                </div>
                                            </div>                                    
                                </div> 
                            </div>
                        </div>
                       
                    </div>
                    <div style="height:2px;width:100%;background-color:#bdbdbd;margin-top:0.8rem"></div>

                    <div v-if="suggestedProducts().length>0" class="row noMargin">
                        <div class="col s12 semiBold fontSMedium_R" style="margin-top:1rem">
                            Yanına yakışır...
                        </div>
                        <div class="col s12 noPadding" style="margin-top:1rem;margin-bottom:2rem">
                            <!-- Swiper -->
                            <div class="swiper-container overFlowVisible">
                                <div class="swiper-wrapper">

                                    <div v-for="product in suggestedProducts()" class="swiper-slide" :key="product.productUid">
                                        <div class="fullWidth beRelative suggestion" style="overflow:hidden; border-radius:2px">
                                            <div :id="product.productUid" class="beAbsolute fullWidth fullHeight centerInCenter waves-effect"></div>
                                                    <img v-on:load="arrangeProductImage($event)" :src="product.productImages.productIconImage" class="beAbsolute centerInCenter productImage _fullWidth">
                                                <div class="beAbsolute fullWidth filter" style="bottom:0;left:0;height:40%;background-color:rgba(0,0,0,0.5)">
                                                    <div class="beRelative fullWidth fullHeight">
                                                        <div class="beAbsolute centerInCenter tColorWhite semiBold center fullWidth text addPaddingLAR-VS fontSSmall_R">{{product.productName}}</div>
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
                <div class="col s12 noPadding semiBold center beRelative fontSMedium_R" style="margin-top:1.5rem;height:20rem" v-else>
                    Tabağınızda ürün yok
                        <img src="../assets/tabakIcon.png"  class="beAbsolute centerInCenter">
                </div>
            </div>
        </div>
        <div id="track" class="col s12">
            <div class="row noMargin">
                <div class="col s12 beRelative noPadding orderBorder" style="height:3rem">
                    <div class="beAbsolute centerInHeight fontSSmall_R" style="left:5%;">
                        Takip
                    </div>
                </div>
                <!-- Order List here -->
                <div v-if="trackingOrders.length>0" class="col s12 noPadding" style="margin-bottom:20vmax">
                    <div class="row noMargin">
                        <div v-for="(order,index) in trackingOrders" class="col s12 noPadding beRelative order orderBorder" style="height:3.5rem">

                            <div class="beAbsolute centerInHeight fontSSmall_R semiBold" style="left:2%">x{{order.orderCount}}</div>

                            <div class="beAbsolute centerInHeight text" style="left:15%;width:58%">
                                <div class="fontSSmall_R semiBold">{{order.product.productName}}</div>
                                <div class="fontSVSmall_R"><span v-if="order.selectedOption.productOptionName!=='Normal'">({{order.selectedOption.productOptionName}})</span><span v-if="order.selectedExtras.length>0"> +{{order.selectedExtras.length}} Ekstra</span></div>
                            </div>                            

                            <div v-if="index%2===0" class="beAbsolute centerInHeight text" style="right:5%;width:20%">
                                <i class="material-icons displayBlock center fontSSmall_R" style="color:#34b7f1;">&#xe877</i>
                                <p class="center noPadding noMargin fontSVSmall_R">Hazırlanıyor</p>
                            </div>

                            <div v-else class="beAbsolute centerInHeight text" style="right:5%;width:20%">
                                <i class="material-icons displayBlock center fontSSmall_R" style="color:#9e9e9e;">&#xe877</i>
                                <p class="center noPadding noMargin fontSVSmall_R">İletildi</p>
                            </div>

                        </div>
                    </div>
                    <div  class="fullWidth beFixed waves-effect z-depth-4" :style="{backgroundColor:globalVariables.colors.fixedAppColor_2}" style="bottom:0;left:0;height:12vmax;-webkit-transform: translateZ(0);">
                        <div class="beRelative fullWidth fullHeight">
                            <div style="line-height:1" class="beAbsolute centerInCenter center boldFont tColorWhite fontSLarge_R fullWidth">
                                Hesap İste<br><span class="fontSSmall_R"> (Garson Çağırır)</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col s12 noPadding semiBold center beRelative fontSMedium_R" style="margin-top:1.5rem;height:20rem" v-else>
                    Takip edilicek bir ürün yok
                        <img src="../assets/binocularIcon.png" style="width:7rem;"  class="beAbsolute centerInCenter">
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Structure(Order Delivered Notification) -->
    <div class="_modal micromodal-slide z-indexMedium" id="modal-2" aria-hidden="true">
        <div class="modal__overlay" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-2-title">
            <div class="addPadding-M fontSVSmall_R center">
                <div class="center fontSMedium_R semiBold"> Siparişiniz alındı. <i class="material-icons fontSLarge_R" style="color:green">check_circle</i></div>
                <div class="fullWidth" style="height:1px;backgroundColor:#cecece;margin-top:0.5rem;margin-bottom:1rem"></div>
                <span class="semiBold">Takip</span> sekmesinden sipariş durumunu kontrol edebilirsiniz.
            </div>
        </div>
        </div>
    </div>

    <!-- Modal Structure(Send Order Verification) -->
    <div class="_modal micromodal-slide z-indexMedium" id="modal-3" aria-hidden="true">
        <div class="modal__overlay" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-3-title">
            <div class="fullWidth beRelative addPadding-S">
                <div class="center fontSMedium_R">Sipariş gönderme işlemini onaylıyor musunuz?</div>
                <div class="fullWidth" style="height:1px;backgroundColor:#cecece;margin-top:0.5rem;margin-bottom:1rem"></div>
                <div class="row noMargin fullWidth tColorWhite" style="height:2.5rem">
                    <div data-micromodal-close class="col s5 fullHeight noPadding center beRelative" :style="{backgroundColor:globalVariables.colors.fixedAppColor_3}">
                        <div data-micromodal-close class="beAbsolute centerInCenter">Vazgeç</div>
                    </div>
                    <div @click="_sendOrders($event)" class="col s7 fullHeight noPadding center beRelative semiBold waves-effect" :style="{backgroundColor:globalVariables.colors.fixedAppColor_2}">
                        <div class="beAbsolute centerInCenter fullWidth">Evet, onayla!</div>
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
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: 'plate',
  data(){
    return {
        l_orderNote : ""
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
    navigateToProduct(productUid){
        var product = this.findProductWithUid(productUid)
        if(product){
        this.selectProduct(product)
        this.$router.push("/product")
        }
    },
    navigateToOrderSettings(order){
        this.selectProduct(order.product)
        this.updateOrderSelectedToBeChanged(order)
        this.$router.push("/orderSettings")
    },   
    resize(){
        this.arrangeOrdersHeight();
        this.arrangeSuggestions(); 
        },
    _sendOrders(event){
        
        var modal = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        //fucking micromodal is broken with close rjrjrj
        //closing it manually
        modal.classList.remove("is-open")
        modal.setAttribute('aria-hidden', 'true');

        this.sendOrders().then(()=>{
            MicroModal.show("modal-2")
        })
    }, 
    handleTrackingOrdersTabTap(){
        this.arrangeOrdersHeight()
        this.markTrackingOrdersSeen()
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
    findProductWithUid(productUid){

        for(let category of this.categories)
            for(let subCategory of category.subCategories)
                for(let product of subCategory.products)
                    if(product.productUid === productUid)
                        return product                   
    
        return null
        
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
                     order.style.height = "3.5rem"
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
    ...mapMutations([
        "addProcess",
        "removeProcess"
    ]),
    ...mapMutations("moduleProduct",[
        "updateOrderSelectedToBeChanged"
    ]),
    ...mapMutations("modulePlate",[
        "removeFromPlate",
        "updateOrderNote",
        "markTrackingOrdersSeen"
        ]),
    ...mapActions("moduleProduct",[
        "selectProduct"
    ]),
    ...mapActions("modulePlate",[
        "sendOrders"
    ])
  },
  computed : {
       dilutedHelperThemeColor(){
           var opacity = 0.1;
           var rgb = this.hexToRgb(this.globalVariables.colors.helperThemeColor)
           var neww = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity +')'
           return neww
       },
       unSeenTrackingOrdersCount(){
           var counter = 0
           this.trackingOrders.forEach(trackingOrder=>{
               if(!trackingOrder.isSeen)
                counter++
           })
           return counter
       },
      //mapState
      ...mapState("modulePlate",[
          "plate",
          "orderNote",
          "trackingOrders"
      ]),
      ...mapState("moduleCategories",[
          "categories"
      ]),
      ...mapState("moduleSubCategories",[
          "subCategories"
      ]),
  },
  watch : {
      l_orderNote(newValue){
          this.updateOrderNote(newValue)
      }
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
                delay: 500000,
            },
            loop: true,
            on: {
                    resize : this.arrangeSuggestions,
                    slideChangeTransitionStart	 : this.arrangeProductsImages,
                    tap : (event)=>{this.navigateToProduct(event.srcElement.id) }
                },
            });

        this.arrangeOrdersHeight()

        this.arrangeSuggestions()

        MicroModal.init();

        this.l_orderNote = this.orderNote



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
