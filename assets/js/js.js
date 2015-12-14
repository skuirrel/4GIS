// var x = document.getElementById("");
var toDivAll = document.getElementById("div-all");
var toDivRS = document.getElementById("div-rs");
var toDivApotek = document.getElementById("div-apotek");
var toDivKlinik = document.getElementById("div-klinik");
var btnMyLoc = document.getElementById("btn-myloc");
var btnNearest = document.getElementById("btn-nearest");
// var btnDirection = document.getElementById("btn-direction");
var map;
var markers = [];
var nama = 'aa';
var compareId = [];


function initialize() {
    var mapCanvas = document.getElementById('map');
    var depok = new google.maps.LatLng(-6.3680686,106.82737)
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

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    // var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();

      places.forEach(function(place) {
        var infowindow = new google.maps.InfoWindow({
          content: place.name + '<br>' + place.place_id
        });
        var marker = new google.maps.Marker({
          map: map,
          // icon: icon,
          title: place.name,
          position: place.geometry.location,
          animation: google.maps.Animation.DROP
        })

        // Create a marker for each place.
        markers.push(marker);
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });


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
  });
  markers.push(marker);

  var service = new google.maps.places.PlacesService(map);
    service.getDetails({
      placeId: place.place_id
    }, callback2);

    // function checkPlace(place){   
      jQuery.ajax({
        type: "POST",
        url: "http://localhost/sig/index.php/Sig/isInList/"+place.place_id,
        success: function(res){
          if (res){
            var obj = jQuery.parseJSON(res);
            if(obj.bs){
              console.log('IYA ADA BRO');
              compareId.push({name: place.name, id:place.place_id, position:place.geometry.location});
            }
          }
        }
      });
    // }
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

function clearMarkers() {
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];
}

