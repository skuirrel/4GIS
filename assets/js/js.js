var x = document.getElementById("");
var toDivAll = document.getElementById("div-all");
var toDivRS = document.getElementById("div-rs");
var toDivApotek = document.getElementById("div-apotek");
var toDivKlinik = document.getElementById("div-klinik");
var btnMyLoc = document.getElementById("btn-myloc");
var btnNearest = document.getElementById("btn-nearest");
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


    var service1 = new google.maps.places.PlacesService(map);
    service1.nearbySearch({
    	location: depok,
    	radius: 2000,
    	name: "apotek",
      types: ["hospital", "pharmacy", "dentist", "doctor"]
    }, callback);

    var service2 = new google.maps.places.PlacesService(map);
    service2.nearbySearch({
      location: depok,
      radius: 2000,
      name: "rumah sakit",
      types: ["hospital", "pharmacy", "dentist", "doctor"]
    }, callback);

    var service3 = new google.maps.places.PlacesService(map);
    service3.nearbySearch({
      location: depok,
      radius: 2000,
      name: "klinik",
      types: ["hospital", "pharmacy", "dentist", "doctor"]
    }, callback);


    // Create the search box and link it to the UI element.
    var input = document.getElementById('all-search');
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      // markers.forEach(function(marker) {
      //   marker.setMap(null);
      // });
      // markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();

      places.forEach(function(place) {
        // var icon = {
        //   url: place.icon,
        //   size: new google.maps.Size(71, 71),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(17, 34),
        //   scaledSize: new google.maps.Size(25, 25)
        // };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          // icon: icon,
          title: place.name,
          position: place.geometry.location,
          animation: google.maps.Animation.DROP
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

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
  var image = 'http://localhost/sig/assets/img/marker-places.png';

  var infowindow = new google.maps.InfoWindow({
      content: place.name
  });

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: image,
    animation: google.maps.Animation.DROP
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
    // var str = '#' + place.name.replace(/\s+/g, '');
    // $('html, body').animate({
    //     scrollTop: $(str).offset().top
    // }, 2000);
  });

  var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: place.place_id
  }, callback2);

}

function callback2(details, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    if((details.name.toLowerCase().indexOf("rumah sakit") > -1) || (details.name.indexOf("RS") > -1)){
      showToDivRS(details);
    }
    else if((details.name.toLowerCase().indexOf("apotek") > -1) || (details.name.toLowerCase().indexOf("apotik") > -1)){
      showToDivApotek(details);
    }
    else if((details.name.toLowerCase().indexOf("klinik") > -1) || (details.name.toLowerCase().indexOf("dokter") > -1)){
      showToDivKlinik(details);
    }
    else{

    }
      
  }
}


function showToDivRS(details){
  // toDivRS.empty();
  var str = details.name.replace(/\s+/g, '');
  toDivRS.innerHTML += 
    '<div class="card col s12 id="'+str+'">'+
        '<h5>'+details.name+'</h5>'+
        '<img class="responsive-img" src="'+details.icon+'"/>'+
        '<button onclick="getDirection()" class="btn" style="margin-bottom: 20px; margin-top:10px;"><i class="flaticon-location68" style="margin-left: -20px;"></i> Beri Petunjuk Jalan</button> '+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-pin60" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+details.formatted_address+'</div>'+
        '</div>'+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-active5" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+details.formatted_phone_number+'</div>'+
        '</div>'+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-alarm68" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+details.opening_hours+'</div>'+
        '</div>'+
      '</div>';
}

function showToDivApotek(details){
  // toDivApotek.empty();
  var str = details.name.replace(/\s+/g, '');
  toDivApotek.innerHTML += 
    '<div class="card col s12 id="'+str+'">'+
        '<h5>'+details.name+'</h5>'+
        '<img class="responsive-img" src="'+details.icon+'"/>'+
        '<button onclick="getDirection()" class="btn" style="margin-bottom: 20px; margin-top:10px;"><i class="flaticon-location68" style="margin-left: -20px;"></i> Beri Petunjuk Jalan</button> '+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-pin60" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+details.formatted_address+'</div>'+
        '</div>'+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-active5" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+details.formatted_phone_number+'</div>'+
        '</div>'+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-alarm68" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+details.opening_hours+'</div>'+
        '</div>'+
      '</div>';
}

function showToDivKlinik(details){
  // toDivKlinik.empty();
  var str = details.name.replace(/\s+/g, '');
  toDivKlinik.innerHTML += 
    '<div class="card col s12" id="'+str+'">'+
        '<h5>'+details.name+'</h5>'+
        '<img class="responsive-img" src="'+details.icon+'"/>'+
        '<button onclick="getDirection()" class="btn" style="margin-bottom: 20px; margin-top:10px;"><i class="flaticon-location68" style="margin-left: -20px;"></i> Beri Petunjuk Jalan</button> '+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-pin60" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+details.formatted_address+'</div>'+
        '</div>'+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-active5" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+details.formatted_phone_number+'</div>'+
        '</div>'+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-alarm68" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+details.opening_hours+'</div>'+
        '</div>'+
      '</div>';
}


function showDiv(e){
  if(e.value == 0){
    toDivApotek.style.display = "block";
    toDivRS.style.display = "block";
    toDivKlinik.style.display = "block";
  }
  else if(e.value == 1){
    toDivApotek.style.display = "block";
    toDivRS.style.display = "none";
    toDivKlinik.style.display = "none";
  }
  else if(e.value == 2){
    toDivApotek.style.display = "none";
    toDivRS.style.display = "block";
    toDivKlinik.style.display = "none";
  }
  else{
    toDivApotek.style.display = "none";
    toDivRS.style.display = "none";
    toDivKlinik.style.display = "block";
  }
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
  var image = 'http://localhost/sig/assets/img/marker-home.png';
  var marker = new google.maps.Marker({
    map: map,
    icon: image,
    position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
  });

  marker.setMap(map);
  marker.setAnimation(google.maps.Animation.BOUNCE);
  btnNearest.disabled = false;
}

function getNearest(){
	var myLocation = new google.maps.LatLng(myLat,myLng);

  toDivApotek.innerHTML="";
  toDivRS.innerHTML="";
  toDivKlinik.innerHTML="";

	var service1 = new google.maps.places.PlacesService(map);
    service1.nearbySearch({
      location: myLocation,
      radius: 2000,
      name: "apotek",
      types: ["hospital", "pharmacy", "dentist", "doctor"]
    }, callback);

    var service2 = new google.maps.places.PlacesService(map);
    service2.nearbySearch({
      location: myLocation,
      radius: 2000,
      name: "rumah sakit",
      types: ["hospital", "pharmacy", "dentist", "doctor"]
    }, callback);

    var service3 = new google.maps.places.PlacesService(map);
    service3.nearbySearch({
      location: myLocation,
      radius: 2000,
      name: "klinik",
      types: ["hospital", "pharmacy", "dentist", "doctor"]
    }, callback);
}


