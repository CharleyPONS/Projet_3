class Slider  
{
 constructor(){
  this.i =  0;
  this.items = $('.container div'); //retreive the image from the DOM
  this.itemLength = this.items.length;
  this.autoSlideId = undefined;
  $(document).ready(this.autoSlide.bind(this));  //call the function when the page is ready
  $('.next').on("click", this.nextImage.bind(this));
  $('.prev').on("click", this.previousImage.bind(this));
  $('.stop').on("click", this.pauseSlider.bind(this));
  $(".play").on("click", this.autoSlide.bind(this));
  $(document).on("keydown", this.keySlider.bind(this));
}

cycleItems(){
  var item = $('.container div').eq(this.i); //An indice is defined, we get i (=0 so the first image) into the var item
  this.items.hide();  //hide the other image
  item.css('display','inline-block'); //Display the image we've retreived
}

changeImage() {
  this.i += 1; //increment the indice of 1 until the last picture

  if (this.i > this.itemLength - 1) {
    this.i = 0; //return at the beginning when we've called of all of the image
  }
  this.cycleItems();

}

autoSlide() {
  if(!this.autoSlideId)//We call the set interval only if the slider isn't activate (avoid double click on play)
  {
    this.autoSlideId = setInterval(this.changeImage.bind(this), 5000);
  }
}

nextImage() {
  clearInterval(this.autoSlideId);
  this.i += 1;
  if (this.i > this.itemLength - 1) {
    this.i = 0;
  }
  this.cycleItems();
  this.autoSlideId = undefined; //returns undefined to stop the slider

}

previousImage() {
  clearInterval(this.autoSlideId);
  this.i -= 1;
  if (this.i < 0) {
    this.i = this.itemLength - 1;
  }
  this.cycleItems();
  this.autoSlideId = undefined; //returns undefined to stop the slider

}

pauseSlider(){

  clearInterval(this.autoSlideId);
  this.autoSlideId = undefined; // reset the state of autsolideId
}

keySlider(e){
  if(e.keyCode === 39) //key === RIGHT ARROW
   {                                          
    $(document).keypress(this.nextImage());

  } else if(e.keyCode === 37) // key === LEFT ARROW
  {
   $(document).keypress(this.previousImage()); 
   
 }
 this.pauseSlider();
}

}

