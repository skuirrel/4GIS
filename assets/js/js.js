// var x = document.getElementById("");
var toDivAll = document.getElementById("div-all");
var toDivPlace = document.getElementById("div-place");
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
var database = [];
var distanceCompare = [];
var infowindow = null;


function initialize() {
  //DRAW MAP

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  var mapCanvas = document.getElementById('map');
  var depok = new google.maps.LatLng(-6.3680686,106.82737);
  var mapOptions = {
    center: depok,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(mapCanvas, mapOptions);
  directionsDisplay.setMap(map);
  //GET CURRENT POSITION
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
  }

  directionsDisplay.setMap(map);

  var service1 = new google.maps.places.PlacesService(map);
  service1.nearbySearch({
    location: depok,
    radius: 2000,
    name: "apotek",
    types: ["pharmacy"]
  }, callback);

  var service2 = new google.maps.places.PlacesService(map);
  service2.nearbySearch({
    location: depok,
    radius: 2000,
    name: "rumah sakit",
    types: ["hospital"]
  }, callback);

  var service3 = new google.maps.places.PlacesService(map);
  service3.nearbySearch({
    location: depok,
    radius: 2000,
    name: "klinik",
    types: ["doctor"]
  }, callback);
    
  jQuery.ajax({
      type: "POST",
      url: "http://localhost/sig/index.php/Sig/showAll/",
      success: function(res){
        var obj = jQuery.parseJSON(res);
        for(var i = 0; i < obj.query.length; i++) {
          createMarkerDB(obj.query[i]);
          database.push({lat: obj.query[i].latitude, lng: obj.query[i].longitude, nama: obj.query[i].nama});
        }
      }
  });

  //SEARCH PLACES
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
    // places.forEach(function(place) {
    //   var infowindow = new google.maps.InfoWindow({
    //     content: place.name
    //   });
    //   var marker = new google.maps.Marker({
    //     map: map,
    //     icon: image,
    //     title: place.name,
    //     position: place.geometry.location,
    //     animation: google.maps.Animation.DROP,
    //     type: type
    //   })

    //   // Create a marker for each place.
    //   markers.push(marker);
    //   marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    //   });

    //   if (place.geometry.viewport) {
    //     // Only geocodes have viewport.
    //     bounds.union(place.geometry.viewport);
    //   } else {
    //     bounds.extend(place.geometry.location);
    //   }
    // });
    map.fitBounds(bounds);
  });

}

function getLocation() {
  var pos = new google.maps.LatLng(myLat,myLng);
  // google.maps.event.addListener(marker, 'click', function() {
   map.panTo(pos);
  // });  
}

function showPosition(position) {
  var mapCanvas = document.getElementById('map');

  window.myLat = position.coords.latitude;
  window.myLng = position.coords.longitude;
  window.myPos = new google.maps.LatLng(myLat,myLng);
  
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
    position: new google.maps.LatLng(myLat,myLng),
    category: "home"
  });

  markers.push(marker);
  marker.setAnimation(google.maps.Animation.BOUNCE);
  map.panTo(marker.position);
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
  var service = new google.maps.places.PlacesService(map);

  console.log('id '+place.place_id)
  jQuery.ajax({
    type: "POST",
    url: "http://localhost/sig/index.php/Sig/isInList/"+place.place_id,
    success: function(res){
      // if (res){
        var obj = jQuery.parseJSON(res);
        var isInList = obj.bs;
        console.log('ada '+isInList);
        if(!isInList){
        //   console.log('IYA ADA BRO');
        //   compareId.push({name: place.name, id:place.place_id, position:place.geometry.location});
          // console.log("COMPARE");
          var infowindow = new google.maps.InfoWindow({
              content: place.name
          });

          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: image,
            animation: google.maps.Animation.DROP
          });


          marker.category = "pharmacy";

          marker.addListener('click', function() {
            if (infowindow) {
                infowindow.close();
            }
            infowindow.open(map, marker);
            service.getDetails({
              placeId: place.place_id
            }, showToDiv);
          });
          markers.push(marker);
          idPlace.push(place.place_id);



        // }
      }
    }
  });






  // var marker = new google.maps.Marker({
  //   map: map,
  //   position: place.geometry.location,
  //   icon: image,
  //   animation: google.maps.Animation.DROP,
  //   category: place.types[0]
  // });

  // marker.addListener('click', function() {
  //   infowindow = new google.maps.InfoWindow({
  //     content: place.name
  //   });

  //   infowindow.open(map, marker);
  //   service.getDetails({
  //     placeId: place.place_id
  //   }, showToDiv);
  // });
  // markers.push(marker);
  // idPlace.push(place.place_id);


  // CHECK IN DB
  // jQuery.ajax({
  //   type: "POST",
  //   url: "http://localhost/sig/index.php/Sig/isInList/"+place.place_id,
  //   success: function(res){
  //     if (res){
  //       var obj = jQuery.parseJSON(res);
  //       if(obj.bs){
  //         console.log('IYA ADA BRO');
  //         compareId.push({name: place.name, id:place.place_id, position:place.geometry.location});
  //         // console.log("COMPARE");
  //       }
  //     }
  //   }
  // });
}

