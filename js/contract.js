class Contract //Manage the customer contract
{


	constructor(){
				$(document).ready(this.addUserInfoContract.bind(this));

	}

	addUserInfoContract(){
	$(".customer_contract h1").html("Le signataire : " + localStorage.getItem("nom") + " " + localStorage.getItem("prenom"));
	$(".customer_contract img").attr("src", localStorage.getItem("signature"));

}
}

var mycontract = new Contract;