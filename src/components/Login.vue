<template>
  <div id="login">

      <div id="background_login" class="backgroundCard"></div>

      <div class="container">
          <div class="row addMarginT-S">
              <div class="col s10 offset-s1 center">
                  <p class="center title">
                      <span class="biggerLetter">S</span>ize nasıl hitap edilim<span class="bigLetter">?</span>
                  </p>
              </div>
              <div class="col s8 offset-s2">
                  <input placeholder="Adınızı yazın..." id="last_name" type="text" class="tColorWhite boldFont center fontSMedium_R">
              </div>
              <div class="col s10 offset-s1 addMarginT-M">
                  <a @click="moveToCategories" class="waves-effect waves-light btn fullWidth center"><i class="material-icons right">arrow_forward</i>Başla!</a>
              </div>
          </div>
      </div>

      <img id="logo" class="beAbsolute centerInWidth"  src="../assets/tabak_logo.png" alt="">
  </div>
</template>

<script>
//For vuex store, mapState and mapActions
//Info : mapAction and mapMutations both inserted in methods block
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "login",
  data(){
    return {
    }
  },
  computed : {

  },
  methods: {
    /* View in fullscreen */
    openFullscreen() {

      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },
    moveToCategories() {
        this.$router.push("/categories")
    },

    setLogoPosition() {
      var w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      var h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );

      this.$store.dispatch("debug", {
        "biggest width": w,
        "biggest height": h
      });

      var logo = document.getElementById("logo");
      var top = h * 0.9 - w * 0.45 + "px";

      logo.style.top = top;
    },
    //mapMutations
    ...mapMutations(["updateBackgroundCard", "changeThemeColor"])
  },
  mounted() {
/*     this.changeBackgroundColor(
      this.$store.state.globalVariables.colors.tabakColor
    ); */
    this.changeThemeColor(this.$store.state.globalVariables.colors.tabakColor);

    this.updateBackgroundCard({
      elementId : "background_login",
      operation : "backgroundColor",
      change : this.$store.state.globalVariables.colors.tabakColor
    })

    this.setLogoPosition();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  font-size: 1.9rem;
  letter-spacing: 2px;
  font-family: "Arvo", serif;
  color: #fafafa;
}
.bigLetter {
  font-size: 2.4rem;
  font-weight: bold;
}
.biggerLetter {
  font-size: 2.8rem;
  font-weight: bold;
}
#logo {
  width: 45%;
}

</style>
