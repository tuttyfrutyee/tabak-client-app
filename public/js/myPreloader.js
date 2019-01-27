var myPreloader =  {
activatePreloaderAt(element,size){
    if(typeof element === "string"){
        //it is element id
        element = document.getElementById(element);
    }
    element.classList.add("beFixed");
    setVendor(element,"Transform","translateZ(0)")
    var preLoader = createPreloader(size);
    var darkness = createDarkness();
    var logo = createLogo();

    preLoader.classList.add("beFixed","z-indexMedium");
    logo.classList.add("beFixed","z-indexHigh")

    switch(size){
        case "big":
        preLoader.style.top = "calc(55% - 32px)"
        preLoader.style.left = "calc(50% - 32px)"
        break;
        case "":
        preLoader.style.top = "calc(55% - 25px)"
        preLoader.style.left = "calc(50% - 25px)"
        break;
        case "small":
        preLoader.style.top = "calc(55% - 18px)"
        preLoader.style.left = "calc(50% - 18px)"
        break;
    }
    element.appendChild(darkness);
    element.appendChild(preLoader);
    element.appendChild(logo)

},
deActivatePreloaderAt(element){
    if(typeof element === "string"){
        //it is element id
        element = document.getElementById(element);
    }
    var preloader = element.querySelector(".preloader-wrapper");
    var darkness = element.querySelector(".darkness");
    if(preloader){
        element.removeChild(preloader);
        element.removeChild(darkness);
    }

}

}

//helper functions
function createPreloader(size){
    var html = '<div class="preloader-wrapper '+size+' active"><div class="spinner-layer spinner-red-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>';
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
function createLogo(){
    var logoFrame = document.createElement("div")
        logoFrame.classList.add("fullWidth")
        logoFrame.style.height = "70vh"
        logoFrame.style.top = 0
        logoFrame.style.left = 0
    var logoName = document.createElement("div")
        logoName.classList.add("beAbsolute","centerInCenter","fontF_OpenSans")
        logoName.style.fontSize = "2.5rem"
        logoName.style.color = "white"
        logoName.innerText = "Tabak"

    logoFrame.appendChild(logoName)
    return logoFrame
}
function createDarkness(){
    var darkness = document.createElement("div");
    darkness.classList.add("beFixed","fullHeight","fullWidth","darkness","z-indexMedium");
    darkness.style.backgroundColor = "rgba(0,0,0,0.7)"
    darkness.style.top = "0px";
    darkness.style.left = "0px"
    return darkness;
}

window.myPreloader = myPreloader;

function setVendor(element, property, value) {
    element.style["webkit" + property] = value;
    element.style["moz" + property] = value;
    element.style["ms" + property] = value;
    element.style["o" + property] = value;
  }