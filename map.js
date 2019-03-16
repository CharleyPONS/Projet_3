             //Start watch


var lyon = [45.750942, 4.839286]; // definit lyon geographiquemetn

var mymap = L.map("mapid").setView(lyon, 13);  

var markers = L.markerClusterGroup();


var tileStreets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiY2hhcmxleTEyIiwiYSI6ImNqcG8xNzNzeDA1YWs0OHF0aG0yaW56Z3IifQ.BilCTSi0_BABp88j5d-mbQ'
});


tileStreets.addTo(mymap);


var colorIcon = L.Icon.extend({   //synthaxe objet options objet
  options: {
    shadowUrl: this.shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }
});

var iconTypes = {
  greenIcon : new colorIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'}),
  redIcon : new colorIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'}),
  blackIcon : new colorIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png'}),
  orangeIcon : new colorIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'})
};
                                                
var stationInfoOn = function(myMarker, reponseInfoStation){

  myMarker.on("click", function(){

    $("#infostation").css("display", "block");
    $("#nomStation").html(reponseInfoStation.name);
    $("#adresseStation").html(reponseInfoStation.address);
    $("#etatStation").html(reponseInfoStation.status);
    $("#veloDispo").html(reponseInfoStation.available_bikes);
    $("#attacheDispo").html(reponseInfoStation.available_bike_stands);
    $("#finalReservation").html(reponseInfoStation.name + " :");


    if(reponseInfoStation.status === "CLOSED" || reponseInfoStation.available_bikes === 0){
      $("#messageErreur").css("display", "block");
      $("#button_Reservation span").css("display","none");

    }else{
      $("#button_Reservation span").css("display","block");
      $("#messageErreur").css("display", "none");
    };


  });
}



ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=8fa44c83d4df32d8594a82fbc46d24942b362427", function(reponse) {  //revoir parametre reponse = objet de l api
  var listeStations = JSON.parse(reponse);

  listeStations.forEach(function(reponseInfoStation) {   //reponse info station objet json lisible




    if (reponseInfoStation.status === "OPEN" && reponseInfoStation.available_bikes === 0 && reponseInfoStation.available_bikes < 1){
      var myMarker = L.marker(reponseInfoStation.position, {icon: this.iconTypes.redIcon} );

    }else if (reponseInfoStation.status === "OPEN" && reponseInfoStation.available_bikes > 1 && reponseInfoStation.available_bikes <5){
      var myMarker = L.marker(reponseInfoStation.position, {icon: this.iconTypes.orangeIcon} );

    }else if (reponseInfoStation.status === "CLOSED") {
      var myMarker =  L.marker(reponseInfoStation.position, {icon: this.iconTypes.blackIcon} );

    }else {
      var myMarker = L.marker(reponseInfoStation.position, {icon: this.iconTypes.greenIcon} );
    };


    stationInfoOn(myMarker,reponseInfoStation);

    markers.addLayer(myMarker); //On ajoute les markers plus a la carte mais au clusterr
  });

  mymap.addLayer(markers); //AJOUTER A A FIN DE LA BOUCLE Pk? parce qu'on attend que la boucle les a tous definis

});

