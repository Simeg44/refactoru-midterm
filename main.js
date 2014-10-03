



$(document).on('ready', function() {
  
	var map;

	var styles = [
  {
    featureType: "all",
    stylers: [
      { saturation: -80 }
    ]
  },{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { hue: "#00ffee" },
      { saturation: 50 }
    ]
  },{
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

	// Create a new StyledMapType object, passing it the array of styles,
  	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styles, 
		{name: "Styled Map"});

	// function initialize() {
	  var mapOptions = {
	    zoom: 14,

	     // Include the MapTypeId to add to the map type control
	    mapTypeControlOptions: {
	    	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	    }
	  };
	  map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);

	  if(navigator.geolocation) {
	  	navigator.geolocation.getCurrentPosition(function(position) {
	  		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	  		var infoWindow = new google.maps.InfoWindow({
	  			map: map,
	  			position: pos,
	  			content: "Location"
	  		});

	  		map.setCenter(pos);
	  	}, function() {
	  		handleNoGeolocation(true);
	  	});
	  } else {
	  	// Browser does not support Geolocation
	  	handleNoGeolocation(false);
	  }
	// }

	function handleNoGeolocation(errorFlag) {
		if(errorFlag) {
			var content = 'Error: The Geolocation service failed.';
  		} else {
    		var content = 'Error: Your browser doesn\'t support geolocation.';
  		}

  		var options = {
    		map: map,
    		position: new google.maps.LatLng(60, 105),
    		content: content
  		};

  		var infowindow = new google.maps.InfoWindow(options);
  		map.setCenter(options.position);
	}

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
  	map.setMapTypeId('map_style');

	google.maps.event.addDomListener(window, 'load', initialize);
});