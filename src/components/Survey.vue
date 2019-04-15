<template>
  <div class="beFixed z-indexHigh" style="left:1rem;bottom:1rem" id="survey">

  <a data-micromodal-trigger="modal-specialRequest" class="btn-floating btn-large waves-effect waves-light deep-purple pulse"><i class="material-icons">star_half</i></a>
 


    <!-- Modal Structure -->
    <div class="_modal micromodal-slide z-indexHigh" id="modal-specialRequest" aria-hidden="true">
    <div class="modal__overlay" data-micromodal-close>
        <div class="modal__container noPadding" style="background-color:rgb(64,0,80);top:100px;width:90%;" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">

              <div class="fullWidth addMarginB-S borderBox beRelative" style="height:2.5rem;background-color:rgb(80,40,111)">
                <div class="beAbsolute centerInCenter semiBold fontSSmall_R center fullWidth" style="color:rgb(206,165,213);padding:0.3rem">Oylama & Geri Dönüt</div>
                <i data-micromodal-close class="material-icons beAbsolute centerInHeight" style="color:rgb(166,135,193);right:8px">&#xe5cd</i>
              </div>

            <div class="row noMargin">

                <div class="col s12 beRelative" style="height:4rem">
                    <div class="beAbsolute centerInCenter eightWidth center deep-purple-text text-lighten-5" style="font-size:1.1rem">
                        Aldığınız hizmetten ne kadar memnunsunuz?
                    </div>
                </div>

                <div class="col s12 beRelative addMarginTAB-S" style="height:4rem">
                    <div class="beAbsolute fullWidth center centerInCenter">
                        <i class="material-icons starColor starMargin" style="font-size:2.4rem">star</i>
                        <i class="material-icons starColor starMargin" style="font-size:2.4rem">star</i>
                        <i class="material-icons starColor starMargin" style="font-size:2.4rem">star</i>
                        <i class="material-icons starColor starMargin" style="font-size:2.4rem">star</i>
                        <i class="material-icons inActiveStarColor starMargin" style="font-size:2.4rem">star</i>
                    </div>
                </div>

                <div v-if="true" class="col s12 fixHeightL">
                    <textarea placeholder="Açıklamanızı yazın..." id="customOrderInput" class="materialize-textarea tColorWhite boldFont fontSVSmall_R" ></textarea>
                </div>
            </div>
            <div v-if="false" class="addMarginB-S"></div>
            <div class="row noMargin">
                <div class="col s10 offset-s1 beRelative addMarginB-VS waves-effect" style="color:rgb(245,230,250);border-radius:.2rem;height:2.5rem;background-color:rgb(201,65,115)">
                    <div class="beAbsolute fullWidth centerInCenter center fontSSmall_R">Gönder</div>
                </div>
                <div class="col s10 offset-s1 beRelative addMarginB-S waves-effect" style="color:rgb(180,170,200);height:2.5rem;border-radius:.2rem;background-color:rgb(100,50,100)">
                    <div class="beAbsolute fullWidth centerInCenter fontSSmall_R center">Hayır, teşekkürler</div>                   
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
  name: 'survey',
  components: {
  },
  computed : {
    //mapState
    ...mapState([

    ])
  },
  methods : {

  },
  created(){


  },
  watch : {


  },
  mounted(){
    
    MicroModal.init({
      awaitCloseAnimation: true, // [7] 
    });

  }
  
}
</script>

<style>
  .addGradient_pink{
    background: -webkit-linear-gradient(#7e57c2, #673ab7);
    background:    -moz-linear-gradient(#7e57c2, #673ab7);
    background:         linear-gradient(#7e57c2, #673ab7);      
  }
  .starColor{
      color : rgb(223,196,126)
  }
  .inActiveStarColor{
    color:rgb(166,135,193)      
  }
  .starMargin{
      margin-left:0.8rem;
  }
</style>
