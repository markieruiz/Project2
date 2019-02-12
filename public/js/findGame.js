$(document).ready(function () {
  $("#search").on("click", function (event) {
    event.preventDefault();
    var id = $("#search").data("id")
    filterSearch();
  });

  function filterSearch() {
    var checks = $(".sports");
    var starttime = $("#starttime").val();
    var mysports = [];
    for (var i = 0; i < 3; i++) {
      if (checks[i].checked === true) {
        mysports.push(checks[i].id);
      }
    }

    var myfilter = {
      location: $("#myloc").val(),
      distance: $("#distance").val(),
      sports: mysports,
      endtime: starttime
    };

    $.ajax({
      url: "/api/filter",
      method: "PUT",
      data: myfilter,
      dataType: "json"
    }).then(function (results) {
      deleteMarkers();
      for (i in results) {
        let marker = new google.maps.Marker({
          position: {
            lat: parseFloat(results[i].latitude),
            lng: parseFloat(results[i].longitude)
          },
          map: map
        });

        markers.push(marker);
        let infowindow = new google.maps.InfoWindow({
          content:
            "<h4>" +
            results[i].title +
            "</h4>" +
            "<br/>" +
            "<p>" +
            results[i].description +
            "</p>" +
            "<button id=' " +
            i +
            "'>Select</button>"
        });
        infowindows.push(infowindow);
      }

      showMarkers();
      console.log("finish");
    });
  }
});

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
        $("#strLoc").val(results[0].formatted_address)

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

$(function () {
  var d = new Date(),
    h = d.getHours(),
    m = d.getMinutes();
  if (h < 10) h = '0' + h;
  if (m < 10) m = '0' + m;
  $('input[type="time"][value="now"]').each(function () {
    $(this).attr({ 'value': h + ':' + m });

  });
  $('input[type="date"][value="today"]').each(function () {
    $(this).attr({ 'value': d });
    console.log(d);
  });
});



