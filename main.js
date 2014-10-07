
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


// Fill the map with monsters
var populate = function(map) {

	if (markers.length > 0) {
		for (var j = 0; j < monsters.length; j++) {
			markers[j].setMap(null);
		}
		markers = [];
	}

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

	var myLatLng = new google.maps.LatLng(monster.location[0], monster.location[1]);
	var marker = (new google.maps.Marker({
		position: myLatLng,
	    map: map,
	    icon: image,
	    animation: google.maps.Animation.DROP
	}));
	markers.push(marker);

	google.maps.event.addListener(marker, 'click', function(event) {

		if (monster.known === false) {
			var name = $("<h3 class='monster-name'>???</h3><img class='monster-img' src='Images/duck_shadow.jpg'>");
			var local = $("<p class='monster-pref'>Location: <span>???</span></p>");
			var descrip = $("<div class='descrip'><strong>Purifies To: <strong><p>Common: <span>???</span></p><p>Rare: <span>???</span></p></div>");
		}
		else {
			var name = $("<h3 class='monster-name'>" + monster.name + "</h3><img class='monster-img' src='" + monster.image + "'>");

			if (monster.pref === "none") {
				var local = $("<p class='monster-pref'>Location: <span>No Preference</span></p>");
			}
			else {
				var local = $("<p class='monster-pref>Location: " + monster.pref + "</p>");
			} 

			if (monster.creates === "none") {
				var descrip = $("<div class='descrip'><strong>Purifies To: <strong><p>Common: <span>None</span></p><p>Rare: <span>None</span></p></div>");
			}
			else if (monster.creates.length === 1) {
				local = local + $("<p><strong>Purifies To: <strong><p>Common: " + monster.creates[0] 
					+ "</p><p>Rare: <span>None</span></p></p>");
			}
			else {
				local = local + $("<p><strong>Purifies To: <strong><p>Common: " + monster.creates[0] 
					+ "</p><p>Rare: " + monster.creates[1] + "</p></p>");
			}
		}

		$(".modal-header").append(name);
		$(".modal-body").append(local).append(descrip);

		$("#monster-info").modal('show');
	})

	iterator++;
}

///////////////////////
// Document On Ready //
///////////////////////

$(document).on('ready', function() {
  
	var map;

	var background = document.getElementById("background");
	background.play();

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


////////////////
// Initialize //
////////////////
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


		///////////////////
		// Geolocation //
		///////////////////
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
		console.log(monsters[0]);
	})

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
  	map.setMapTypeId('map_style');
}
	
	/////////////////////
	// Initialize End //
	/////////////////////

	google.maps.event.addDomListener(window, 'load', initialize);

	$(".sense").on("click", function() {
		iterator = 0;
		populate(map);

		var audio = document.getElementById("sonar-ping");
		audio.play();
	})

	$(".sense").hover(
		function() {
			$(this).addClass("glow");
		}, function() {
			$(this).removeClass("glow");
	});

	// clears modal window after each close
	$('#monster-info').on('hidden.bs.modal', function (e) {
		$(".modal-header").empty();
		$(".modal-body").empty();
	})


	$("#fight").on("click", function() {
		var background = document.getElementById("background");
		background.pause();
		$(".fight-txt").show();
		$(".tlt").textillate("start");
		$(".tlt").textillate ({
			selector: ".texts",
			minDisplayTime: 0,
		});
		var audio = document.getElementById("fight-clip")
		audio.play();

		setTimeout(function() {
			$(".fight-txt").hide();
			$(".tlt").textillate("stop");

		}, 2500);
	})


});





