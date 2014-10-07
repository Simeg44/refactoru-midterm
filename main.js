
var markers = [];
var iterator = 0;

var setPlayerPos = function(pos, map) {
	var image = "Images/sparkle.png";

	var marker = new google.maps.Marker({
		position: pos,
		map: map,
		icon: image,
		animation: google.maps.Animation.BOUNCE,
		title: "Player"
	});
}

var populate = function(map) {

    for (var i = 0; i < monsters.length; i++) {
    	setTimeout(function() {
    		monsters[iterator].render(map);
    	}, i * 200);
    }
}


Kakoi.prototype.render = function(map) {
	var monster = monsters[iterator];
	var image = {
		url: "Images/icon_angry.png",
		 // This marker is 20 pixels wide by 32 pixels tall.
    	// size: new google.maps.Size(20, 32),
    	// The origin for this image is 0,0.
    	// origin: new google.maps.Point(0,0),
    	// The anchor for this image is the base of the flagpole at 0,32.
    	anchor: new google.maps.Point(38, 38)
    }
    /*for (var i = 0; i < monsters.length; i++) {
    	var myLatLng = new google.maps.LatLng(monsters[i].location[0], monsters[i].location[1]);

	    var marker = new google.maps.Marker({
	    	position: myLatLng,
	    	map: map,
	    	icon: image,
	    	animation: google.maps.Animation.DROP,
	    	title: "Kakoi"
	    });
	}*/
	var myLatLng = new google.maps.LatLng(monster.location[0], monster.location[1]);
	markers.push(new google.maps.Marker({
		position: myLatLng,
	    map: map,
	    icon: image,
	    animation: google.maps.Animation.DROP
	}));

	iterator++;

	var tooltip = $("#temp").clone();
	tooltip.attr("id", "");
	this.element = $("<div>");

	$(this).on("click", function() {
		this.element.append(tooltip);
	})
}

$(document).on('ready', function() {
  
	var map;

	var styles = [
  {
    "stylers": [
      { "saturation": -81 }
    ]
  },{
    "featureType": "road.local",
    "stylers": [
      { "lightness": -17 },
      { "hue": "#ff00b2" },
      { "saturation": 29 }
    ]
  },{
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      { "visibility": "on" },
      { "lightness": 32 }
    ]
  },{
    "elementType": "labels",
    "stylers": [
      { "lightness": 16 }
    ]
  },{
    "featureType": "road.highway",
    "stylers": [
      { "saturation": -37 },
      { "hue": "#ff00d4" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "saturation": 50 },
      { "hue": "#0022ff" }
    ]
  }
];

	// Create a new StyledMapType object, passing it the array of styles,
  	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styles, 
		{name: "Styled Map"});

	function initialize() {
		var mapOptions = {
			zoom: 15,
			zoomControl: false,
			draggable: false,
			scaleControl: false,
			disableDefaultUI: true,

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

	  		// Set map's center as player's location
	  		setPlayerPos(pos, map);

	  	}, function() {
	  		handleNoGeolocation(true);
	  	});
	  } else {
	  	// Browser does not support Geolocation
	  	handleNoGeolocation(false);
	  }
	

	function handleNoGeolocation(errorFlag) {
		if(errorFlag) {
			var content = '';
  		} else {
    		var content = 'Error: Your browser doesn\'t support geolocation.';
  		}

  		var options = {
    		map: map,
    		position: new google.maps.LatLng(40.0176, -105.2797),
    		content: content
  		};

  		var infowindow = new google.maps.InfoWindow(options);
  		map.setCenter(options.position);

  		// Set map's center as player's location
  		setPlayerPos(options.position, map);

	}


	google.maps.event.addListener(map, 'click', function(event) {
		var lat = event.latLng.lat();
		var lng = event.latLng.lng();
		console.log(lat, lng);
	})

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
  	map.setMapTypeId('map_style');
}
	

	google.maps.event.addDomListener(window, 'load', initialize);

	$(".sense").on("click", function() {

		populate(map);
	})

	$(".sense").hover(
		function() {
			$(this).addClass("glow");
		}, function() {
			$(this).removeClass("glow");
		});


});





