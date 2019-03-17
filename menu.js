class Menu //Manage the style of the menu if we click on it
 {
  constructor(){
    this.container = $(".ul-cible a");
    this.container.on("click", this.activeFirstMenu(this));
  }

  activeFirstMenu()//Attribute to the current object different css property
  {
    this.container.on("click", function(){
     $(".ul-cible a").removeClass("menu");
     $(this).addClass("menu");

  
  })
}

}