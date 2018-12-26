<template>
  <div id="banner">
      <div :style="{backgroundColor:globalVariables.colors.mainThemeColor}" class="row subwayGreen">
        <div class="col s2">
        </div>
        <div style="height:65px" class="col s8 center addPaddingTAB-S">
          <img class="" style="height:40px" src="../assets/bannerYusuf.png" alt="">
        </div>
        <div class="col s2 beRelative waves-effect" style="height:65px">
          <div class="beAbsolute centerInHeight bColorGrey" style="height:60%;left:-1px;width:2px;opacity:0.4"></div>
          <img id="tabakIcon" src="../assets/tabakIcon.png" style="height:38px" alt="" class="centerWithMargin beAbsolute centerInCenter">
        </div>
      </div>
  </div>
</template>

<script>
//For vuex store, mapState and mapActions
//Info : mapAction and mapMutations both inserted in methods block
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: 'banner',
  data(){
    return {

    }
  },
  methods : {
    
  },
  computed : {

  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.subwayGreen{
  background-color : rgb(0,90,71)
}

#tabakIcon
{
border-width : 0px;
border-radius : 30%;
-moz-box-shadow: inset 0 0 20px rgba(255,255,255,0.1);
-webkit-box-shadow: inset 0 0 20px rgba(255,255,255,0.1);
box-shadow: inset 0 0 20px rgba(255,255,255,0.1);
}
</style>
