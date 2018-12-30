<template>
  <div id="product" class="beAbsolute fullWidth" style="top:0px;left:0px;height:112vh">
      <div id="background_subCategories" class="backgroundCard"></div>
      
      <div class="row noMargin">

          <div class="col s12 beRelative noOverflow noPadding" style="height : 25vh">

                <div class="beAbsolute z-indexMedium" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="right:5%;top:8%;height:12vw;width:12vw;border-radius:50%;">
                    <div class="beRelative fullWidth fullHeight">
                        <div class="beAbsolute" style="left:15%;bottom:0%">
                            <i class="material-icons tColorWhite">alarm</i>
                        </div>
                        <div class="beAbsolute" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="width:5vw;height:5vw;border-radius:50%;right:15%;top:18%">
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

          <div class="col s12 beRelative" style="height:11vh">
            <div class="beAbsolute centerInHeight" style="left:5%;">
                <p style="font-size:2.1rem" class="noPadding noMargin boldFont font_family1">{{selectedProduct.productName}}</p>
                <p style="color:#9e9e9e;font-size:0.9rem;margin-top:2vh" class="noPadding noMargin font_family1">{{selectedOptionContents}}</p>
            </div>
            <div class="beAbsolute font_family1" style="right:10%;font-size:1.7rem;right:5%;bottom:0.6rem">
                {{selectedProduct.productCost}} ₺
            </div>
          </div>
          <div class="col s12 noPadding" style="margin-top:8px">
            <div class="_line"></div>
          </div>
          <div class="col s12 noPadding beRelative" style="height:13vh">
              <div class="beAbsolute" style="width:50%;left:5%;top:5%">
                  <p class="noMargin font_family1 cut-text" style="color:#757575;font-size:1.1rem;max-height:13vh ">
                      {{selectedOption.productOptionSummary}}
                  </p>
              </div>
              <div class="beAbsolute centerInHeight" style="width:35%;right:5%;height:8vw">
                  <div class="row fullHeight">
                      <div class="col s4 fullHeight beRelative optionBorder" style="border-radius:5px 0px 0px 5px">
                          <i class="material-icons beAbsolute centerInCenter">
                              remove
                          </i>
                      </div>
                      <div class="col s4 fullHeight beRelative optionBorder">
                          <p class="beAbsolute noPadding noMargin center centerInCenter">{{orderCount}}</p>
                      </div>
                      <div class="col s4 fullHeight beRelative" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="border-radius:0px 5px 5px 0px">
                          <i class="material-icons beAbsolute centerInCenter tColorWhite">
                              add
                          </i>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col s12" style="margin-top:10px;height:13vh">
              <div class="row noMargin fullHeight">
                  <div class="col s6 input-field fullHeight">
                        <select v-model="selectedOption">
                            <option v-for="option in selectedProduct.productOptions" class="tColorBlack" :value="option">{{option.productOptionName}}</option>
                        </select>
                        <label>Seçenekler</label>
                  </div>
                  <div class="col s6 fullHeight beRelative">

                      <!-- Modal Trigger -->
                      <div href="#modal1" :style="{backgroundColor:globalVariables.colors.mainThemeColor}" class="eightWidth  beAbsolute centerInHeight modal-trigger" style="height:55%;border-radius:.3rem;right:3%">
                          <div class="beAbsolute centerInCenter noMargin noPadding tColorWhite boldFont center" style="font-size:1.4rem">Ekstralar</div>
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
                                    <div class="col s12 beRelative" :style="{backgroundColor:globalVariables.colors.mainThemeColor}">
                                        <h5 style="font-size:1.5rem" class="center tColorWhite boldFont">Ekstralar</h5>
                                        <i class="material-icons beAbsolute centerInHeight modal-close" :style="{color:globalVariables.colors.mainTextColor}" style="right:8px">close</i>
                                    </div>
                                    <div @click="toggleSelectedExtras(productExtra)" v-for="productExtra in selectedProduct.productExtras" class="col s12 beRelative noPadding waves-effect" style="height:10vh;border-top:1px solid #cecece">
                                        <div class="beAbsolute centerInCenter font-family1 boldFont" style="font-size:1.3rem">
                                            {{productExtra.productExtraName}}
                                        </div>
                                        <div class="beAbsolute centerInHeight" style="left:5%">
                                            <i v-if="!isInsideSelectedExtras(productExtra)" class="material-icons">check_box_outline_blank</i>
                                            <i v-else class="material-icons">check_box</i>
                                        </div>
                                        <div class="beAbsolute centerInHeight font-family1" style="right:5%;font-size:1.1rem">+ {{productExtra.productExtraCost}} ₺</div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" style="height:1vh">

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
