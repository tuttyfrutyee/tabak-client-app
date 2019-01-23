<template>
  <div id="banner" class="z-indexHigh">
      <div :style="{backgroundColor:globalVariables.colors.mainThemeColor}" class="row subwayGreen noMargin" style="height:8vmax;min-height:56px" >

        <div class="col s2 beRelative fullHeight">
          <div v-if="isInSubCategories" @click="goBack()" class="beAbsolute centerInHeight" style="left:3vmin;max-width:38px;max-height:38px;width:8vmin;height:8vmin;border-radius:50%;background-color:#424242">
            <div class="beRelative fullHeight fullWidth">
              <i class="beAbsolute centerInCenter material-icons tColorWhite fluidFont-XL">chevron_left</i>
            </div>
          </div>
        </div>

        <div class="col s8 beRelative fullHeight">
          <img class="centerInCenter beAbsolute" :style="{height:globalVariables.options.bannerImage.heightRatio + '%'}" style="z-index:2" src="../assets/burger-station.png" alt="">
          <div v-if="globalVariables.options.bannerCover.exists" class="beAbsolute centerInCenter fullHeight" style="width:80%;z-index:1;border-radius:2px" :style="{backgroundColor:globalVariables.options.bannerCover.color,opacity:globalVariables.options.bannerCover.opacity}"></div>
          <div class="beAbsolute centerInHeight bColorGrey" style="height:60%;right:0.3vmax;width:2px;opacity:0.8"></div>
        </div>
        
        <div :style="{backgroundColor:globalVariables.colors.mainThemeColor}" :class="{'beFixed':isInSubCategories,'beRelative':!isInSubCategories}" @click="navigateToPlate" class="col s2 overFlowVisible z-indexHigh" style="right:0;top:0;height:8vmax;min-height:56px;border-radius:3px 0px 3px 10px">
          <div style="height:76%"  class="beAbsolute centerInCenter">
            <img id="tabakIcon" class="fullHeight animated" src="../assets/tabakIcon.png" >
            <div v-if="plate.length>0" class="beAbsolute" style="right:15%;bottom:15%;height:3vmax;width:3vmax;min-height:20px;min-width:20px">
              <div class="beRelative fullWidth fullHeight" :style="{backgroundColor:globalVariables.colors.helperThemeColor}" style="border-radius:50%">
                  <div class="beAbsolute centerInCenter tColorBlack boldFont fluidFont-M noPadding" style="line-height:normal">{{plate.length}}</div>
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
  name: 'banner',
  data(){
    return {

    }
  },
  methods : {
    navigateToPlate(){
      this.$router.push("/plate")
    },
    goBack(){
      this.$router.go(-1)
    },
    animatePlate(){
      var plate = document.getElementById("tabakIcon")
      plate.classList.remove("wiggle")
      setTimeout(()=>{
         plate.classList.add("wiggle")
      },0)
    },
    //styles and classes
    //mapActions
    ...mapActions("moduleAnimations",[
      "removeTodoAnimation"
    ])
  },
  computed : {
    immediateIconAnimation_required(){
      return this.todo_animations.immediate.icon
    },
    isInSubCategories(){
      return this.$route.path.includes("subCategories")
    },
    ...mapState("modulePlate",[
      "plate"
    ]),
    ...mapState("moduleAnimations",[
      "todo_animations"
    ]),
  },
  watch:{
    immediateIconAnimation_required(value){
      if(value){
        this.animatePlate()
        this.removeTodoAnimation({type:'immediate',name:'icon'})
      }
    }
  },
  created(){
  },
  mounted(){
    //check for immediate animation duties
    if(this.todo_animations.lazy.icon){

    
      this.animatePlate()  

      
      this.removeTodoAnimation({type:'lazy',name:'icon'});
    }

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
.animated {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-delay: 0s;
}

         @-webkit-keyframes wiggle {
  0% { transform: skewX(0deg); }
  10% { transform: skewX(-18deg); }
  20% { transform: skewX(12deg); }
  30% { transform: skewX(-12deg); }
  40% { transform: skewX(9deg); }
  50% { transform: skewX(-8deg); }
  60% { transform: skewX(6deg); }
  70% { transform: skewX(-6deg); }
  80% { transform: skewX(4deg); }
  90% { transform: skewX(-2deg); }
  100% { transform: skewX(0deg); }
}

@keyframes wiggle {
  0% { transform: skewX(0deg); }
  10% { transform: skewX(-18deg); }
  20% { transform: skewX(12deg); }
  30% { transform: skewX(-12deg); }
  40% { transform: skewX(9deg); }
  50% { transform: skewX(-8deg); }
  60% { transform: skewX(6deg); }
  70% { transform: skewX(-6deg); }
  80% { transform: skewX(4deg); }
  90% { transform: skewX(-2deg); }
  100% { transform: skewX(0deg); }
}

.wiggle {
  -webkit-animation-name: wiggle;
  animation-name: wiggle;
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
}

.animated.wiggle {
  -webkit-animation-duration: 0.95s;
  animation-duration: 0.95s;
}
</style>
