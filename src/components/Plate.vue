<template>
  <div v-if="dynamicColors" id="plate" class="fullWidth minHeight_full">
    <div id="background_plate" class="backgroundCard"></div>

    <div class="row noMargin">

        <div class="col s12 noPadding" style="height:3.2rem;min-height:56px">
            <ul :style="{backgroundColor: dynamicColors.mainThemeColor.background}" class="tabs fullHeight beRelative">

                <div @click="goBack()" class="beAbsolute centerInHeight z-indexMedium" style="width:2.8rem;height:3.2rem;">
                    <div class="beAbsolute centerInHeight z-indexMedium" style="left:3vmin;width:1.6rem;height:1.6rem;border-radius:50%;background-color:#424242">
                        <div class="beRelative fullHeight fullWidth">
                            <i class="beAbsolute centerInCenter material-icons tColorWhite fontSMedium_R">&#xe5cb</i>
                        </div>
                    </div>
                </div>

                <li v-if="restaurantSettings.appType==='menuAndOrder'" class="tab col s7 fullHeight">
                    <a :style="{color: dynamicColors.mainThemeColor.text}" @click="arrangeOrdersHeight()" href="#orders" class="beRelative fullHeight">
                        <div class="beAbsolute centerInCenter fontSVSmall_R">{{preferredLanguage.plate.plate.title}}</div>
                        <div class="beAbsolute centerInHeight" style="right:0px;height:60%;border:0.5px solid #cecece;width:0px"></div>
                    </a>
                </li>

                <li v-if="restaurantSettings.appType==='onlyMenu'" class="tab col s12 fullHeight">
                    <a :style="{color: dynamicColors.mainThemeColor.text}" @click="arrangeOrdersHeight()" href="#orders" class="beRelative fullHeight">
                        <div class="beAbsolute centerInCenter fontSVSmall_R">{{preferredLanguage.plate.plate.title}}</div>
                    </a>
                </li>                

                <li v-if="restaurantSettings.appType==='menuAndOrder'" @click="handleTrackingOrdersTabTap()" class="tab col s5 fullHeight">
                    <a :style="{color: dynamicColors.mainThemeColor.text}" href="#track" class="beRelative fullHeight">
                        <div class="beAbsolute centerInCenter fontSVSmall_R">{{preferredLanguage.plate.track.title}}</div>
                        <div v-if="unSeenTrackingOrdersCount>0" class="beAbsolute centerInHeight" style="right:10%;height:1.4rem;width:1.4rem">
                            <div class="beRelative fullWidth fullHeight" :style="{backgroundColor: dynamicColors.helperThemeColor.background,color: dynamicColors.helperThemeColor.text}" style="border-radius:50%">
                                <div class="beAbsolute centerInCenter boldFont fontSVSmall_R noPadding" style="line-height:normal">{{unSeenTrackingOrdersCount}}</div>
                            </div>
                        </div>                        
                    </a>
                </li>
            </ul>
        </div>
        <div id="orders" class="col s12 noOverflow">
            <div class="row noMargin">
                <div class="col s12 beRelative noPadding tabBorder" style="height:3rem">
                    <div class="beAbsolute centerInHeight fontSSmall_R" style="left:5%;">{{preferredLanguage.plate.plate.titles.plate}}</div>
                </div>
                <!-- Orders here -->
                <div class="col s12 noPadding" v-if="plate.length>0">
                    <div class="row noMargin">
                        <div v-for="order in plate" class="col s12 beRelative noPadding order orderBorder" style="height:3.5rem">
                            

                            <div class="beAbsolute centerInHeight fontSSmall_R semiBold" style="left:2%">x{{order.orderCount}}</div>

                            <div @click="navigateToOrderSettings(order)" class="beAbsolute centerInHeight fullHeight waves-effect z-indexLow" style="left:0;right:10%"></div>
                            
                            <div class="beAbsolute centerInHeight text" style="left:15%;width:70%">
                                <div class="fontSSmall_R semiBold">{{wireTitle(order.product.productName).content}}</div>
                                <div class="fontSVSmall_R"><span v-if="!order.selectedOption.normalFlag">({{wireTitle(order.selectedOption.option).content}})</span><span v-if="order.selectedExtras.length>0"> +{{order.selectedExtras.length}} {{preferredLanguage.plate.plate.titles.extra}}</span></div>
                            </div>

                            <div class="beAbsolute centerInHeight fullHeight" style="right:-0.50rem;width:15%">
                                <div @click="removeFromPlate(order)" class="beRelative fullWidth fullHeight">
                                    <div class="beAbsolute centerInHeight" style="height:40%;width:1px;left:0;background-color:#cecece"></div>
                                     <i class="tColorRed material-icons beAbsolute centerInCenter fontSLarge_R" style="left:60%">&#xe5cd</i>
                                </div>
                            </div>
                            
                        </div>
                        <div v-if="restaurantSettings.appType==='menuAndOrder'" class="col s12">
                            <div class="row" style="height:3.5rem;max-height:100px;margin-top:1rem;margin-bottom:0.5rem">
                                <div data-micromodal-trigger="modal-3" class="col s7 offset-s1 noPadding beRelative fullHeight" :style="{backgroundColor: dynamicColors.mainThemeColor.background ,color: dynamicColors.mainThemeColor.text}" style="border-radius:4px">
                                    <div class="beAbsolute centerInCenter fontSSmall_R fullWidth center">{{preferredLanguage.plate.plate.titles.sendOrder}}</div>
                                </div>
                                <div class="col s2 offset-s1 beRelative fullHeight">
                                    <div class="beAbsolute centerInCenter">
                                        <div class="beRelative">
                                            <!-- Modal Trigger -->
                                            <div data-micromodal-trigger="modal-1" class="beRelative fullWidth" style="height:2rem">
                                                <span class="beAbsolute centerInCenter" style="height:2rem;width:2rem">
                                                    <div class="beRelative fullWidth fullHeight">
                                                        <img src="../assets/categoryIcons_fordeveloping/note.png" class="beAbsolute centerInCenter fullWidth">
                                                        <i v-if="orderNote.length>0" class="material-icons beAbsolute fontSLarge_R boldFont" style="color:green;top:0.5rem;left:5px;transform:translate(50%,-50%)">&#xe5ca</i>
                                                        <div v-if="orderNote.length>0" class="beAbsolute" style="font-size:0.8rem;color:green;top:1.5rem;left:5px;transform:translate(40%,-70%)">{{preferredLanguage.plate.plate.orderNote.verifyingTitle}}</div>                                                        
                                                    </div>
                                                </span>
                                            </div>                                                                                         
                                            <div data-micromodal-trigger="modal-1" class="center fontSVSmall_R" style="line-height:1">{{preferredLanguage.plate.plate.orderNote.title}}</div>
                                        </div>
                                    </div>
                                            <!-- Modal Structure -->
                                            <div class="_modal micromodal-slide z-indexMedium" id="modal-1" aria-hidden="true">
                                                <div class="modal__overlay" data-micromodal-close>
                                                <div class="modal__container noPadding" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">

                                                    <div class="row noMargin borderRadius_toTop">
                                                        <div class="col s12 beRelative borderRadius_toTop" :style="{backgroundColor: dynamicColors.mainThemeColor.background ,color: dynamicColors.mainThemeColor.text}">
                                                             <h5 class="center semiBold fontSVSmall_R">{{preferredLanguage.plate.plate.orderNote.dialogTitle}}</h5>
                                                             <i data-micromodal-close class="material-icons beAbsolute centerInHeight" style="right:8px">&#xe5cd</i>
                                                        </div>
                                                        <div class="col s12">
                                                          <textarea v-model="l_orderNote" id="customOrderInput" class="materialize-textarea semiBold fontSVSmall_R" :placeholder="preferredLanguage.plate.plate.orderNote.placeholder"></textarea>
                                                        </div>
                                                    </div>


                                                </div>
                                                </div>
                                            </div>                                    
                                </div> 
                            </div>
                        </div>
                       
                    </div>
                    <div v-if="restaurantSettings.appType==='menuAndOrder'" style="height:2px;width:100%;background-color:#bdbdbd;margin-top:0.8rem"></div>

                    <div v-if="suggestedProducts.length>0" class="row noMargin">
                        <div class="col s12 semiBold fontSSmall_R" style="margin-top:1rem">{{preferredLanguage.plate.plate.titles.goesWellWith}}</div>
                        <div class="col s12 noPadding" style="margin-top:1rem;margin-bottom:2rem">
                            <!-- Swiper -->
                            <div class="swiper-container overFlowVisible">
                                <div class="swiper-wrapper">

                                    <div v-for="product in suggestedProducts" class="swiper-slide" :key="product.productUid">
                                        <div class="fullWidth beRelative suggestion borderBox" style="overflow:hidden; border-radius:2px">
                                            <div :id="product.productUid" class="beAbsolute fullWidth fullHeight centerInCenter waves-effect"></div>
                                                    <img v-on:load="arrangeProductImage($event)" :src="getImage(product.productImages.lowResolution)" class="beAbsolute centerInCenter productImage _fullWidth">
                                                <div :style="{backgroundColor:globalVariables.colors.fixedAppColor_filter}" class="beAbsolute fullWidth filter" style="padding:0 5px 0 5px;bottom:0;left:0;height:30%">
                                                    <div class="beRelative fullWidth fullHeight">
                                                        <div class="beAbsolute centerInCenter tColorWhite semiBold center fullWidth text addPaddingLAR-VS fontSSmall_R">{{wireTitle(product.productName).content}}</div>
                                                    </div>
                                                </div>
                                        </div>                                         

                                    </div> 
                                </div>
                                <!-- Add Pagination -->
                                <div class="swiper-pagination centerInWidth" style="bottom:-2rem;color:red"></div>
                            </div>
                        </div>
                    </div>

                    <div style="margin-bottom:5vh"></div>
                </div>
                <div class="col s12 noPadding semiBold center beRelative fontSMedium_R" style="margin-top:1.5rem;height:20rem" v-else>{{preferredLanguage.plate.plate.empty.content}}
                    <img src="../assets/tabakIcon.png"  class="beAbsolute centerInCenter"></div>
            </div>
        </div>
        <div v-if="restaurantSettings.appType==='menuAndOrder'" id="track" class="col s12">
            <div class="row noMargin">

                <!-- Order List here -->
                <div v-if="trackingOrders.length>0" class="col s12 noPadding" style="margin-bottom:20vmax">
                    
                        <div v-for="(orderPack,index) in trackingOrdersInOrder.slice().reverse()" class="row noMargin" style="margin-top:1rem !important">

                            <div class="right fontSVSmall_R" style="border:2px solid #78909c;border-radius:4px 4px 0 0;padding:2px">{{convertMstoDate(orderPack[0].orderDate)}}</div>

                            <div  class="col s12" style="height:2px;background-color:#78909c;margin-bottom:0.1rem"></div>

                            <div v-for="(order,_index) in orderPack" class="col s12 noPadding beRelative order orderBorder" style="height:3.5rem">
                                
                                <div v-if="order.orderType==='productRequest'" style="display:contents">
                                        <div class="beAbsolute centerInHeight fontSSmall_R semiBold" style="left:2%">x{{order.orderCount}}</div>

                                        <div class="beAbsolute centerInHeight text" style="left:15%;width:58%">
                                            <div class="fontSSmall_R semiBold">{{wireTitle(order.product.productName).content}}</div>
                                            <div class="fontSVSmall_R"><span v-if="!order.selectedOption.normalFlag">({{wireTitle(order.selectedOption.option).content}})</span><span v-if="order.selectedExtras.length>0"> +{{order.selectedExtras.length}} {{preferredLanguage.plate.plate.titles.extra}}</span></div>
                                        </div>                            

                                        <div v-if="index%2===0" class="beAbsolute centerInHeight text" style="right:2%;width:20%">
                                            <i class="material-icons displayBlock center fontSSmall_R" style="color:#34b7f1;">&#xe877</i>
                                            <p class="center noPadding noMargin" style="font-size:0.8rem">{{preferredLanguage.plate.track.orderStates.preparing}}</p>
                                        </div>

                                        <div v-else class="beAbsolute centerInHeight text" style="right:2%;width:20%">
                                            <i class="material-icons displayBlock center fontSSmall_R" style="color:#9e9e9e;">&#xe877</i>
                                            <p class="center noPadding noMargin fontSVSmall_R">{{preferredLanguage.plate.track.orderStates.delivered}}</p>
                                        </div>                                     
                                </div>

                                <div v-else-if="order.orderType==='specialRequest'" style="display:contents">

                                        <div class="beAbsolute centerInHeight fontSVSmall_R boldFont center" style="left:2%;width:15%">{{preferredLanguage.plate.track.orderTypes.specialRequest}}</div>
                                        
                                        <div class="beAbsolute centerInHeight" style="height:70%;width:1px;background-color:#cecece;left: 25%"></div>

                                        <div class="beAbsolute centerInHeight text" style="left:30%;width:45%">
                                            <div class="fontSVSmall_R semiBold">{{order.specialRequestContent}}</div>
                                        </div>
                                        <div v-if="index%2===0" class="beAbsolute centerInHeight text" style="right:2%;width:20%">
                                            <i class="material-icons displayBlock center fontSSmall_R" style="color:#34b7f1;">&#xe877</i>
                                            <p class="center noPadding noMargin" style="font-size:0.8rem">{{preferredLanguage.plate.track.orderStates.preparing}}</p>
                                        </div>

                                        <div v-else class="beAbsolute centerInHeight text" style="right:2%;width:20%">
                                            <i class="material-icons displayBlock center fontSSmall_R" style="color:#9e9e9e;">&#xe877</i>
                                            <p class="center noPadding noMargin fontSVSmall_R">{{preferredLanguage.plate.track.orderStates.delivered}}</p>
                                        </div>                                           
                                </div>

                                <div v-else-if="order.orderType==='orderNote'" style="display:contents;">
                                        <div class="beAbsolute fullWidth fullHeight" style="background-color:#fff3e0;top:0;left:0"></div>
                                        <div class="beAbsolute centerInHeight fontSVSmall_R semiBold  center" style="left:2%;width:20%">{{preferredLanguage.plate.track.orderTypes.orderNote}}</div>
                                        <div class="beAbsolute centerInHeight" style="height:70%;width:1px;background-color:#cecece;left:24%"></div>
                                        <div class="beAbsolute centerInHeight text" style="left:30%;width:70%">
                                            <div class="fontSVSmall_R semiBold">{{order.orderNote}}</div>
                                        </div>                            
                                </div>

                                <!--Check Request-->
                                <div v-else style="display:contents">
                                        <div class="beAbsolute fullWidth fullHeight" style="background-color:#e8f5e9;top:0;left:0"></div>

                                        <div class="beAbsolute centerInHeight fontSMedium_R semiBold  center" style="left:2%;width:70%">{{preferredLanguage.plate.track.orderTypes.checkRequest}}</div>

                                        <div class="beAbsolute centerInHeight text" style="right:2%;width:20%">
                                            <i class="material-icons displayBlock center fontSSmall_R" style="color:#9e9e9e;">&#xe877</i>
                                            <p class="center noPadding noMargin fontSVSmall_R">{{preferredLanguage.plate.track.orderStates.delivered}}</p>
                                        </div>                                         
                                </div>


                               
                            </div>
                        </div>
                </div>
                <div class="col s12 noPadding semiBold center beRelative fontSMedium_R" style="margin-top:1.5rem;height:20rem" v-else>{{preferredLanguage.plate.track.empty.content}}
                        <img src="../assets/binocularIcon.png" style="width:7rem;"  class="beAbsolute centerInCenter">
                </div>
                    <div @click="__sendCheckRequest()" class="fullWidth beFixed waves-effect z-depth-4" :style="{backgroundColor:globalVariables.colors.fixedAppColor_2}" style="bottom:0;left:0;height:12vmax;-webkit-transform: translateZ(0);">
                        <div class="beRelative fullWidth fullHeight">
                            <div style="line-height:1" class="beAbsolute centerInCenter center boldFont tColorWhite fontSLarge_R fullWidth">{{preferredLanguage.plate.track.checkRequest.title}}<br><span class="fontSSmall_R">{{preferredLanguage.plate.track.checkRequest.titleExp}}</span>
                            </div>
                        </div>
                    </div>                
            </div>
        </div>
    </div>
    <!-- Modal Structure(Order Delivered Notification) -->
    <div class="_modal micromodal-slide z-indexMedium" id="modal-2" aria-hidden="true">
        <div class="modal__overlay" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-2-title">
            <div class="fontSVSmall_R center beRelative" style="padding:35px 25px 25px 25px">
                <div class="center fontSMedium_R semiBold"> {{preferredLanguage.plate.plate.orderVerification.dialogTitle}}</div>
                <i class="material-icons fontSLLarge_R beAbsolute" style="right:7px;top:7px;color:green">&#xe86c</i>
                <div class="fullWidth" style="height:1px;backgroundColor:#cecece;margin-top:0.5rem;margin-bottom:1rem"></div>
                {{preferredLanguage.plate.plate.orderVerification.dialogContent}}
            </div>
        </div>
        </div>
    </div>

    <!-- Modal Structure(Send Order Verification) -->
    <div class="_modal micromodal-slide z-indexMedium" id="modal-3" aria-hidden="true">
        <div class="modal__overlay" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-3-title">
            <div class="fullWidth beRelative addPadding-S">
                <div class="center fontSMedium_R">{{preferredLanguage.plate.plate.orderValidation.message}}</div>
                <div class="fullWidth" style="height:1px;backgroundColor:#cecece;margin-top:0.5rem;margin-bottom:1rem"></div>
                <div class="row noMargin fullWidth tColorWhite" style="height:2.5rem">
                    <div data-micromodal-close class="col s5 fullHeight noPadding center beRelative" :style="{backgroundColor:globalVariables.colors.fixedAppColor_3}">
                        <div data-micromodal-close class="beAbsolute centerInCenter">{{preferredLanguage.plate.plate.orderValidation.buttons.cancel}}</div>
                    </div>
                    <div @click="_sendOrders($event)" class="col s7 fullHeight noPadding center beRelative semiBold waves-effect" :style="{backgroundColor:globalVariables.colors.fixedAppColor_2}">
                        <div class="beAbsolute centerInCenter fullWidth">{{preferredLanguage.plate.plate.orderValidation.buttons.confirm}}</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>

    <!-- Modal Structure(Send Check Request Verification) -->
    <div class="_modal micromodal-slide z-indexMedium" id="modal-checkVerification" aria-hidden="true">
        <div class="modal__overlay" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-3-title">
            <div class="fullWidth beRelative addPadding-S">
                <div class="center fontSMedium_R">{{preferredLanguage.plate.track.checkRequest.verification.message}}</div>
                <div class="fullWidth" style="height:1px;backgroundColor:#cecece;margin-top:0.5rem;margin-bottom:1rem"></div>
                <div class="row noMargin fullWidth tColorWhite" style="height:2.5rem">
                    <div data-micromodal-close class="col s5 fullHeight noPadding center beRelative" :style="{backgroundColor:globalVariables.colors.fixedAppColor_3}">
                        <div data-micromodal-close class="beAbsolute centerInCenter">{{preferredLanguage.plate.track.checkRequest.verification.buttons.cancel}}</div>
                    </div>
                    <div @click="_sendCheckRequest($event)" class="col s7 fullHeight noPadding center beRelative semiBold waves-effect" :style="{backgroundColor:globalVariables.colors.fixedAppColor_2}">
                        <div class="beAbsolute centerInCenter fullWidth">{{preferredLanguage.plate.track.checkRequest.verification.buttons.accept}}</div>
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
import { mapActions, mapMutations, mapState, mapGetters} from "vuex";

