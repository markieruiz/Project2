$(document).ready(function() {
  $("#test").on("click", function(event) {
    event.preventDefault();
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
    }).then(function(results) {
      deleteMarkers();
      for (i in results) { 
        let marker = new google.maps.Marker({ // eslint-disable-line
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
// eslint-disable-next-line no-unused-vars
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.314786, lng: -97.738267 },
    zoom: 12
  });
  map.addListener("click", function(e) {
    if (marker !== null) {
      marker.setMap(null);
    }
    for (let j = 0; j < infowindows.length; j++) {
      infowindows[j].close();
    }
    placeMarkerAndPanTo(e.latLng, map);
  });
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
  //map.panTo(latLng);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    let infowindow = infowindows[i];
    let marker = markers[i];
    markers[i].setMap(map);

    google.maps.event.addListener(marker, "click", function() {
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
//infowindow.close()

//--------------------------------------------------------------------------

// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
