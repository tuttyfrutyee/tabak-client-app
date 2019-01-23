<template>
  <div id="product" class="beAbsolute fullWidth" style="top:0px;left:0px;min-height:112vmax">
      <div id="background_subCategories" class="backgroundCard"></div>
      
      <div class="row noMargin">

          <div class="col s12 beRelative noOverflow noPadding" style="height : 25vmax">

                <div class="beAbsolute z-indexMedium" :style="{backgroundColor:globalVariables.colors.fixedAppColor_1}" style="right:5%;top:8%;height:13vmin;width:13vmin;border-radius:50%;">
                    <div class="beRelative fullWidth fullHeight">
                        <div class="beAbsolute" style="z-index:-1;left:1.5vmin;bottom:0.9vmin">
                            <i style="font-size:6.8vmin" class="material-icons tColorWhite">&#xe855</i>
                        </div>
                        <div class="beAbsolute" style="z-index:1;right:1.8vmin;top:1.8vmin;width:6vmin;height:6vmin;border-radius:50%;font-size:4.3vmin">
                            <div class="beRelative fullWidth fullHeight">
                                <div class="beAbsolute centerInCenter tColorWhite">{{selectedProduct.productDeliveryTime}}<span style="font-size:2vmin;z-index:2">dk</span></div>
                                <div class="beAbsolute" style="bottom:0;left:-0.8vmin;width:4.6vmin;height:4.6vmin;border-radius:50%;z-index:-1" :style="{backgroundColor:globalVariables.colors.fixedAppColor_1}" ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="imageFilter" class="beAbsolute fullWidth fullHeight centerInCenter border z-indexMedium blurMe"> </div>

				<div class="progressive-image beRelative fullWidth fullHeight">

					<img id="placeHolderImage" class="beAbsolute centerInCenter fullWidth" :src="selectedProduct.productImages.productIconImage" alt="">

					<img id="representImage" class="overlay beAbsolute centerInCenter fullWidth">
                </div>

		  </div>

          <div id="header" class="col s12 beRelative" style="height:10vmax">
            <div class="beAbsolute centerInHeight" style="left:5%; width:95%;">
                <p id="productName" style="width:70%" class="noPadding noMargin boldFont font_family1 fluidFont-XL">{{selectedProduct.productName}}</p>
            </div>
            <div class="beAbsolute font_family1 fluidFont-XL" style="right:10%;right:5%;bottom:0.6rem">
                {{selectedProduct.productCost}} ₺
            </div>
          </div>
          <div class="col s12 noPadding" style="margin-top:8px">
            <div class="_line"></div>
          </div>
          <div id="mainPart" class="col s12 noPadding beRelative" style="max-height:18vmax;min-height:13vmax;margin-top:1.5vmax">
              <div :class="summaryClass()" class="beAbsolute" :style="summaryStyle()" style="width:48%;left:5%;">
                  <p id="summaryParagraph" class="noMargin font_family1 fluidFont-M" style="color:#757575;max-height:17vmax; overflow:scroll">
                      {{orders[0].selectedOption.productOptionSummary}}
                  </p>
                  
                  <div v-if="checkSummaryLength()" :style="{backgroundColor:globalVariables.colors.helperThemeColor}" class="beAbsolute fullWidth" style="left:0;bottom:-3px;height:1px;"></div>

              </div>
              <div class="beAbsolute centerInHeight" style="width:35vmin;right:5%;height:10vmin">
                  <div class="row fullHeight fluidFont-M">
                      <div @click="decrementOrderCount" class="col s4 fullHeight beRelative optionBorder waves-effect" style="border-radius:5px 0px 0px 5px">
                          <i class="material-icons beAbsolute centerInCenter">
                              &#xe15b
                          </i>
                      </div>
                      <div class="col s4 fullHeight beRelative optionBorder">
                          <p class="beAbsolute noPadding noMargin center centerInCenter boldFont">{{orders.length}}</p>
                      </div>
                      <div @click="incrementOrderCount" class="col s4 fullHeight beRelative waves-effect waves-light addShadow_button" :style="{backgroundColor:globalVariables.colors.fixedAppColor_1}" style="border-radius:0px 5px 5px 0px">
                          <i class="material-icons beAbsolute centerInCenter tColorWhite">
                              &#xe145
                          </i>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col s12" style="margin-top:10vmax;margin-bottom:18vmax">
              <div v-for="(order,index) in orders" style="height:13vmax;" class="row noMargin addPaddingL-S" :key="index">
                  <div v-if="orders.length>1" class="col s12 beRelative noPadding" style="margin-bottom:1vmax">
                      <div class="fluidFont-M"><span class="boldFont">{{index+1}}</span>. ürün</div>
                      <div style="width:20%;height:1px;background-color:#424242"></div>
                  </div>
                  <div class="col s6 beRelative noPadding">
                        <label class="fluidFont-S">Seçenekler</label>
                        <select v-if="selectedProduct.productOptions.length<2" disabled class="fullWidth fluidFont-M browser-default noMargin" style="height:6vmax" v-model="order.selectedOption">
                            <option v-for="option in selectedProduct.productOptions" :value="option" class="fluidFont-M" :key="option.optionName">{{option.productOptionName}}</option>
                        </select>
                        <select v-else class="fullWidth fluidFont-M browser-default noMargin" style="height:6vmax" v-model="order.selectedOption">
                            <option v-for="option in selectedProduct.productOptions" :value="option" class="fluidFont-M" :key="option.optionName">{{option.productOptionName}}</option>
                        </select>
                        <div v-if="selectedProduct.productOptions.length>1" class="beAbsolute fullWidth" style="bottom:-1px;height:2px;backgroundColor:#424242;"></div>
                  </div>
                  <div class="col s6 fullHeight beRelative">

                      <!-- Modal Trigger -->
                      <div :data-micromodal-trigger="'modal-'+index" :href="'#modal'+index" :style="extrasStyle()"  class="eightWidth  beAbsolute centerInHeight modal-trigger" style="height:55%;border-radius:.3rem;right:3%">
                          <div class="beAbsolute centerInCenter noMargin noPadding boldFont center fluidFont-L">Ekstralar</div>
                          <div v-if="order.selectedExtras.length>0" class="beAbsolute" style="width:8vmin;height:8vmin;right:-5%;top:-18%">
                              <div class="beRelative fullWidth fullHeight" :style="{backgroundColor:globalVariables.colors.helperThemeColor}" style="border-radius:50%">
                                  <div class="beAbsolute centerInCenter tColorWhite boldFont fluidFont-M">{{order.selectedExtras.length}}</div>
                              </div>
                          </div>
                      </div>  

 
                    <!-- Modal Content -->
                    <div class="modal micromodal-slide z-indexMedium" :id="'modal-'+index" aria-hidden="true">
                        <div  style="z-index:2000;" class="modal__overlay" data-micromodal-close>
                            <div class="modal__container" style="opacity : 1" aria-modal="true" >
                                    <div class="row fullWidth noMargin">
                                        <div class="col s12 beRelative" style="margin-bottom:1vmax" :style="{backgroundColor:globalVariables.colors.fixedAppColor_1}">
                                            <div class="center tColorWhite boldFont fluidFont-XL">Ekstralar</div>
                                            <i data-micromodal-close class="material-icons beAbsolute centerInHeight modal-close fluidFont-L" :style="{color:globalVariables.colors.mainTextColor}" style="right:8px">&#xe5cd</i>
                                        </div>
                                        <div @click="toggleSelectedExtras({productExtra,order})" v-for="productExtra in selectedProduct.productExtras" class="col s12 beRelative noPadding waves-effect" style="height:11vmax;border-top:1px solid #cecece;" :key="productExtra.productExtraName">
                                            <div class="beAbsolute centerInCenter font-family1 boldFont center addPaddingTAB-S fluidFont-L" style="line-height: normal">{{productExtra.productExtraName}}</div>
                                            <div class="beAbsolute centerInHeight" style="left:5%">
                                                <i v-if="!isInsideSelectedExtras({productExtra,order})" class="material-icons fluidFont-XL">&#xe835</i>
                                                <i v-else class="material-icons fluidFont-XL">&#xe834</i>
                                            </div>
                                            <div class="beAbsolute centerInHeight font-family1 fluidFont-M" style="right:5%;">+ {{productExtra.productExtraCost}} ₺</div>
                                        </div>
                                        <div class="col s12 beRelative" style="height:10vmax" v-if="selectedProduct.productExtras.length===0">
                                            <div class="beAbsolute centerInCenter center fullWidth">
                                                Bu ürünün ekstrası bulunmamaktadır
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>


                  </div>
              </div>
          </div>
            <div @click="_pushToPlate" class="fullWidth beFixed waves-effect z-depth-4" :style="{backgroundColor:globalVariables.colors.helperThemeColor}" style="bottom:0;left:0;height:12vmax;-webkit-transform: translateZ(0);">
                <div class="beRelative fullWidth fullHeight">
                    <div class="beAbsolute centerInCenter boldFont tColorWhite fluidFont-XL">
                        Tabağa Ekle
                    </div>
                    
                    <div class="beAbsolute centerInHeight" style="left:10%">
                        <img id="tabakIcon_product" src="../assets/tabakIcon.png" style="height:8.5vmax">
                        <div class="beAbsolute"  style="height:3vmax;width:3vmax;right:0%;top:0%">
                            <div class="beRelative fullWidth fullHeight" :style="{backgroundColor:globalVariables.colors.fixedAppColor_1}" style="border-radius:50%">
                                <i class="material-icons beAbsolute centerInCenter tColorWhite fluidFont-L">&#xe145</i>
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
  name: 'product',
  data(){
    return {
        orders : [],
        //for dummy
        paragraph : null,
        mainPart : null,
    }
  },
  methods : {
      toggleSelectedExtras(details){
            var extra = details.productExtra;
            var order = details.order;

            var indexOfRemoval = order.selectedExtras.indexOf(extra)
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
          this.addTodoAnimation({type:'lazy',name:'icon'})
      },
      incrementOrderCount(){
          this.orders.push({
              product : this.selectedProduct,
              selectedExtras : [],
              selectedOption : this.selectedProduct.productOptions.find((option)=>{return option.productOptionName === 'Normal'}),
              orderCount : 1
          })
          setTimeout(()=>{
              this.initModals();
          },0)
      },
      decrementOrderCount(){
          if(this.orders.length > 1){
              this.orders.pop();
          }
          setTimeout(()=>{
              this.initModals();
          },0)
      },
      //view relateds
      checkSummaryLength(){
          if(this.paragraph && this.mainPart){
            return this.paragraph.offsetHeight > this.mainPart.offsetHeight
          }
          return false
      },
      //classes
      summaryClass(){
          return {"centerInHeight" : !this.checkSummaryLength()}
      },
      //styles
      setHeaderHeight(){

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
          if(this.checkSummaryLength())
            return {"top":"2%"}
          return {}
      },
      extrasStyle(){
          if(this.selectedProduct.productExtras.length===0)
            return {
                "backgroundColor" : "#e0e0e0",
                "color" : "#9e9e9e"
            }
          return {
              "backgroundColor" : this.globalVariables.colors.fixedAppColor_1,
              "color" : this.globalVariables.colors.mainTextColor,
            "-webkit-box-shadow": "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",
            "box-shadow": "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)"
          }
      },
      initModals(){
          MicroModal.init({
              disableScroll: true
          });
      },
      resize(){
          this.setHeaderHeight();
      },
    //mapActions and mutations
    ...mapActions("moduleProduct",[
        "pushToPlate"
    ]),
    ...mapActions("moduleAnimations",[
        "addTodoAnimation"
    ])

  },
  computed : {

      //mapState
      ...mapState("moduleProduct",[
          "selectedProduct"
      ])
  },
  created(){

      this.incrementOrderCount();

      window.addEventListener('resize', this.resize);
      
      window.scroll(0,0)

  },
  destroyed(){
      window.removeEventListener('resize',this.resize)
  },
  mounted(){


    var image = new Image();
    image.src = this.selectedProduct.productImages.productRepresentImage

    var previewImage = document.getElementById("placeHolderImage")
    var newImage = document.getElementById("representImage")
    var imageFilter = document.getElementById("imageFilter")

    image.onload = function(){
      newImage.src = image.src
      newImage.style.opacity = 1
      imageFilter.style.opacity = 1
      previewImage.style.opacity = 0
    };


    this.paragraph = document.getElementById("summaryParagraph")
    this.mainPart = document.getElementById("mainPart")

    this.setHeaderHeight();



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
	transition: opacity 200ms ease-in;
}
#imageFilter{
	opacity: 0;
	transition: opacity 200ms ease-in;
}
#previewImage{
	transition: opacity 200ms ease-in;
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

</style>
