class ReservationOn //Manage the time during the reservation is vailable, errors that could be generate by the user
{

	constructor(){

		this.seconde = 5; //The number of seconds is defined
		this.minute = 0;  //The number of minutes we need for the timer is also defined
		this.initTimeCount = undefined;                                                                                                                                                                                          
		this.numReservation = 0;
		$("#validate").on("click", this.reservationActivation.bind(this));
		$("#annulateReservation").on("click", this.annulationReservation.bind(this));
		$(document).ready(this.addName.bind(this));
		$("#button_Reservation span").on("click", this.checkReservation.bind(this));
	}

	time()//
	{
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


	addName()//save the name for the next connection and surname of the user when it is indicated
	{

		if (localStorage.getItem("nom") != undefined && localStorage.getItem("prenom") != undefined) {
			$("#form-name").attr("placeholder", (localStorage.getItem("nom")));
			$("#form-firstname").attr("placeholder", (localStorage.getItem("prenom")));


		}

	}


	reservationActivation(){ //We save the name and surname, initialise the timer, if it's over we clear the timer,indicate to the user the reservation is over
		localStorage.setItem("nom", $("#form-name").val());
		localStorage.setItem("prenom", $("#form-firstname").val());
		$("#confirmLocation").css("display", "block");
		$("#blocCanvas").css("display", "none");
		$("#timerReservation").html(localStorage.getItem("nom") + " " + localStorage.getItem("prenom") + " votre réservation à bien été enregistré, elle expirera dans: " + this.minute + " min et " + this.seconde + " secondes.");
		$("#timerReservation").css("color", "red");

		this.seconde --;
		if (this.seconde === 0) {
			this.minute -- ;
			this.seconde = 60;
		} 

		else if (this.minute === -1) //If the timer is finished we clear it and give the information to the user
		{
			clearTimeout(this.initTimeCount);
			
			$("#timerReservation").html("Votre réservation a expiré, cliquez sur Annuler votre réservation");
		} 

		this.time(); 
		

	}

	annulationReservation()//Clear timeout clear the information in storage reinitialise the number of second minute
	{
		clearTimeout(this.initTimeCount);
		sessionStorage.clear();
		this.seconde = 60;
		this.minute = 19;
		alert("Votre réservation a bien été annulée");
		$("#confirmLocation").css("display", "none");
		$("#reservationStationName").css("display", "none");
	}
}