function showToDiv(details, status){
  toDivPlace.innerHTML = '';
  var url;
  console.log(details.photos);
  console.log(!details.photos);
  
  // if(typeof details.photos !== 'undefined' || !details.photos){
  //   url = details.photos[0].getUrl({'maxWidth':400, 'maxHeight':400});
  // }
  // else{
  //   url = '';
  // }
  console.log(details.name.replace(/\s+/g, ''));
  var str = details.name.replace(/\s+/g, '');

  toDivPlace.innerHTML += 
    '<div class="card col s12 id="'+str+'">'+
        '<h5>'+details.name+'</h5>'+
        // // '<h5> lokasi:'+details.coords.latitude+'</h5>'+
        '<div class="photo"><img class="responsive-img" src="'+url+'"/></div>'+
        '<button onclick="getDirection('+details.geometry.location.lat()+', '+details.geometry.location.lng()+')" class="btn btn-direction" style="margin-bottom: 20px; margin-top:10px;"><i class="flaticon-location68" style="margin-left: -20px;"></i> Beri Petunjuk Jalan</button> '+
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

function showToDivDB(details, status){
  toDivPlace.innerHTML = '';
  
  console.log(details.photos);
  console.log(!details.photos);
  
  var url = 'http://localhost/sig/assets/img/'+details.place_id+'.jpg';
  console.log(url);
  // if(typeof details.photos !== 'undefined' || !details.photos){
  //   url = details.photos[0].getUrl({'maxWidth':400, 'maxHeight':400});
  // }
  // else{
  //   url = '';
  // }
  console.log(details.name.replace(/\s+/g, ''));
  var str = details.name.replace(/\s+/g, '');

  toDivPlace.innerHTML += 
    '<div class="card col s12 id="'+str+'">'+
        '<h5>'+details.name+'</h5>'+
        // // '<h5> lokasi:'+details.coords.latitude+'</h5>'+
        '<div class="photo"><img class="responsive-img" src="'+url+'"/></div>'+
        '<button onclick="getDirection('+details.geometry.location.lat()+', '+details.geometry.location.lng()+')" class="btn btn-direction" style="margin-bottom: 20px; margin-top:10px;"><i class="flaticon-location68" style="margin-left: -20px;"></i> Beri Petunjuk Jalan</button> '+
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

function createMarkerDB(res){

  var img = 'http://localhost/sig/assets/img/marker-v-places.png';
  var lat = res.latitude;
  var lng = res.longitude;

  var service = new google.maps.places.PlacesService(map);

  var infowindow = new google.maps.InfoWindow({
      content: res.nama+" "+res.id
  });

  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(lat,lng),
    icon: img,
    animation: google.maps.Animation.DROP
  }); 

  marker.addListener('click', function() {
    infowindow.open(map, marker);
    service.getDetails({
        placeId: res.id
      }, showToDivDB);
    });
  markers.push(marker);
  
    // var service = new google.maps.places.PlacesService(map);
    // service.getDetails({
    //   placeId: compareId[i].id
    // }, callback2);
    // console.log("i: "+i); 
}

