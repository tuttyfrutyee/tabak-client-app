<template>
  <div id="product" class="beAbsolute fullWidth" style="top:0px;left:0px;height:112vh">
      <div id="background_subCategories" class="backgroundCard"></div>
      
      <div class="row noMargin">

          <div class="col s12 beRelative noOverflow noPadding" style="height : 25vh">

                <div class="beAbsolute z-indexMedium" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="right:5%;top:8%;height:12vw;width:12vw;border-radius:50%;">
                    <div class="beRelative fullWidth fullHeight">
                        <div class="beAbsolute" style="left:2.1vw;bottom:0.2vw">
                            <i style="font-size:6.8vw" class="material-icons tColorWhite">alarm</i>
                        </div>
                        <div class="beAbsolute" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="width:5.1vw;height:5.1vw;border-radius:50%;right:1.8vw;top:1.5vw;font-size:4.3vw">
                            <div class="beRelative fullWidth fullHeight">
                                <div class="beAbsolute centerInCenter tColorWhite">{{selectedProduct.productDeliveryTime}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="imageFilter" class="beAbsolute fullWidth fullHeight centerInCenter border z-indexMedium blurMe"> </div>

				<div class="progressive-image beRelative fullWidth fullHeight">

					<img id="placeHolderImage" class="beAbsolute centerInCenter fullWidth" :src="selectedProduct.productImages.productIconImage" alt="">

					<img id="representImage" class="overlay beAbsolute centerInCenter fullWidth"></div>

		  </div>

          <div class="col s12 beRelative" style="height:9vh">
            <div class="beAbsolute centerInHeight" style="left:5%; width:95%">
                <p :style="lenght_fontSizeMatch(selectedProduct)" style="width:70%" class="noPadding noMargin boldFont font_family1">{{selectedProduct.productName}}</p>
            </div>
            <div class="beAbsolute font_family1" style="right:10%;font-size:1.7rem;right:5%;bottom:0.6rem">
                {{selectedProduct.productCost}} ₺
            </div>
          </div>
          <div class="col s12 noPadding" style="margin-top:8px">
            <div class="_line"></div>
          </div>
          <div id="mainPart" class="col s12 noPadding beRelative" style="max-height:18vh;min-height:13vh;margin-top:1vh">
              <div :class="summaryClass()" class="beAbsolute" :style="summaryStyle()" style="width:48%;left:5%;">
                  <p id="summaryParagraph" class="noMargin font_family1" style="color:#757575;font-size:1.1rem;max-height:17vh; overflow:scroll">
                      {{selectedOption.productOptionSummary}}
                  </p>
                  
                  <div v-if="checkSummaryLength()" :style="{backgroundColor:globalVariables.colors.helperThemeColor}" class="beAbsolute fullWidth" style="left:0;bottom:-3px;height:1px;"></div>

              </div>
              <div class="beAbsolute centerInHeight" style="width:35%;right:5%;height:10vw">
                  <div class="row fullHeight">
                      <div @click="decrementOrderCount" class="col s4 fullHeight beRelative optionBorder waves-effect" style="border-radius:5px 0px 0px 5px">
                          <i class="material-icons beAbsolute centerInCenter">
                              remove
                          </i>
                      </div>
                      <div class="col s4 fullHeight beRelative optionBorder">
                          <p class="beAbsolute noPadding noMargin center centerInCenter boldFont">{{orderCount}}</p>
                      </div>
                      <div @click="incrementOrderCount" class="col s4 fullHeight beRelative waves-effect waves-light addShadow_button" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="border-radius:0px 5px 5px 0px">
                          <i class="material-icons beAbsolute centerInCenter tColorWhite">
                              add
                          </i>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col s12" style="margin-top:10vh;height:13vh">
              <div class="row noMargin fullHeight">
                  <div class="col s6 input-field fullHeight">
                        <select v-model="selectedOption">
                            <option v-for="option in selectedProduct.productOptions" class="tColorBlack bColorRed" :value="option">{{option.productOptionName}}</option>
                        </select>
                        <label>Seçenekler</label>
                  </div>
                  <div class="col s6 fullHeight beRelative">

                      <!-- Modal Trigger -->
                      <div href="#modal1" :style="extrasStyle()"  class="eightWidth  beAbsolute centerInHeight modal-trigger" style="height:55%;border-radius:.3rem;right:3%">
                          <div class="beAbsolute centerInCenter noMargin noPadding boldFont center" style="font-size:1.4rem">Ekstralar</div>
                          <div v-if="selectedExtras.length>0" class="beAbsolute" style="width:8vw;height:8vw;right:-5%;top:-18%">
                              <div class="beRelative fullWidth fullHeight" :style="{backgroundColor:globalVariables.colors.helperThemeColor}" style="border-radius:50%">
                                  <div class="beAbsolute centerInCenter tColorWhite boldFont">{{selectedExtras.length}}</div>
                              </div>
                          </div>
                      </div>
                        <!-- Modal Structure -->
                        <div id="modal1" class="modal" style="border-radius:7px">
                            <div class="modal-content noPadding">
                                <div class="row fullWidth noMargin">
                                    <div class="col s12 beRelative" style="margin-bottom:1vh" :style="{backgroundColor:globalVariables.colors.mainThemeColor}">
                                        <h5 style="font-size:1.5rem" class="center tColorWhite boldFont">Ekstralar</h5>
                                        <i class="material-icons beAbsolute centerInHeight modal-close" :style="{color:globalVariables.colors.mainTextColor}" style="right:8px">close</i>
                                    </div>
                                    <div @click="toggleSelectedExtras(productExtra)" v-for="productExtra in selectedProduct.productExtras" class="col s12 beRelative noPadding waves-effect" style="height:11vh;border-top:1px solid #cecece;">
                                        <div class="beAbsolute centerInCenter font-family1 boldFont center addPaddingTAB-S" style="font-size:1.3rem;line-height: normal">
                                            {{productExtra.productExtraName}}
                                        </div>
                                        <div class="beAbsolute centerInHeight" style="left:5%">
                                            <i v-if="!isInsideSelectedExtras(productExtra)" style="font-size:7vw" class="material-icons">check_box_outline_blank</i>
                                            <i v-else class="material-icons" style="font-size:7vw">check_box</i>
                                        </div>
                                        <div class="beAbsolute centerInHeight font-family1" style="right:5%;font-size:1.1rem">+ {{productExtra.productExtraCost}} ₺</div>
                                    </div>
                                    <div class="col s12 beRelative" style="height:10vh" v-if="selectedProduct.productExtras.length===0">
                                        <div class="beAbsolute centerInCenter center fullWidth">
                                            Bu ürünün ekstrası bulunmamaktadır
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div :style="{backgroundColor:globalVariables.colors.helperThemeColor}"  class="modal-footer" style="height:1vh;margin-top:1vh">

                            </div>
                        </div>

                  </div>
              </div>
          </div>
            <div @click="_pushToPlate" class="fullWidth beFixed waves-effect" :style="{backgroundColor:globalVariables.colors.helperThemeColor}" style="bottom:0;left:0;height:12vh;-webkit-transform: translateZ(0);">
                <div class="beRelative fullWidth fullHeight">
                    <div class="beAbsolute centerInCenter boldFont tColorWhite" style="font-size:1.5rem;">
                        Tabağa Ekle
                    </div>
                    
                    <div class="beAbsolute centerInHeight" style="left:10%">
                        <img id="tabakIcon" src="../assets/tabakIcon.png" style="height:3.3rem;">
                        <div class="beAbsolute"  style="height:20px;width:20px;right:0%;top:0%">
                            <div class="beRelative fullWidth fullHeight" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="border-radius:50%">
                                <i class="material-icons beAbsolute centerInCenter tColorWhite" style="font-size:1.5rem">add</i>
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
import index from '../vuex_store';

export default {
  name: 'product',
  data(){
    return {
        selectedExtras : [],
        selectedOption : null,
        orderCount : 1,
        //for dummy
        paragraph : null,
        mainPart : null,
    }
  },
  methods : {
      toggleSelectedExtras(extra){
            var indexOfRemoval = this.selectedExtras.indexOf(extra)
            if(indexOfRemoval>-1)
                this.selectedExtras.splice(indexOfRemoval,1)
            else
                this.selectedExtras.push(extra)
      },
      isInsideSelectedExtras(extra){
          return this.selectedExtras.find(_extra=>{return _extra.productExtraName=== extra.productExtraName})
      },
      _pushToPlate(){
          this.pushToPlate({
              product : this.selectedProduct,
              selectedExtras : this.selectedExtras,
              selectedOption : this.selectedOption,
              orderCount : this.orderCount
          })
          this.$router.go(-1)
      },
      incrementOrderCount(){
          this.orderCount++
      },
      decrementOrderCount(){
          this.orderCount--
          if(this.orderCount < 1 )
            this.orderCount = 1
      },
      //view relateds
      checkSummaryLength(){
          if(this.paragraph && this.mainPart){
            return this.paragraph.offsetHeight > this.mainPart.offsetHeight
          }
          return false
      },
      customizeSelectionElement(){
          //not sure to finish
          var selectWrapper = document.getElementsByClassName("select-wrapper")[0]
          var input = selectWrapper.getElementsByClassName("select-dropdown")[0]
      },
      //classes
      summaryClass(){
          return {"centerInHeight" : !this.checkSummaryLength()}
      },
      //styles
      lenght_fontSizeMatch(product){
          if(product.productName.length > 20)
            return {"fontSize":"1.5rem"}
          else if(product.productName.length > 15)
            return {"fontSize" : "1.6rem"}
          return {"fontSize":"2.1rem"}
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
              "backgroundColor" : this.globalVariables.colors.mainThemeColor,
              "color" : this.globalVariables.colors.mainTextColor,
            "-webkit-box-shadow": "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",
            "box-shadow": "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)"
          }
      },
    //mapActions
    ...mapActions("moduleProduct",[
        "pushToPlate"
    ])
  },
  computed : {

      selectedOptionContents(){
          if(this.selectedOption.productOptionContents.length>0){
            this.selectedOption.productOptionContents[0].charAt(0).toUpperCase();
            return this.selectedOption.productOptionContents.join(", ")
          }
         return ""
      },
      //mapState
      ...mapState("moduleProduct",[
          "selectedProduct"
      ])
  },
  created(){

      this.selectedOption = this.selectedProduct.productOptions.find((option)=>{return option.productOptionName === 'Normal'})


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

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {startingTop:'40%',endingTop:'18%'});

    this.paragraph = document.getElementById("summaryParagraph")
    this.mainPart = document.getElementById("mainPart")

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
.modal{
  width : 85% !important;
}
</style>