function showToDivRS(details){
  var url;
  if(typeof details.photos !== 'undefined' || !details.photos){
    url = details.photos[0].getUrl({'maxWidth':400, 'maxHeight':400});
  }
  else{
    url = '';
  }
  
  var str = details.name.replace(/\s+/g, '');
  // getMeta(url);
  // if (checkW>=checkH){
  //   var classphoto = 'photo-h';
  // }else{
  //   var classphoto = 'photo-v';
  // }

  toDivRS.innerHTML += 
    '<div class="card col s12 id="'+str+'">'+
        '<h5>'+details.name+'</h5>'+
        // // '<h5> lokasi:'+details.coords.latitude+'</h5>'+
        '<div class="photo"><img class="responsive-img" src="'+url+'"/></div>'+
        '<button onclick="getDirection('+details.geometry.location.lat()+', '+details.geometry.location.lng()+')" class="btn" style="margin-bottom: 20px; margin-top:10px;" disabled><i class="flaticon-location68" style="margin-left: -20px;"></i> Beri Petunjuk Jalan</button> '+
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
 var url;
  if(typeof details.photos !== 'undefined'  || !details.photos){
    url = details.photos[0].getUrl({'maxWidth':400, 'maxHeight':400});
  }
  else{
    url = '';
  }

  var str = details.name.replace(/\s+/g, '');
  toDivApotek.innerHTML += 
    '<div class="card col s12 id="'+str+'">'+
        '<h5>'+details.name+'</h5>'+
        // '<h5> id:'+details.id+'</h5>'+
        '<div class="photo"><img class="responsive-img" src="'+url+'"/></div>'+
        '<button onclick="getDirection('+details.geometry.location.lat()+', '+details.geometry.location.lng()+')" class="btn btn-direction" style="margin-bottom: 20px; margin-top:10px;" disabled><i class="flaticon-location68" style="margin-left: -20px;"></i> Beri Petunjuk Jalan</button> <div class="distance"></div>'+
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
  var url;
  if(typeof details.photos !== 'undefined'  || !details.photos){
    url = details.photos[0].getUrl({'maxWidth':400, 'maxHeight':400});
  }
  else{
    url = '';
  }

  var str = details.name.replace(/\s+/g, '');
  toDivKlinik.innerHTML += 
    '<div class="card col s12" id="'+str+'">'+
        '<h5>'+details.name+'</h5>'+
        '<div class="photo"><img class="responsive-img" src="'+url+'"/></div>'+
        '<button onclick="getDirection('+details.geometry.location.lat()+', '+details.geometry.location.lng()+')" class="btn btn-direction" style="margin-bottom: 20px; margin-top:10px;" disabled><i class="flaticon-location68" style="margin-left: -20px;"></i> Beri Petunjuk Jalan</button> '+
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

// function getMeta(url){   
//     var img = new Image();
//     img.onload = function(){
//       window.checkW = this.width;
//       window.checkH = this.height;
//     };
//     img.src = url;
// }

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
	
	// var mapOptions = {
 //      center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
 //      zoom: 15,
 //      mapTypeId: google.maps.MapTypeId.ROADMAP
 //    }

  // map = new google.maps.Map(mapCanvas, mapOptions);
  var image = 'http://localhost/sig/assets/img/marker-home.png';
  var marker = new google.maps.Marker({
    map: map,
    icon: image,
    position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
  });

  // marker.setMap(map);
  markers.push(marker);
  marker.setAnimation(google.maps.Animation.BOUNCE);
  btnNearest.disabled = false;
  $('.btn-direction').prop('disabled', false);
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

function getDirection(latDest, lngDest) {
  var directionsService = new google.maps.DirectionsService;
  // var directionsDisplay;

  if(directionsDisplay != null) {
      directionsDisplay.setMap(null);
      var directionsDisplay = null;
  }
  var directionsDisplay = new google.maps.DirectionsRenderer;

  directionsDisplay.setMap(map);
  
  calculateAndDisplayRoute(directionsService, directionsDisplay, latDest, lngDest);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, latDest, lngDest) {
  var myLocation = new google.maps.LatLng(myLat,myLng);
  var myDestination = new google.maps.LatLng(latDest,lngDest);

  directionsService.route({
    origin: myLocation,
    destination: {lat: latDest, lng: lngDest},
    // destination: {location},
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
  clearMarkers();
  var str = parseInt(google.maps.geometry.spherical.computeDistanceBetween(myLocation, myDestination))/1000;

  $("#demo").append(str + " km") ;
}

function loadDoc() {
  var place_id = 'ChIJgZi6JTnsaS4R0a7kLTngTA8';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // var response = xmlhttp.responseText;
      // var data = JSON.parse(response);
      // document.getElementById("demo").innerHTML = data;
      document.getElementById("demo").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("POST", "http://localhost/sig/index.php/sig/getLocation/"+place_id, true);
  xhttp.send();
}

function loadDB(){   
  // var image = 'http://localhost/sig/assets/img/marker-places.png';
  // clearMarkers();
  jQuery.ajax({
    type: "POST",
    url: "http://localhost/sig/index.php/Sig/showAll/",
    success: function(res){
      if (res){
        var obj = jQuery.parseJSON(res);
        var resultQuery = "";
        for (var i=0 ; i<obj.query.length; i++){
          var idx = compare(obj.query[i].id);
          if(idx>-1){
            createMarkerDB(obj.query[i]);
            // markers[idx].setMap(null);
            // markers[idx]=null;
            console.log("MASUK IF: "+idx);
          }
          else{
            console.log("ENGGAK: "+idx);
          }

          // console.log("Nama: "+obj.query[i].nama);
          // console.log("Lat: "+obj.query[i].latitude);
          // console.log("Lng: "+obj.query[i].longitude);
        }
        $("#demo").html(resultQuery);
      }
    }
      });
}

function getIdx(id){
  for(var i = 0; i < compareId.length; i++) {
     if(compareId[i].id === id) {
       return i;
     }
     else{
      return -1;
     }
  }
}

function createMarkerDB(o){
  var objLat = parseFloat(o.latitude);
  var objLng = parseFloat(o.longitude);
  objLatLng = new google.maps.LatLng(objLat, objLng);

  var marker = new google.maps.Marker({
    map: map,
    position: objLatLng,
    // icon: image,
    animation: google.maps.Animation.DROP
  }); 

  var infowindow = new google.maps.InfoWindow({
      content: o.nama+"<br>"+o.latitude+", "+o.longitude
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  markers.push(marker);

  var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: o.id
  }, callback2);
}

function yoman(){
  for(var i = 0; i < compareId.length; i++) {
    // var idx = getIdx(compareId[i].id);
    // markers[idx].setMap(null);
    // markers[idx]=null;      
    var objLatLng = compareId[i].position;
    var marker = new google.maps.Marker({
      map: map,
      position: objLatLng,
      // icon: image,
      animation: google.maps.Animation.DROP
    }); 

    var infowindow = new google.maps.InfoWindow({
        content: compareId[i].name
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    markers.push(marker);

    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
      placeId: compareId[i].id
    }, callback2);
  }

  
}

