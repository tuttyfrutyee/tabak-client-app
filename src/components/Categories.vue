<template>
  <div id="categories">
      <div id="background_categories" class="backgroundCard"></div>
      <banner></banner>
      asdfaa
      asdf
      asgdsg/n
      <div class="addMarginT-L"></div>
        hello from categories


  </div>
</template>

<script>
//For vuex store, mapState and mapActions
//Info : mapAction and mapMutations both inserted in methods block
import { mapActions, mapMutations, mapState } from "vuex";

import Banner from "./Banner.vue"

export default {
  name: 'categories',
  components : {
    Banner
  },
  data(){
    return {
    }
  },
  computed : {

  },
  methods : {

    //mapMutations
    ...mapMutations([
      "updateBackgroundCard"
    ])
  },
  mounted(){

    this.updateBackgroundCard({
      elementId : "background_categories",
      change : this.$store.state.globalVariables.colors.whiteyColor,
      operation : "backgroundColor"
    })
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
