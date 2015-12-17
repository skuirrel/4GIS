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
<<<<<<< HEAD


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
=======
var compareId = [];
var idPlace = [];
var directionsService;
var directionsDisplay;
var directionOn = false;


function initialize() {
  //DRAW MAP
  var mapCanvas = document.getElementById('map');
  var depok = new google.maps.LatLng(-6.3680686,106.82737);
  var mapOptions = {
    center: depok,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(mapCanvas, mapOptions);
>>>>>>> 541b7bc87f9ca338ca78a29b4d85105acd630110

  //GET CURRENT POSITION
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
  }

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
    
  jQuery.ajax({
      type: "POST",
      url: "http://localhost/sig/index.php/Sig/showAll/",
      success: function(res){
        // if (res){
        //   var obj = jQuery.parseJSON(res);
        //   if(obj.bs){
        //     compareId.push({name: place.name, id:place.place_id, position:place.geometry.location});
        //   }
        // }
        var obj = jQuery.parseJSON(res);
        // console.log(obj.query[0].id);
        for(var i = 0; i < obj.query.length; i++) {
          // console.log(res[i]);
          createMarkerDB(obj.query[i]);
        }
      }
  });

  //SEARCH PLACES
  // Create the search box and link it to the UI element.
  var input = document.getElementById('all-search');
  var searchBox = new google.maps.places.SearchBox(input);

<<<<<<< HEAD
    // Create the search box and link it to the UI element.
    var input = document.getElementById('all-search');
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
=======
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
>>>>>>> 541b7bc87f9ca338ca78a29b4d85105acd630110

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
<<<<<<< HEAD

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
=======
>>>>>>> 541b7bc87f9ca338ca78a29b4d85105acd630110
    });
    map.fitBounds(bounds);
  });

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
    position: new google.maps.LatLng(myLat,myLng)
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

  var infowindow = new google.maps.InfoWindow({
      content: place.name
  });

<<<<<<< HEAD
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      dataa = xhttp.responseText;
      // dataaa = JSON.parse(response);

      
      // document.getElementById("demo").innerHTML = dataa;

      if(dataa){
        // document.getElementById("demo").innerHTML = dataa;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          // position: (dataa("lat"), dataa("lng")),
          icon: image,
          animation: google.maps.Animation.DROP
        }); 
      }

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

      var service = new google.maps.places.PlacesService(map);
        service.getDetails({
          placeId: place.place_id
        }, callback2);
    }
  };
  xhttp.open("POST", "http://localhost/sig/index.php/sig/isInList/"+place.place_id, true);
  xhttp.send();

  // var marker = new google.maps.Marker({
  //   map: map,
  //   position: place.geometry.location,
  //   icon: image,
  //   animation: google.maps.Animation.DROP
  // });

  markers.push(marker);

}

function clearMarkers() {
  // setMapOnAll(null);
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];
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
  var url;
  if(typeof details.photos !== 'undefined' || !details.photos){
    url = details.photos[0].getUrl({'maxWidth':400, 'maxHeight':400});
  }
  else{
    url = '';
  }
  
  var str = details.name.replace(/\s+/g, '');
  toDivRS.innerHTML += 
    '<div class="card col s12 id="'+str+'">'+
        '<h5>'+details.name+'</h5>'+
        // // '<h5> lokasi:'+details.coords.latitude+'</h5>'+
        '<img class="responsive-img" src="'+url+'"/>'+
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
  // toDivApotek.empty();
 var url;
  if(typeof details.photos !== 'undefined'  || !details.photos){
    url = details.photos[1].getUrl({'maxWidth':400, 'maxHeight':400});
  }
  else{
    url = '';
=======
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

  // var service = new google.maps.places.PlacesService(map);
  //   service.getDetails({
  //     placeId: place.place_id
  //   }, callback2);

  //CHECK IN DB
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

function createMarkerDB(res){

  var img = 'http://localhost/sig/assets/img/marker-v-places.png';
  var lat = res.latitude;
  var lng = res.longitude;

  var infowindow = new google.maps.InfoWindow({
      content: res.nama
  });

  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(lat,lng),
    icon: img,
    animation: google.maps.Animation.DROP
  }); 

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  markers.push(marker);

    // var service = new google.maps.places.PlacesService(map);
    // service.getDetails({
    //   placeId: compareId[i].id
    // }, callback2);
    // console.log("i: "+i);
  
}

function hideMarker(id){
  for(var i = 0; i < idPlace.length; i++) {
    if(idPlace[i] === id) {
      markers[i].setMap(null); 
    }
  }
}

  var str = details.name.replace(/\s+/g, '');
  toDivApotek.innerHTML += 
    '<div class="card col s12 id="'+str+'">'+
        '<h5>'+details.name+'</h5>'+
        // '<h5> id:'+details.id+'</h5>'+
        '<img class="responsive-img" src="'+url+'"/>'+
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
  // toDivKlinik.empty();
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
        '<img class="responsive-img" src="'+url+'"/>'+
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
=======
// function createMarkerDB(){
//   console.log("CALLED");
//   var img = 'http://localhost/sig/assets/img/marker-v-places.png';
//   console.log("Len: "+compareId.length);
//   for(var i = 0; i < compareId.length; i++) {
//     hideMarker(compareId[i].id);

