$(document).ready(function () {
  $("#creategame").on("click", function (event) {
    var totalLocation = $("#myloc").val().toString();
    var locationSplit = totalLocation.split(",");

    event.preventDefault();
    var mygame = {
      title: $("#title").val(),
      description: $("#description").val(),
      sport: $("#sports").val(),
      latitude: parseFloat(locationSplit[0]).toFixed(6),
      longitude: parseFloat(locationSplit[1]).toFixed(6),
      starttime: $("#start").val(),
      UserId: $("#creategame").data("id")
    };

    $.post("/api/meetup", mygame,
      function (data) {
        console.log(data);

      });

    document.getElementById('title').value = '';
    document.getElementById('strCreateLoc').value = '';
    document.getElementById('sports').value = '';
    document.getElementById('description').value = '';
    document.getElementById('start').value = '';
  });

});

//map 
var map;
var marker = null;
var markers = [];
var infowindows = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.314786, lng: -97.738267 },
    zoom: 12
  });

  map.addListener("click", function (e) {
    if (marker !== null) {
      marker.setMap(null);
    }
    for (let j = 0; j < infowindows.length; j++) {
      infowindows[j].close();
    }
    placeMarkerAndPanTo(e.latLng, map);
  });
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.314786, lng: -97.738267 },
    zoom: 12
  });

  map.addListener("click", function (e) {
    if (marker !== null) {
      marker.setMap(null);
    }
    for (let j = 0; j < infowindows.length; j++) {
      infowindows[j].close();
    }
    placeMarkerAndPanTo(e.latLng, map);
  })

}

function placeMarkerAndPanTo(latLng, map) {
  marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  var geocoder = new google.maps.Geocoder;
  var lat = marker.getPosition().lat();
  var long = marker.getPosition().lng();
  var coords = lat + ", " + long;
  var latlngStr = coords.split(',', 2);
  var strLoc = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };

  $("#myloc").val(coords);

  console.log(coords);
  console.log(strLoc);
  console.log(coords);

  geocoder.geocode({ 'location': strLoc }, function (results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(12);
        $("#strCreateLoc").val(results[0].formatted_address)

      }
    }
  });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    let infowindow = infowindows[i];
    let marker = markers[i];
    markers[i].setMap(map);

    google.maps.event.addListener(marker, "click", function () {
      for (let j = 0; j < infowindows.length; j++) {
        infowindows[j].close();
      }
      infowindow.open(map, marker);
    });
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
  infowindows = [];
  console.log("cleared", markers);
}

