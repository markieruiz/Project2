var gmarkers = [];
var infowindow = new google.maps.InfoWindow();

var locationSource = $("#location-template").html();
var locTemplate = Handlebars.compile(locationSource);

var serviceSource = $("#services-template").html();
var serviceTemplate = Handlebars.compile(serviceSource);

function initialize() {
  var center = new google.maps.LatLng(33.4483771, -112.07403729999999);
  var mapOptions = {
    zoom: 12,
    center: center,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: mapStyle
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  for (i = 0; i < mapData.dataPoints.locations.length; i++) {
    addMarker(mapData.dataPoints.locations[i]);
  }
}

function addMarker(marker) {
  var location = getLocation(marker);
  if (location) {
    var category = marker.type;
    var title = location.name;
    var latLong = marker.latLong.split(",");
    var pos = new google.maps.LatLng(latLong[0], latLong[1]);
    var content = getLocationContent(location);

    $.extend(location, marker);

    mapMarker = new google.maps.Marker({
      title: title,
      position: pos,
      category: category,
      locationData: location,
      map: map
    });

    gmarkers.push(mapMarker);

    // Marker click listener
    google.maps.event.addListener(
      mapMarker,
      "click",
      (function(mapMarker, content) {
        return function() {
          infowindow.setContent(content);
          infowindow.open(map, mapMarker);
          //map.panTo(this.getPosition());
          generateRelated(mapMarker);
        };
      })(mapMarker, content)
    );
  }
}

function getLocation(marker) {
  var location = false;
  if (mapData.key.locationData.locations[marker.ID]) {
    location = mapData.key.locationData.locations[marker.ID];
  }
  return location;
}

function getLocationContent(location) {
  return locTemplate(location);
}

function generateRelated(marker) {
  $("#output").text("");
  $("#output").html(generateServices(marker));
}

function generateServices(location) {
  var serviceCards = [];

  for (var x in location.locationData.taxonomy.services) {
    var serviceID = location.locationData.taxonomy.services[x];
    serviceCards.push(
      serviceTemplate(mapData.key.serviceData.services[serviceID])
    );
  }
  return serviceCards.join("");
}
initialize();

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
