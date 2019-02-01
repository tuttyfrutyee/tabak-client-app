<template>
  <div v-if="selectedProduct" id="product" class="beAbsolute fullWidth" style="top:0px;left:0px;">
      <div id="background_subCategories" class="backgroundCard"></div>
      
      <div class="row noMargin beRelative">

              <div v-if="!orderSettingsMode"  @click="goBack()" class="beAbsolute z-indexHigh" style="height:3.2rem;width:3.2rem;min-height:56px;left:0;top:0">
                  <div class="beRelative fullWidth fullHeight">
                    <div class="beAbsolute centerInHeight" style="left:3vmin;width:1.6rem;height:1.6rem;border-radius:50%;background-color:#424242">
                        <div class="beRelative fullHeight fullWidth">
                            <i class="beAbsolute centerInCenter material-icons tColorWhite fontSMedium_R">&#xe5cb</i>
                        </div>
                    </div>
                  </div>
              </div>

                <div class="beAbsolute z-indexMedium" :style="{backgroundColor:globalVariables.colors.fixedAppColor_background_1}" style="right:0.7rem;top:0.7rem;height:3rem;width:3rem;border-radius:50%;">
                    <div class="beRelative fullWidth fullHeight">
                        <div class="beAbsolute centerInCenter" style="width:2.5rem;height:3.2rem">
                            <div class="beRelative fullWidth tColorWhite fullHeight">

                                <div class="beAbsolute centerInWidth" style="z-index:-1;bottom:-0.1rem">
                                    <i class="material-icons fontSMedium_R">&#xe855</i>
                                </div>
                                
                                <div class="beAbsolute centerInWidth fontSSmall_R" style="z-index:1;top:0.5rem;width:1rem;height:1rem;border-radius:50%">
                                    <div class="beRelative fullWidth fullHeight">
                                        <div class="beAbsolute centerInCenter" style="z-index:2">{{selectedProduct.productDeliveryTime}}<span style="font-size:0.6rem">{{preferredLanguage.product.product.titles.minuteShorted}}</span></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>              
  

          <div class="col s12 m8 offset-m2 beRelative noOverflow noPadding" style="height :27vmax">

				<div class="progressive-image beRelative fullWidth fullHeight">

					<img id="placeHolderImage" class="beAbsolute centerInCenter fullWidth" :src="selectedProduct.productImages.productIconImage">

					<img id="representImage" class="overlay beAbsolute centerInCenter fullWidth">
                </div>

		  </div>

          <div id="header" class="col s12 beRelative topShadow" style="height:3rem">
            <div class="beAbsolute centerInHeight" style="left:5%; width:95%;">
                <p id="productName" style="width:70%" class="noPadding noMargin boldFont font_family2 fontSLarge_R">{{selectedProduct.productName}}</p>
            </div>
            <div class="beAbsolute font_family1 fontSMedium_R" style="right:10%;right:5%;bottom:0.3rem">
                {{selectedProduct.productCost}} ₺
            </div>
          </div>

          <div class="col s12 noPadding" style="margin-top:8px">
            <div class="_line"></div>
          </div>

          <div id="mainPart" class="col s12 noPadding beRelative" style="height:5rem;margin-top:0.8rem">
              <div :class="summaryClass()" class="beAbsolute" :style="summaryStyle()" style="width:48%;left:5%;">
                  <p id="summaryParagraph" class="noMargin font_family1" :style="{color:globalVariables.colors.fixedAppColor_text_3}" style="font-size:0.8rem;max-height:6rem; overflow:scroll">
                      {{selectedProduct.productOptions[0].productOptionSummary}}
                  </p>
                  
                  <div v-if="checkSummaryLength()" :style="{backgroundColor:globalVariables.options.colors.dynamicAppColor_helperThemeColor}" class="beAbsolute fullWidth" style="left:0;bottom:-3px;height:1px;"></div>

              </div>
              <div class="beAbsolute centerInHeight" style="width:30%;max-width:8rem;right:8%;height:2rem">
                  <div class="row fullHeight fontSVSmall_R">
                      <div @click="decrementOrderCount" class="col s4 fullHeight beRelative optionBorder waves-effect" style="border-radius:5px 0px 0px 5px">
                          <i class="material-icons beAbsolute center centerInCenter">
                              &#xe15b
                          </i>
                      </div>
                      <div class="col s4 fullHeight beRelative optionBorder">
                          <p class="beAbsolute noPadding noMargin center centerInCenter boldFont">{{orders.length}}</p>
                      </div>
                      <div @click="incrementOrderCount" class="col s4 fullHeight beRelative waves-effect waves-light addShadow_button" :style="{backgroundColor:globalVariables.colors.fixedAppColor_background_1}" style="border-radius:0px 5px 5px 0px">
                          <i class="material-icons beAbsolute centerInCenter center tColorWhite">
                              &#xe145
                          </i>
                      </div>
                  </div>
              </div>
          </div>

          <div class="col s12" style="margin-top:2.5rem;margin-bottom:20vmax">
              <div v-for="(order,index) in orders" style="height:13vmax;" class="row noMargin addPaddingL-S" :key="index">
                  <div v-if="orders.length>1" class="col s12 m10 offset-m1 l8 offset-l2 beRelative noPadding" style="margin-bottom:1vmax">
                      <div class="fontSVSmall_R"><span class="boldFont">{{index+1}}</span>. {{preferredLanguage.product.product.titles.product}}</div>
                      <div style="width:20%;height:1px;background-color:#424242"></div>
                  </div>
                  <div class="col s6 m5 offset-m1 l4 offset-l2 beRelative noPadding">
                        <label class="fluidFont-S">{{preferredLanguage.product.product.titles.options}}</label>
                        <select v-if="selectedProduct.productOptions.length<2" disabled class="fullWidth fontSVSmall_R browser-default noMargin" style="height:6vmax" v-model="order.selectedOption">
                            <option v-for="option in selectedProduct.productOptions" :value="option" class="fontSVSmall_R" :key="option.optionName">{{option.productOptionName}}</option>
                        </select>
                        <select v-else class="fullWidth fontSVSmall_R browser-default noMargin" style="height:6vmax" v-model="order.selectedOption">
                            <option v-for="option in selectedProduct.productOptions" :value="option" class="fontSVSmall_R" :key="option.optionName">{{option.productOptionName}}</option>
                        </select>
                        <div v-if="selectedProduct.productOptions.length>1" class="beAbsolute fullWidth" style="bottom:-1px;height:2px;backgroundColor:#424242;"></div>
                  </div>
                  <div class="col s6 m5 l4 fullHeight beRelative">

                      <!-- Modal Trigger - 1 -->
                      <div v-if="selectedProduct.productExtras.length!==0" :data-micromodal-trigger="'modal-'+index" :href="'#modal'+index" :style="extrasStyle()"  class="eightWidth  beAbsolute centerInHeight" style="height:55%;border-radius:3px;right:3%">
                          <div class="beAbsolute centerInCenter noMargin noPadding boldFont center fontSSmall_R">{{preferredLanguage.product.product.titles.extras}}</div>
                          <div v-if="order.selectedExtras.length>0" class="beAbsolute" style="width:1.8rem;height:1.8rem;right:-5%;top:-18%">
                              <div class="beRelative fullWidth fullHeight" :style="{backgroundColor:globalVariables.options.colors.dynamicAppColor_helperThemeColor,color:globalVariables.options.colors.dynamicAppColor_helperTheme_textColor}" style="border-radius:50%">
                                  <div class="beAbsolute centerInCenter boldFont fontSVSmall_R">{{order.selectedExtras.length}}</div>
                              </div>
                          </div>
                      </div>  

                      <!-- Modal Trigger - 2 -->
                      <div v-else :style="extrasStyle()"  class="eightWidth  beAbsolute centerInHeight" style="height:55%;border-radius:3px;right:3%">
                          <div class="beAbsolute centerInCenter noMargin noPadding boldFont center fontSSmall_R">{{preferredLanguage.product.product.titles.extras}}</div>
                          </div>
                      </div>                       

 
                    <!-- Modal Content -->
                    <div class="_modal micromodal-slide z-indexHigh" :id="'modal-'+index" aria-hidden="true">
                        <div  class="modal__overlay" data-micromodal-close>
                            <div class="modal__container" style="opacity : 1" aria-modal="true" >
                                    <div class="row fullWidth noMargin">
                                        <div class="col s12 beRelative tColorWhite" style="margin-bottom:1vmax" :style="{backgroundColor:globalVariables.colors.fixedAppColor_background_1}">
                                            <div class="center boldFont fontSMedium_R">{{preferredLanguage.product.product.titles.extras}}</div>
                                            <i data-micromodal-close class="material-icons beAbsolute centerInHeight modal-close fontSMedium_R" style="right:8px">&#xe5cd</i>
                                        </div>
                                        <div @click="toggleSelectedExtras({productExtra,order})" v-for="productExtra in selectedProduct.productExtras" class="col s12 beRelative noPadding waves-effect" style="height:10vmax;border-top:1px solid #cecece;" :key="productExtra.productExtraName">
                                            <div class="beAbsolute centerInCenter font-family1 boldFont center addPaddingTAB-S fontSSmall_R" style="line-height: normal">{{productExtra.productExtraName}}</div>
                                            <div class="beAbsolute centerInHeight" style="left:5%">
                                                <i v-if="!isInsideSelectedExtras({productExtra,order})" class="material-icons fontSMedium_R">&#xe835</i>
                                                <i v-else class="material-icons fontSMedium_R">&#xe834</i>
                                            </div>
                                            <div class="beAbsolute centerInHeight font-family1" style="font-size:0.9rem;right:5%;">+ {{productExtra.productExtraCost}} ₺</div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>


                  </div>
              </div>
          </div>
            <div v-if="!orderSettingsMode" @click="_pushToPlate" class="fullWidth beFixed waves-effect z-depth-4" :style="{backgroundColor:globalVariables.options.colors.dynamicAppColor_helperThemeColor,color:globalVariables.options.colors.dynamicAppColor_helperTheme_textColor}" style="bottom:0;left:0;height:12vmax;-webkit-transform: translateZ(0);">
                <div class="beRelative fullWidth fullHeight">
                    <div class="beAbsolute centerInCenter boldFont tColorWhite fontSLarge_R">{{preferredLanguage.product.product.titles.addToPlate}}</div>
                    
                    <div class="beAbsolute centerInHeight" style="left:10%">
                        <img id="tabakIcon_product" src="../assets/tabakIcon.png" style="height:3rem">
                        <div class="beAbsolute"  style="height:1rem;width:1rem;right:0%;top:0%">
                            <div class="beRelative fullWidth fullHeight" :style="{backgroundColor:globalVariables.colors.fixedAppColor_background_1}" style="border-radius:50%">
                                <i class="material-icons beAbsolute centerInCenter tColorWhite fontSVSmall_R">&#xe145</i>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div v-else class="fullWidth beFixed waves-effect z-depth-4" style="bottom:0;left:0;height:9vmax;-webkit-transform: translateZ(0);">
                <div class="row noMargin fullHeight fullWidth noPadding">
                    <div @click="cancelOrderSettingsChanges()" :style="{backgroundColor:globalVariables.colors.fixedAppColor_3}" class="col s4 noPadding fullHeight beRelative waves-effect">
                        <div class="beAbsolute centerInCenter fullWidth center fontSSmall_R tColorWhite">{{preferredLanguage.product.productSettings.titles.cancel}}</div>
                    </div>
                    <div @click="applyOrderSettingsChanges()" :style="{backgroundColor:globalVariables.colors.fixedAppColor_5}" class="col s8 noPadding fullHeight beRelative center waves-effect">
                        <div class="beAbsolute centerInCenter fullWidth fontSSmall_R tColorWhite">{{preferredLanguage.product.productSettings.titles.saveChanges}}</div>
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
  name: 'product',
  data(){
    return {
        orders : [],
        //for orderSettingsMode
        orderSettingsMode : false,
        initialOrders : [],
        //for dummy
        paragraph : null,
        mainPart : null,
        trigger : false,

    }
  },
  methods : {
      toggleSelectedExtras(details){
            var extra = details.productExtra;
            var order = details.order;

            var indexOfRemoval = -1
            var counter = 0
            for(let _extra of order.selectedExtras){
                if(_extra.productExtraName === extra.productExtraName)
                    indexOfRemoval = counter
                counter++
            }

            if(indexOfRemoval>-1)
                order.selectedExtras.splice(indexOfRemoval,1)
            else
                order.selectedExtras.push(extra)
      },
      isInsideSelectedExtras(details){
          var order = details.order;
          var extra = details.productExtra;
          return order.selectedExtras.find(_extra=>{return _extra.productExtraName=== extra.productExtraName})
      },
      _pushToPlate(){
          this.orders.forEach(order=>{this.pushToPlate(order)})
          this.$router.go(-1)
          //be sure the product is not added from suggestions menu
          if(this.routeHistory[this.routeHistory.length-2].includes("subCategories"))
             this.addTodoAnimation({type:'lazy',name:'icon'})
      },
      incrementOrderCount(){
          this.orders.push({
              product : this.selectedProduct,
              selectedExtras : [],
              selectedOption : this.normalOption,
              orderCount : 1
          })
          this.Vue.nextTick(()=>{
              this.initModals();
          })
      },
      decrementOrderCount(){
          if(this.orders.length > 1){
              this.orders.pop();
          }
          this.Vue.nextTick(()=>{
              this.initModals();
          })
      },
      goBack(){
          this.$router.go(-1)
      },
      //for order settings
      cancelOrderSettingsChanges(){
          this.$router.go(-1)
      },
      applyOrderSettingsChanges(){

          this.kickAndReplaceOrder({
              order_willBeKicked : this.initialOrders,
              orders_willReplace : this.orders
          })

          this.$router.go(-1)
      },
      //helper functions
      deepCopyArray(targetArray) {
        return JSON.parse(JSON.stringify(targetArray));
      },
      //view relateds
      checkSummaryLength(){
          var dummy = this.trigger
        
          var threshold = 5

          if(this.paragraph && this.mainPart){
            return this.paragraph.offsetHeight+ threshold > this.mainPart.offsetHeight  
          }
          return false
      },
      //classes
      summaryClass(){
          var dummy = this.trigger          
          return {"centerInHeight" : !this.checkSummaryLength()}
      },
      //styles
      setHeaderHeight(){
            var dummy = this.trigger

            var header = document.getElementById("header")
            var productName = document.getElementById("productName")
            if(productName.offsetHeight > (header.offsetHeight * (0.8))){
                header.style.height = productName.offsetHeight + 5 + 'px'
            }else{
                var fittedHeight = productName.offsetHeight + 5
                header.style.height = '10vmax'
                if(header.offsetHeight < fittedHeight)
                    header.style.height = fittedHeight + 'px'
            }

      },
      summaryStyle(){
          var dummy = this.trigger

          if(this.checkSummaryLength())
            return {"top":"2%"}
          return {}
      },
      extrasStyle(){
          var dummy = this.trigger

          if(this.selectedProduct.productExtras.length===0)
            return {
                "backgroundColor" : "#e0e0e0",
                "color" : "#9e9e9e"
            }
          return {
              "backgroundColor" : this.globalVariables.colors.fixedAppColor_background_1,
              "color" : this.globalVariables.colors.fixedAppColor_text_4,
            "-webkit-box-shadow": "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",
            "box-shadow": "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)"
          }
      },
      initModals(){
          MicroModal.init({
              disableScroll: false
          });
      },
      resize(){
          this.setHeaderHeight();
          this.trigger = !this.trigger
      },
    //mapActions and mutations
    ...mapMutations("moduleProduct",[
        "updateOrderSelectedToBeChanged"
    ]),
    ...mapActions("modulePlate",[
        "kickAndReplaceOrder"
    ]),
    ...mapActions("moduleProduct",[
        "pushToPlate"
    ]),
    ...mapActions("moduleAnimations",[
        "addTodoAnimation"
    ])

  },
  computed : {

      normalOption(){
          if(this.selectedProduct)
            return this.selectedProduct.productOptions.find((option)=>{return option.productOptionName === 'Normal'})
      },
      //mapState
      ...mapState([
          "preferredLanguage",
          "routeHistory"
      ]),
      ...mapState("moduleProduct",[
          "selectedProduct",
          //for orderSettings mode
          "orderSelectedToBeChanged"
      ])
  },
  created(){

        window.addEventListener('resize', this.resize);
        
        window.scroll(0,-100)
      
      if(this.selectedProduct){
        
        //check if we are in settings mode and set off the orderSettingsMode
        this.orderSettingsMode = this.$route.path.includes("orderSettings")
        if(this.orderSettingsMode){    
            
            for(var i = 0; i < this.orderSelectedToBeChanged.orderCount; i++){
                
                this.orders.push({
                    orderCount : 1,
                    product : this.orderSelectedToBeChanged.product,
                    selectedExtras : this.deepCopyArray(this.orderSelectedToBeChanged.selectedExtras),
                    selectedOption : this.deepCopyArray(this.orderSelectedToBeChanged.selectedOption),
                })

                this.initialOrders.push({
                    orderCount : 1,
                    product : this.orderSelectedToBeChanged.product,
                    selectedExtras : this.deepCopyArray(this.orderSelectedToBeChanged.selectedExtras),
                    selectedOption : this.deepCopyArray(this.orderSelectedToBeChanged.selectedOption),                    
                })
            }

            this.updateOrderSelectedToBeChanged(null)
        }
        else{
            //initial order count setting
            this.incrementOrderCount();
        }
      }
      else console.log("no product has been chosen")


  },
  destroyed(){
      window.removeEventListener('resize',this.resize)
  },
  mounted(){

    if(this.selectedProduct){

        var image = new Image();
        image.src = this.selectedProduct.productImages.productRepresentImage

        var previewImage = document.getElementById("placeHolderImage")
        var newImage = document.getElementById("representImage")

        image.onload = function(){
        newImage.src = image.src
        newImage.style.opacity = 1
        previewImage.style.opacity = 0
    };


        this.paragraph = document.getElementById("summaryParagraph")
        this.mainPart = document.getElementById("mainPart")

        this.setHeaderHeight();

        this.Vue.nextTick(()=>{this.initModals()})
    }




  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.border{
    border: 4px solid rgba(0,0,0,0.6);
    border-top : 5px solid black

}
.blurMe
{
      /* Add the blur effect */
  filter: blur(10px);
  -webkit-filter: blur(10px);
}

#placeHolderImage  {
    filter: blur(5px);
}

#representImage {
	opacity: 0;
	transition: opacity 100ms ease-in;
}
#imageFilter{
	opacity: 0;
	transition: opacity 100ms ease-in;
}
#previewImage{
	transition: opacity 100ms ease-in;
}
._line{
    width: 90%;
    height : 1px;
    background-color : #cecece;
    margin : 0px auto;
}
.font_family1{
    font-family: 'Sarabun', sans-serif;
}
.font_family2{
    font-family: 'Aleo', serif;
}

.optionBorder{
    border : 1px solid #cecece;
}
.cut-text { 
  text-overflow: ellipsis !important;
  overflow: hidden !important; 
}

select{
    display: block !important;
}

.topShadow{
    -webkit-box-shadow: 0px -2px 12px -2px rgba(0,0,0,0.14);
    -moz-box-shadow: 0px -2px 12px -2px rgba(0,0,0,0.14);
    box-shadow: 0px -2px 12px -2px rgba(0,0,0,0.14);
}

</style>