function createNearestDB(lat, lng, name, myPos){
  // console.log("MASUK CREATE");
  var latLngDB = new google.maps.LatLng(lat,lng);
  distanceCompare.push({position: latLngDB, name: name});
  setNearestDB(myPos, latLngDB, name);
}

function setNearestDB(myPos, latLngDB, name){
  // console.log("MASUK SET");
  var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngDB, myPos);
  var setDistance = 600;
  console.log('Distance of '+latLngDB+ 'and original position' + myPos+ 'Is equal to '+distance);
  // updateResults();
  if (distance < setDistance) {
    addMarkerDB(latLngDB, name);
    // stopsfound++;
    // updateResults();
  }
}

function addMarkerDB(position, name) {
  var img = 'http://localhost/sig/assets/img/marker-v-places.png';
  console.log('Adding Marker ' + name);
  var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: name,
      icon: img
  });
  
  marker.addListener('click', function() {
    infowindow = new google.maps.InfoWindow({
      content: name
    });

    infowindow.open(map, marker);
    service.getDetails({
      placeId: place.place_id
    }, showToDiv);
  });

  markers.push(marker);
}

function hideMarker(id){
  for(var i = 0; i < idPlace.length; i++) {
    if(idPlace[i] === id) {
      markers[i].setMap(null); 
    }
  }
}

function getNearest(){
  var myLocation = new google.maps.LatLng(myLat,myLng);

  clearMarkers();
  var image = 'http://localhost/sig/assets/img/marker-home.png';
  var marker = new google.maps.Marker({
    map: map,
    icon: image,
    position: myLocation,
    animation: google.maps.Animation.BOUNCE
  });

  var service1 = new google.maps.places.PlacesService(map);
    service1.nearbySearch({
      location: myLocation,
      radius: 500,
      name: "apotek",
      types: ["pharmacy"]
    }, callback);

    var service2 = new google.maps.places.PlacesService(map);
    service2.nearbySearch({
      location: myLocation,
      radius: 500,
      name: "rumah sakit",
      types: ["hospital"]
    }, callback);

    var service3 = new google.maps.places.PlacesService(map);
    service3.nearbySearch({
      location: myLocation,
      radius: 500,
      name: "klinik",
      types: ["doctor"]
    }, callback);

    console.log("Len DB: "+database.length);
    for(var i = 0; i < database.length; i++) {
      createNearestDB(database[i].lat, database[i].lng, database[i].nama, myPos);
      // console.log("PANGGIL CREATE");
    }

}

function getDirection(latDest, lngDest) {

  calculateAndDisplayRoute(directionsService, directionsDisplay, latDest, lngDest);
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
  // clearMarkers();
  var str = parseInt(google.maps.geometry.spherical.computeDistanceBetween(myLocation, myDestination))/1000;

  $("#div-place").append(str + " km") ;

}

showDiv = function showType(category) {
    for (i = 0; i < markers.length; i++) {
        marker = markers[i];
        // If is same category or category not picked
        if (marker.category == category || category.length === 0) {
            marker.setVisible(true);
        }
        else if(marker.category=="home"){
          marker.setVisible(true);
        }
        // Categories don't match 
        else {
            marker.setVisible(false);
        }
    }

       
}

function clearMarkers() {
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];
}

function hideMarker(id){
  for(var i = 0; i < idPlace.length; i++) {
    if(idPlace[i] === id) {
      console.log("YEY");
      console.log(idPlace[i]);
      markers[i].setMap(null); 
    }
  }
}
