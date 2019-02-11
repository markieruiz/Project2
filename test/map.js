
var map;
var marker = null;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.314786, lng: -97.738267 },
    zoom: 12
  });
  map.addListener("click", function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });
}
function placeMarkerAndPanTo(latLng, map) {
  if (marker !== null) {
    marker.setMap(null);
  }
  marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  var lat = marker.getPosition().lat();
  var long = marker.getPosition().lng();
  var coords = lat + ", " + long;
  $("#myloc").val(coords);
  map.panTo({lat: lat, lng: long});
}