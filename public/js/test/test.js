$(document).ready(function () {
  var datetoday = new Date();
  var getyear = datetoday.getFullYear();
  var getmonth = datetoday.getMonth() + 1;
  if (getmonth < 10) {
    getmonth = "0"+getmonth;
  }
  var getday = datetoday.getDate();
  if (getday < 10) {
    getday = "0"+getday;
  }
  var gethours = datetoday.getHours();
  if (gethours < 10) {
    gethours = "0"+gethours;
  }
  var getminutes = datetoday.getMinutes();
  if (getminutes < 10) {
    getminutes = "0"+getminutes;
  }
  var today = getyear + "-" + getmonth + "-" + getday + "T" + gethours +":" + getminutes;
  $("#starttime").val(today);
  var tomorrow = datetoday.setDate(datetoday.getDate() + 14);
  getyear = datetoday.getFullYear();
  getmonth = datetoday.getMonth() + 1;
  var getmonth = datetoday.getMonth() + 1;
  if (getmonth < 10) {
    getmonth = "0"+getmonth;
  }
  var getday = datetoday.getDate();
  if (getday < 10) {
    getday = "0"+getday;
  }
  var gethours = datetoday.getHours();
  if (gethours < 10) {
    gethours = "0"+gethours;
  }
  var getminutes = datetoday.getMinutes();
  if (getminutes < 10) {
    getminutes = "0"+getminutes;
  }
  var tomorrow = getyear + "-" + getmonth + "-" + getday + "T" + gethours +":" + getminutes;
  $("#endtime").val(tomorrow);


  $("#findgames").on("click", function(event) {
    event.preventDefault();
    filterSearch();
  });

  function filterSearch() {
    var checks = $(".sports");
    var starttime = $("#starttime").val();
    var endtime = $("#endtime").val();
    var id = $("#findgames").data("id")
    var mysports = [];
    for (var i = 0; i < 3; i++) {
      if (checks[i].checked === true) {
        mysports.push(checks[i].id);
      }
    }
    var address = $("#mylocation").val().trim();
    address = address.replace(/[,\.]/g, "");
    address = address.replace(/ /g, "+");
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&country=USA&key=AIzaSyDeVsDpithk85NHs2VG00TxrDQnM6PfMcg"  
    
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json"
    }).then(function(locationdata) {
      var locationobj = locationdata.results[0].geometry.location;
      var location = locationobj.lat + ", " + locationobj.lng; 
      var myfilter = {
        location: location,
        distance: $("#distance").val(),
        sports: mysports,
        starttime: starttime,
        endtime: endtime
      };
      console.log(myfilter)
        $.ajax({
          url: "/api/filter",
          method: "PUT",
          data: myfilter,
          dataType: "json"
        }).then(function (results) {
          deleteMarkers();
          $("#cardresults").empty();
          for (i in results) {
            let marker = new google.maps.Marker({
              position: {
                lat: parseFloat(results[i].latitude),
                lng: parseFloat(results[i].longitude)
              },
              map: map, 
              id: results[i].id
            });
            markers.push(marker);
            let infowindow = new google.maps.InfoWindow({
              content:
                "<h4>" +
                results[i].title +
                "</h4>"
            });
            infowindows.push(infowindow);
          
            var datetime = results[i].starttime.split("T");
            var date = datetime[0].split("-");
            var timestring = datetime[1].split(".");
            var time = timestring[0].split(":");
    
            var newCard = $("<div>").addClass("card");
            newCard.attr("id", "cardid-"+results[i].id);
            var title = $("<h4>").text(results[i].title);
            newCard.append(title);
            var description = $("<p>").html("<strong>Descrpition: </strong>" + results[i].description);
            newCard.append(description);
            var gametime = $("<p>").html("<strong>When: </strong>" + date[1] + "/" + date[2] + "/" + date[0] + " at " + time[0] + ":" + time[1]);
            newCard.append(gametime);
            var sport = $("<p>").html("<strong>Sport: </strong>" + results[i].sport);
            newCard.append(sport);
            var distance = $("<p>").html("<strong>Distance: </strong>" + results[i].distance.toFixed(2) + " miles");
            newCard.append(distance);
            $("#cardresults").append(newCard);
          }
    
          showMarkers();
        });

      })
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

  // map.addListener("click", function (e) {
  //   if (marker !== null) {
  //     marker.setMap(null);
  //   }
  //   for (let j = 0; j < infowindows.length; j++) {
  //     infowindows[j].close();
  //   }
  //   placeMarkerAndPanTo(e.latLng, map);
  // });
}

function placeMarkerAndPanTo(latLng, map) {
  marker = new google.maps.Marker({
    position: latLng,
    map: map
  });

  var lat = marker.getPosition().lat();
  var long = marker.getPosition().lng();
  var coords = lat + ", " + long;
  $("#myloc").val(coords);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    let infowindow = infowindows[i];
    let marker = markers[i];
    markers[i].setMap(map);

    $("#cardid-"+marker.id).on("click", function(event){
      event.preventDefault();
      for (let j = 0; j < infowindows.length; j++) {
        infowindows[j].close();
      }
      infowindow.open(map, marker);
      $(".card").css("background-color", "white")
      $("#cardid-"+marker.id).css("background-color", "blue")
    })

    google.maps.event.addListener(marker, "click", function () {
      for (let j = 0; j < infowindows.length; j++) {
        infowindows[j].close();
      }
      infowindow.open(map, marker);
      $(".card").css("background-color", "white")
      $("#cardid-"+marker.id).css("background-color", "blue")
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
}
