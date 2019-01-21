<template>
  <div id="banner">
      <div :style="{backgroundColor:globalVariables.colors.mainThemeColor}" class="row subwayGreen noMargin">
        <div class="col s2">
        </div>
        <div style="height:8vmax;min-height:56px" class="col s8 beRelative">
          <img class="centerInCenter beAbsolute" style="height:65%" src="../assets/bannerYusuf.png" alt="">
        </div>
        <div @click="navigateToPlate" class="col s2 beRelative overFlowVisible" style="height:8vmax;min-height:56px">
          <div class="beAbsolute centerInHeight bColorGrey" style="height:60%;left:-0.7vmax;width:2px;opacity:0.8"></div>
          <div style="height:76%" alt="" class="beAbsolute centerInCenter">
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
    animatePlate(){
      var plate = document.getElementById("tabakIcon")
      plate.classList.remove("wiggle")
      setTimeout(()=>{
         plate.classList.add("wiggle")
      },0)
    },
    ...mapActions("moduleAnimations",[
      "removeTodoAnimation"
    ])
  },
  computed : {
    immediateIconAnimation_required(){
      return this.todo_animations.immediate.icon
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