export default {
  name: 'plate',
  data(){
    return {
        l_orderNote : "",
        swiper : null
    }
  },
  methods : {

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
        
        var modal = event.target.parentElement.parentElement.parentElement.parentElement.parentElement
        if(!modal.id.includes("modal"))
            modal = modal.parentElement
        //fucking micromodal is broken with close rjrjrj
        //closing it manually
        modal.classList.remove("is-open")
        modal.setAttribute('aria-hidden', 'true');

        this.sendOrders().then(()=>{
            MicroModal.show("modal-2")
        })
    }, 
    __sendCheckRequest(){
        MicroModal.show("modal-checkVerification")
    },
    _sendCheckRequest(){

        var modal = document.getElementById("modal-checkVerification")
        //fucking micromodal is broken with close rjrjrj
        //closing it manually
        modal.classList.remove("is-open")
        modal.setAttribute('aria-hidden', 'true');  

        this.sendCheckRequest()
    },
    handleTrackingOrdersTabTap(){
        this.arrangeOrdersHeight()
        this.markTrackingOrdersSeen()
    },
      //helper functions
    convertMstoDate(miliseconds){
        var date = new Date(miliseconds)
        var hour = date.getHours()
        var minute = date.getMinutes()

        if(hour < 10)
            hour = '0' + hour
        if(minute < 10)
            minute = '0' + minute
            
        return hour + ":" + minute
    },
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
    getImage(relativeUrl){
        return this.globalVariables.serverAddress + relativeUrl
    },
    wireTitle(titles){
      return titles.find(title=>{return title.languageName === this.preferredLanguage_asString})
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
                var filterHeightRatio = 0.3
                
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

    initSwiper(){
        if(this.plate.length>0 && this.suggestedProducts.length>0){



            if(this.swiper){
                this.swiper.destroy()
            } 

            this.swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: false,
            },
            breakpoints: {
                769: {
                slidesPerView: 3,
                spaceBetween: 20,
                },
                550: {
                slidesPerView: 2,
                spaceBetween: 10,
                },
            },
            autoplay: {
                delay: 2000,
                disableOnInteraction: false                
            },
            loop: true,
            on: {
                    resize : this.arrangeSuggestions,
                    slideChangeTransitionStart	 : this.arrangeProductsImages,
                    tap : (event)=>{this.navigateToProduct(event.srcElement.id) }
                },
            });
        }
        
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
        "sendOrders",
        "sendCheckRequest"
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
       trackingOrdersInOrder(){
           var orderPackBag = []

           var currentOrderPackUid = null
           var targetOrderPack_leftIndex = -1
           var targetOrderPack_rightIndex 

           for(var i = targetOrderPack_leftIndex; i < this.trackingOrders.length;){

               targetOrderPack_leftIndex = i;

               for(var j = targetOrderPack_leftIndex+1; j < this.trackingOrders.length; j++){
                   if(!(this.trackingOrders[j].orderPackUid === currentOrderPackUid))
                    {
                        targetOrderPack_rightIndex = j-1;
                        currentOrderPackUid = this.trackingOrders[j].orderPackUid
                        break;
                    }else if(this.trackingOrders.length === j+1){
                        targetOrderPack_rightIndex = j
                    }
               }

                if(targetOrderPack_leftIndex > targetOrderPack_rightIndex)
                    targetOrderPack_rightIndex = targetOrderPack_leftIndex

               var tempOrderPack = []

               for(var k = targetOrderPack_leftIndex; k <= targetOrderPack_rightIndex && k > -1 ; k++)
                   tempOrderPack.push(this.trackingOrders[k])
                
               if(tempOrderPack.length > 0)
                    orderPackBag.push(tempOrderPack)
               
               i = targetOrderPack_rightIndex + 1
           }

           return orderPackBag
       },
       allProducts(){
           var allProducts = []
           this.categories.forEach(category=>{
               category.subCategories.forEach(subCategory=>{
                   subCategory.products.forEach(product=>{
                       allProducts.push(product)
                   })
               })
           })
           return allProducts
       },
    suggestedProducts(){
        var topProductConnections = []

        this.plate.forEach(order=>{
            var product = order.product
            var connection = this.connections.find(connection=>{return connection.productUid === product.productUid})
            var sortedProductConnections = connection.productConnections.slice(0)

            var getConnectionWeight = (productConnection)=>{return productConnection.connectionWeight_natural + productConnection.connectionWeight_artificial}
            
            sortedProductConnections.sort((a,b)=>{
                return ( getConnectionWeight(a) > getConnectionWeight(b)) ? -1 : 1
            })

            var productsInPlate = this.plate.map(order=>{return order.product})

            for(var i=0,counter=0; counter < 5 && i < sortedProductConnections.length; i++){
                var productIsInPlate = productsInPlate.find(product=>{return product.productUid === sortedProductConnections[i].connectedProductUid})
                if(productIsInPlate){
                    continue;
                }
                var alreadyExistingProductConnection = topProductConnections.find(productConnection=>{return productConnection.connectedProductUid === sortedProductConnections[i].connectedProductUid})
                if(alreadyExistingProductConnection)
                    alreadyExistingProductConnection.connectionWeight += getConnectionWeight(sortedProductConnections[i])
                else
                    topProductConnections.push({
                        connectedProductUid : sortedProductConnections[i].connectedProductUid,
                        connectionWeight : getConnectionWeight(sortedProductConnections[i])
                    })
                counter++
            }
        })    
        
        var suggestedProductConnections = topProductConnections.slice(0)
        suggestedProductConnections.sort((a,b)=>{return (a.connectionWeight > b.connectionWeight)?1:-1})

        var suggestedProducts = []

        suggestedProductConnections.forEach(productConnection=>{            
            var suggestedProduct = this.allProducts.find(product=>{return product.productUid === productConnection.connectedProductUid})
            suggestedProducts.push(suggestedProduct)
        })

        return suggestedProducts
    },       
      //mapState
      ...mapState([
          "preferredLanguage",
          "preferredLanguage_asString",
          "restaurantSettings"
      ]),
      ...mapState("modulePlate",[
          "plate",
          "orderNote",
          "trackingOrders"
      ]),
      ...mapState("moduleCategories",[
          "categories",
          "connections"
      ]),
      ...mapState("moduleSubCategories",[
          "subCategories"
      ]),
      //mapGetters
      ...mapGetters([
          "dynamicColors"
      ])
  },
  watch : {
      l_orderNote(newValue){
          this.updateOrderNote(newValue)
      },
      plate(){
          this.Vue.nextTick(()=>{
            this.initSwiper()
            this.swiper.update()
            this.arrangeSuggestions()
          })
      }
  },
  created(){
      window.addEventListener("resize",this.resize)
      window.scroll(0,-100)
  },
  destroyed(){
      window.removeEventListener("resize",this.resize)
  },
  mounted(){

        var el = document.querySelectorAll('.tabs');
        var instance = M.Tabs.init(el, {});


        this.initSwiper()

        this.arrangeOrdersHeight()

        this.arrangeSuggestions()

        MicroModal.init({
        awaitCloseAnimation: true, // [7] 
        });

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
.tabBorder{
    border-bottom : 1px solid #bdbdbd
}
.orderBorder{
    border-bottom : 1px solid #bdbdbd
}
.orderBorderDark{
    border-bottom : 2px solid #757575
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
