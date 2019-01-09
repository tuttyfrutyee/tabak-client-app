<template>
  <div id="plate" class="fullWidth minHeight_full">
    <div id="background_plate" class="backgroundCard"></div>

    <div class="row noMargin">
        <div class="col s12 noPadding" style="height:9vh">
            <ul :style="{backgroundColor:globalVariables.colors.mainThemeColor}" class="tabs fullHeight">
                <li class="tab col s3 fullHeight">
                    <a href="#orders" class="tColorWhite beRelative fullHeight">
                        <div class="beAbsolute centerInWidth" style="bottom:0vh">
                            Tabağınız
                        </div>
                        <div class="beAbsolute" style="bottom:1.3vh;right:0px;height:50%;border:0.5px solid #cecece;width:0px"></div>
                    </a>
                </li>
                <li class="tab col s3 fullHeight">
                    <a href="#track" class="tColorWhite beRelative fullHeight">
                        <div class="beAbsolute centerInWidth" style="bottom:0vh">Takip</div>
                    </a>
                </li>
            </ul>
        </div>
        <div id="orders" class="col s12">
            <div class="row noMargin">
                <div class="col s12 beRelative noPadding addMarginB-S" style="height:8vh;">
                    <div class="beAbsolute centerInHeight boldFont" style="left:5%;font-size:1.2rem">Tabağınız</div>
                    <div class="beAbsolute centerInWidth z-indexMedium" style="bottom:5px;width:94%;height:1.5px;backgroundColor:#cecece"></div>
                </div>
                <!-- Orders here -->
                <div class="col s12 noPadding" v-if="plate.length>0">
                    <div class="row noMargin">
                        <div v-for="order in plate" class="col s12 beRelative noPadding" style="height:10vh;margin-bottom:1vh">

                            <div :style="{backgroundColor:dilutedHelperThemeColor}" class="beRelative fullHeight waves-effect" style="width:83%;margin-left:5%;border-radius:5px">
                                <div class="beAbsolute centerInHeight boldFont" style="font-size:1.3rem;left:5%">x{{order.orderCount}} {{order.product.productName}}</div>
                                <div class="beAbsolute centerInHeight" style="right:15%">
                                    <i class="material-icons">edit</i>
                                </div>
                            </div>

                            <div @click="removeOrder(order)" class="beAbsolute centerInHeight" style="right:0%">
                               <!-- <div class="beAbsolute centerInHeight" style="height:80%;width:1.5px;backgroundColor:#cecece;left:-15%"></div>-->
                                <i class="material-icons tColorRed boldFont" style="font-size:8vw">clear</i>
                            </div>
                        </div>

                        <div class="col s12 noPadding" style="margin-top:1.5vh">
                            <div class="fullWidth" style="height:0.3vh;backgroundColor:#cecece"></div>
                        </div>

                        <div class="col s12 noPadding" style="height:7vh;margin-top:2.5vh;">
                            <div class="beRelative waves-effect waves-light centerWithMargin fullHeight noPadding addShadow_button " :style="{backgroundColor:globalVariables.colors.mainThemeColor}" style="width:70%;letter-spacing:.5px;text-transform:uppercase;display:block;border-radius:1vw">
                                <div class="beAbsolute centerInCenter tColorWhite center fullWidth" style="font-size:1.1rem">
                                    Siparişi Gönder
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row noMargin" style="">
                        <div class="col s12 boldFont" style="margin-top:4vh;font-size:5.5vw">
                            Yanına yakışır...   
                        </div>
                        <div class="col s12 noPadding">

                            <div class="glide">
                                <div class="glide__track" data-glide-el="track">
                                    <ul class="glide__slides">
                                        <li v-for="product in suggestedProducts()" class="glide__slide">

                                            <div class="containerr" style="overflow:hidden">
                                                <div class="beAbsolute fullWidth fullHeight centerInCenter waves-effect"></div>
                                                <img :src="product.productImages.productIconImage" class="beAbsolute centerInWidth" style="height:100%;top:0%">
                                                <div class="beAbsolute fullWidth " :style="{backgroundColor:'rgba(243,128,0,0.7)'}" style="bottom:0;left:0;height:25%">
                                                    <div class="beRelative fullWidth fullHeight">
                                                        <div class="beAbsolute centerInCenter tColorWhite boldFont center fullWidth" style="font-size:1.3rem">{{product.productName}}</div>
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
                <div class="col s12 noPadding boldFont center beRelative" style="font-size:6vw;margin-top:5vh;height:60vh" v-else>
                    Tabağınızda ürün yok
                        <img src="../assets/tabakIcon.png" alt="" class="beAbsolute centerInCenter">
                </div>
            </div>
        </div>
        <div id="track" class="col s12">
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
  mounted(){
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el, {});

    setTimeout(()=>{
            //styling some stuff dynamically
    var slideBar = document.getElementsByClassName("indicator")
        slideBar[0].style.backgroundColor = this.globalVariables.colors.helperThemeColor
        slideBar[0].style.height = "5px";
    },0)

    new Glide('.glide',{
        type: 'carousel',
        startAt: 0,
        perView: 2,
        swipeThreshold : 30,
        dragThreshold : 50,
        touchAngle : 80,
        autoplay: 4500
    }).mount()

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
.containerr {
  width: 100%;
  padding-top: 75%; /* 1:1 Aspect Ratio */
  position: relative; /* If you want text inside of it */
}
</style>
