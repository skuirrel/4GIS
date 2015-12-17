// var x = document.getElementById("");
var toDivAll = document.getElementById("div-all");
var toDivRS = document.getElementById("div-rs");
var toDivApotek = document.getElementById("div-apotek");
var toDivKlinik = document.getElementById("div-klinik");
var toDivLain = document.getElementById("div-lain");
var btnMyLoc = document.getElementById("btn-myloc");
var btnNearest = document.getElementById("btn-nearest");
// var btnDirection = document.getElementById("btn-direction");
var map;
var markers = [];
var nama = 'aa';
var compareId = [];
var idPlace = [];
var directionsService;
var directionsDisplay;
var directionOn = false;


function initialize() {

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    var mapCanvas = document.getElementById('map');
    var depok = new google.maps.LatLng(-6.3680686,106.82737)
    var mapOptions = {
      center: depok,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions);

    directionsDisplay.setMap(map);

    // directionsDisplay.removeDirection(,);

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
      var image = 'http://localhost/sig/assets/img/marker-places.png';
      places.forEach(function(place) {
        var infowindow = new google.maps.InfoWindow({
          content: place.name
        });
        var marker = new google.maps.Marker({
          map: map,
          icon: image,
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
  idPlace.push(place.place_id);

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
              console.log('IYA ADA BRO'+place.place_id);
              compareId.push({name: place.name, id:place.place_id, position:place.geometry.location});
            }
          }
        }
      });
    // }
}

function callback2(details, status){
  console.log("brpsi");

  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log("OK");

    if((details.name.toLowerCase().indexOf("rumah sakit") > -1) || (details.name.indexOf("RS") > -1)){
      showToDivRS(details);
    }
    else if((details.name.toLowerCase().indexOf("apotek") > -1) || (details.name.toLowerCase().indexOf("apotik") > -1)){
      showToDivApotek(details);
    }
    else if((details.name.toLowerCase().indexOf("klinik") > -1) || (details.name.toLowerCase().indexOf("dokter") > -1)){
      showToDivKlinik(details);
    }
  }
  else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
    console.log("OVER");
    setTimeout(function() {
        // if((details.name.toLowerCase().indexOf("rumah sakit") > -1) || (details.name.indexOf("RS") > -1)){
        //   showToDivRS(details);
        // }
        // else if((details.name.toLowerCase().indexOf("apotek") > -1) || (details.name.toLowerCase().indexOf("apotik") > -1)){
        //   showToDivApotek(details);
        // }
        // else if((details.name.toLowerCase().indexOf("klinik") > -1) || (details.name.toLowerCase().indexOf("dokter") > -1)){
        //   showToDivKlinik(details);
        // }
        console.log("OK 2");
    }, 1000);
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

function showToDivLain(details){
  var url;
  if(typeof details.photos !== 'undefined'  || !details.photos){
    url = details.photos[0].getUrl({'maxWidth':400, 'maxHeight':400});
  }
  else{
    url = '';
  }

  var str = details.name.replace(/\s+/g, '');
  toDivLain.innerHTML += 
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

    if(directionOn){
      directionsDisplay.setMap(null);
    }
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
  var mapCanvas = document.getElementById('map');


  // window.myLat = position.coords.latitude;
  // window.myLng = position.coords.longitude;
  window.myLat = -6.368058;
  window.myLng = 106.817440;
  
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
    position: new google.maps.LatLng(window.myLat,window.myLng)
    // position: new google.maps.LatLng(-6.368058,106.817440)
  });
  var bounds = new google.maps.LatLngBounds();
  bounds.extend(marker.position);
  map.fitBounds(bounds);

  // marker.setMap(map);
  markers.push(marker);
  marker.setAnimation(google.maps.Animation.BOUNCE);
  // map.panTo(marker.position);
  btnNearest.disabled = false;
  $('.btn-direction').prop('disabled', false);
}

function getNearest(){

  if(directionOn){
    directionsDisplay.setMap(null);
  }
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
// 
function getDirection(latDest, lngDest) {
  // var directionsService = new google.maps.DirectionsService;
  // var directionsDisplay = new google.maps.DirectionsRenderer;
  // // directionsDisplay.setDirections({routes: []});

  // directionsDisplay.setMap(map);
  
  calculateAndDisplayRoute(directionsService, directionsDisplay, latDest, lngDest);
}

function removeDirection(directionsDisplay) {

  // directionsDisplay.setDirections({routes: []});

  directionsDisplay.setMap(null);
  directionsDisplay.set('direction', null);
  
}



function calculateAndDisplayRoute(directionsService, directionsDisplay, latDest, lngDest) {
  console.log("Loc: "+window.myLat+', '+window.myLng);
  console.log("Dest: "+latDest+', '+lngDest);
  var myLocation = new google.maps.LatLng(window.myLat,window.myLng);
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

  directionOn = true;

  // var legs = directionsDisplay;
  // console.log(legs.toSource()+"");
  // $("#demo").append(" "+legs + " km") ;

}

function hideMarker(id){
  for(var i = 0; i < idPlace.length; i++) {
    if(idPlace[i] === id) {
      markers[i].setMap(null); 
    }
  }
}

function callbacknew() {
  console.log("CALLED");
  console.log("Len: "+compareId.length);
  for(var i = 0; i < compareId.length; i++) {
    createMarkerDB(compareId[i]);
  }
  
}

function createMarkerDB(compareId){
  
  var img = 'http://localhost/sig/assets/img/marker-v-places.png';
  

    hideMarker(compareId.id);

    var objLatLng = compareId.position;

    var infowindow = new google.maps.InfoWindow({
        content: compareId.name
    });

    var markernew = new google.maps.Marker({
      map: map,
      position: objLatLng,
      icon: img,
      animation: google.maps.Animation.DROP
    }); 

    markernew.addListener('click', function() {
      infowindow.open(map, markernew);
    });
    markers.push(markernew);

    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
      placeId: compareId.id
    }, callback2);
    // console.log("i: "+i);
  
}

// function saveToDB(place){
//   jQuery.ajax({
//     type: "POST",
//     url: "http://localhost/sig/index.php/Sig/saveData/",
//     data: {
//       id: place.place_id,
//       name: place.name,
//       photos: place.photos[0].getUrl({'maxWidth':400, 'maxHeight':400}),
//       address: place.formatted_address,
//       telp: place.formatted_phone_number,
//       opening_hours: place.opening_hours
//     }
//   }).done(function(){
//     alert("SAVED");
//   })
// }