//     var objLatLng = compareId[i].position;

//     var infowindow = new google.maps.InfoWindow({
//         content: compareId[i].name
//     });

//     var markernew = new google.maps.Marker({
//       map: map,
//       position: objLatLng,
//       icon: img,
//       animation: google.maps.Animation.DROP
//     }); 

//     markernew.addListener('click', function() {
//       infowindow.open(map, markernew);
//     });
//     markers.push(markernew);

//     var service = new google.maps.places.PlacesService(map);
//     service.getDetails({
//       placeId: compareId[i].id
//     }, callback2);
//     console.log("i: "+i);
//   }
// }

function getLocation() {
  var pos = new google.maps.LatLng(myLat,myLng);
  // google.maps.event.addListener(marker, 'click', function() {
   map.panTo(pos);
  // });  
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
      types: ["hospital", "pharmacy", "dentist", "doctor"]
    }, callback);

    var service2 = new google.maps.places.PlacesService(map);
    service2.nearbySearch({
      location: myLocation,
      radius: 500,
      name: "rumah sakit",
      types: ["hospital", "pharmacy", "dentist", "doctor"]
    }, callback);

    var service3 = new google.maps.places.PlacesService(map);
    service3.nearbySearch({
      location: myLocation,
      radius: 500,
      name: "klinik",
      types: ["hospital", "pharmacy", "dentist", "doctor"]
    }, callback);

    jQuery.ajax({
      type: "POST",
      url: "http://localhost/sig/index.php/Sig/showAll/",
      success: function(res){
        // if (res){
        //   var obj = jQuery.parseJSON(res);
        //   if(obj.bs){
        //     compareId.push({name: place.name, id:place.place_id, position:place.geometry.location});
        //   }
        // }
        var obj = jQuery.parseJSON(res);
        // console.log(obj.query[0].id);
        for(var i = 0; i < obj.query.length; i++) {
          // console.log(res[i]);
          createMarkerDB(obj.query[i]);
        }
      }
  });

}

function showToDivApotek(res){
  var url;
  // if(typeof details.photos !== 'undefined'  || !details.photos){
  //   url = details.photos[0].getUrl({'maxWidth':400, 'maxHeight':400});
  // }
  // else{
  //   url = '';
  // }
  url = 'http://localhost/sig/assets/img/'+res.foto1;
  // var str = details.name.replace(/\s+/g, '');
  var str = res.nama;

    var alamat;
    var telepon;
    var jam_buka;
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
    placeId: res.id
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log("Alamat: "+place.formatted_address);
      console.log("jam buka: "+place.opening_hours);
      alamat = place.formatted_address;
      telepon = place.formatted_phone_number;
      jam_buka = place.opening_hours;    

 
  toDivApotek.innerHTML += 
    '<div class="card col s12 id="'+str+'">'+
        '<h5>'+res.nama+'</h5>'+
        // '<h5> id:'+details.id+'</h5>'+
        '<div class="photo"><img class="responsive-img" src="'+url+'"/></div>'+
        '<button onclick="getDirection('+res.latitude+', '+res.longitude+')" class="btn btn-direction" style="margin-bottom: 20px; margin-top:10px;"><i class="flaticon-location68" style="margin-left: -20px;"></i> Beri Petunjuk Jalan</button> <div class="distance"></div>'+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-pin60" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+alamat+'</div>'+
        '</div>'+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-active5" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+telepon+'</div>'+
        '</div>'+
        '<div class="row valign-wrapper">'+
          '<div class="col s2 valign">'+
            '<div class="chip teal accent-4">'+
              '<i class="flaticon-alarm68" style="margin-left: -20px; color: #fff;"></i>'+
            '</div>'+
          '</div>'+
          '<div class="col s10 valign">'+jam_buka+'</div>'+
        '</div>'+
      '</div>';

      }
  });
>>>>>>> 541b7bc87f9ca338ca78a29b4d85105acd630110
}


<<<<<<< HEAD
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
=======
 
function getDirection(latDest, lngDest) {
>>>>>>> 541b7bc87f9ca338ca78a29b4d85105acd630110
  
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
  clearMarkers();
  var str = parseInt(google.maps.geometry.spherical.computeDistanceBetween(myLocation, myDestination))/1000;

  $("#demo").append(str + " km") ;
<<<<<<< HEAD
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
=======

  directionOn = true;

  // var legs = directionsDisplay;
  // console.log(legs.toSource()+"");
  // $("#demo").append(" "+legs + " km") ;

}

function clearMarkers() {
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];
}
>>>>>>> 541b7bc87f9ca338ca78a29b4d85105acd630110
