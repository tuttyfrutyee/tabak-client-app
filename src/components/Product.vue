<template>
  <div id="product" class="beAbsolute fullWidth" style="top:0px;left:0px">
      <div id="background_subCategories" class="backgroundCard"></div>
      
      <div class="row">
          <div class="col s12 beRelative noOverflow noPadding" style="height : 30vh">

                <div id="imageFilter" class="beAbsolute fullWidth fullHeight centerInCenter border z-indexMedium blurMe"> </div>

				<div class="progressive-image beRelative fullWidth fullHeight">

					<img id="placeHolderImage" class="beAbsolute centerInCenter fullWidth" :src="selectedProduct.productImages.productIconImage" alt="">

					<img id="representImage" class="overlay beAbsolute centerInCenter fullWidth"></div>

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
    }
  },
  methods : {
    
  },
  computed : {
      ...mapState("moduleProduct",[
          "selectedProduct"
      ])
  },
  created(){



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


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.border{
    border: 7px solid rgba(0,0,0,0.6);
    border-top : 8px solid black

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
</style>
