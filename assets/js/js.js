var x = document.getElementById("div-all");
var map;

function initialize() {
    var mapCanvas = document.getElementById('map');
    var depok = new google.maps.LatLng(-6.3878438,106.7477563)
    var mapOptions = {
      center: depok,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions);

    // google.maps.event.addDomListener(window, 'load', initialize);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
    	location: depok,
    	radius: 1000,
    	types: ['apotek', 'klinik', 'rumah sakit']
    }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP
  });
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
	var mapCanvas = document.getElementById('map');

	window.myLat = position.coords.latitude;
	window.myLng = position.coords.longitude;
	
	var mapOptions = {
      center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
	    map: map,
	    position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
	  });

    marker.setMap(map);
    marker.setAnimation(google.maps.Animation.BOUNCE);
}

function getNearest(){
	var myLocation = new google.maps.LatLng(myLat,myLng);
	var service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
    	location: myLocation,
    	radius: 1000,
    	types: ['apotek', 'klinik', 'rumah sakit']
    }, callback);
}