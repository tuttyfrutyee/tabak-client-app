<template>
  <div id="plate" class="fullWidth minHeight_full">
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
                <div v-for="order in plate" class="col s12 beRelative noPadding" style="height:10vh;margin-bottom:1vh">

                    <div :style="{backgroundColor:dilutedHelperThemeColor}" class="beRelative fullHeight waves-effect" style="width:80%;left:0;border-radius:5px">
                        <div class="beAbsolute centerInHeight boldFont" style="font-size:1.3rem;left:5%">x{{order.orderCount}} {{order.product.productName}}</div>
                        <div class="beAbsolute centerInHeight" style="right:15%">
                            <i class="material-icons">edit</i>
                        </div>
                    </div>

                    <div class="beAbsolute centerInHeight" style="right:2%">
                        <div class="beAbsolute centerInHeight" style="height:80%;width:1.5px;backgroundColor:#cecece;left:-29%"></div>
                        <i class="material-icons tColorRed boldFont">clear</i>
                    </div>
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
    }
  },
  computed : {
       dilutedHelperThemeColor(){
           var opacity = 0.1;
           var rgb = this.hexToRgb(this.globalVariables.colors.helperThemeColor)
           var neww = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity +')'
           console.log(neww)
           return neww
       },
      //mapState
      ...mapState("modulePlate",[
          "plate"
      ])
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


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabs .tab a:hover, .tabs .tab a.active {
    background-color: transparent !important;
}
</style>
