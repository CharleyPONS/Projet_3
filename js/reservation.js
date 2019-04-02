class checkReservation //Manage the reservation 
{
	constructor(){

		this.seconde = 0;
		this.minute = 20;
		this.initTimeCount = undefined;
		this.canvas = document.querySelector("canvas");
		this.signaturePad = new SignaturePad(this.canvas);
		$("#validate").on("click", this.reservationActivation.bind(this));
		$("#annulateReservation").on("click", this.annulationReservation.bind(this));
		$("#button_Reservation span").on("click", this.checkReservation.bind(this));

		$(document).ready(this.addName.bind(this));
	}

	time(){
		this.initTimeCount = setTimeout(this.reservationActivation.bind(this), 1000);
	}

		checkReservation()//If a reservation is already active we notice it to the user
		{
			if(this.initTimeCount){
				alert("Une réservation est déjà en cours, pour l'annulée cliquez sur 'Annuler votre réservation'");

		}else{//if any reservation is active we display the "reservation bloc

		$("#blocCanvas").css("display", "block");
		$("#reservationStationName").css("display", "block");
	}

}


addName(){

	if (localStorage.getItem("nom") != undefined && localStorage.getItem("prenom") != undefined) {
		$("#form-name").attr("placeholder", (localStorage.getItem("nom")));
		$("#form-firstname").attr("placeholder", (localStorage.getItem("prenom")));


	}

}

reservationActivation(){
	var nom = $('#form-name').val();//vWe put the variables in the function to avoid any problem of binding and recovery of [object] in localStorage
	var prenom = $("#form-firstname").val();


	if (nom =="") //We check that the form is filled field name
	{
		alert("Veuillez renseignez votre nom");

	}
	else if (prenom == "")  //We check that the form is filled field first name
	{
		alert("Veuillez renseignez votre prénom")
	}
	else if(this.signaturePad.isEmpty())  //Verify canvas is signed
	{
		alert("Veuillez signer votre réservation")
	}
else //If all is filled we store the data with localStorage we display the blocks and start the counter
{
	localStorage.setItem("nom", nom);
	localStorage.setItem("prenom", prenom);
	$("#confirmLocation").css("display", "block");
	$("#blocCanvas").css("display", "none");
	$("#timerReservation").html(localStorage.getItem("nom") + " " + localStorage.getItem("prenom") + " votre réservation a bien été enregistré, elle expirera dans: " + this.minute + " min et " + this.seconde + " secondes.");
	$("#timerReservation").css("color", "red");

	if(this.minute >=  0){
		this.seconde --;
		if (this.seconde <= 0) //Condition less than or equal to 0 for counter departure at 20min 00 sec
		{
			this.minute -- ;
			this.seconde = 60;
		} 
				this.time(); //The function is called out of the loop
			}

			else //If the time is over, we clear the counter we reset the number of min / sec we create an alert and inform the user
			{
				clearTimeout(this.initTimeCount);
				this.seconde = 0;
				this.minute = 20;
				$("#annulateReservation").css("display", "none");
				$("#confirmLocation").css("display", "none");
				$("#reservationStationName").css("display", "none");
				alert("Le temps est écoulé, Votre réservation est annulée");
				this.initTimeCount = undefined;




			}
		}
	}



	annulationReservation(){
		clearTimeout(this.initTimeCount);
		this.initTimeCount = undefined;
		sessionStorage.clear();
		this.seconde = 60;
		this.minute = 19;
		alert("Votre réservation a bien été annulée");
		$("#confirmLocation").css("display", "none");
		$("#reservationStationName").css("display", "none");





	}
}
