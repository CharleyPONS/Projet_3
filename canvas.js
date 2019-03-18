
class CanvasOptions //Plugin who manage the canvas, for adding new functionality remove the two antislash in the constructor
{
	constructor(){
		this.canvas = document.querySelector("canvas");
		this.signaturePad = new SignaturePad(this.canvas);
		this.wrapper = document.getElementById("signature-pad");;
		this.clearButton =  this.wrapper.querySelector("[data-action=clear]");
		//this.undoButton = this.wrapper.querySelector("[data-action=undo]");
		//this.changeColorButton = this.wrapper.querySelector("[data-action=change-color]");
		this.clearButton.addEventListener("click", this.clear.bind(this));
		//this.undoButton.addEventListener("click",this.undo());
		//this.changeColorButton.addEventListener("click", this.changeColor.bind(this));



	}

clear(){
  this.signaturePad.clear();
}


undo(){
  var data = this.signaturePad.toData();

  if (data) {
    data.pop(); // remove the last dot or line
    this.signaturePad.fromData(data);
  }
}
changeColor(){

  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  var color = "rgb(" + r + "," + g + "," + b +")";

  this.signaturePad.penColor = color;
}

}


