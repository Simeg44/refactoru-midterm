
var markers = [];
var iterator = 0;
var turn = true;

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

	if (monster.health <= 0) {
		var image = {
			url: "Images/icon_shuai.png",
			anchor: new google.maps.Point(38, 38)
		}
		var myLatLng = new google.maps.LatLng(monster.location[0], monster.location[1]);
		var marker = (new google.maps.Marker({
			position: myLatLng,
		    map: map,
		    icon: image,
		}));
	}
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
	this.marker = marker;

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

		$("#monster-info").find(".modal-header").append(name);
		$("#monster-info").find(".modal-body").append(local).append(descrip);

		$("#monster-info").modal('show');

		$("#fight").on("click", function() {
			console.log(monster);
			var audio = document.getElementById("battle-music");
			audio.play();

			var monsterHealth = monster.health;
			var fighterHealth = player1.attacker.currentHealth;
			$(".health-nums").empty();
			$(".monster-list").find(".health-nums").append("<p>" + monsterHealth + "/" + monster.health + "</p>");
			$(".pet-health").find(".health-nums").append("<p>" + fighterHealth + "/" 
				+ player1.attacker.health + "</p>");
			console.log(monsterHealth);
			player1.attack(monster, monsterHealth, fighterHealth);
			
			var background = document.getElementById("background");
			background.pause();
			background.currentTime = 0;
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

				$("#battle").modal("show");
				// var audio = document.getElementById("battle-music");
				// audio.play();
			}, 2500);
		
		})

	})

	iterator++;
}

Player.prototype.attack = function(monster, monsterHealth, fighterHealth) {
	$("#battle").find("button").removeAttr("disabled");
			
	$(".monster-list").off("click").on("click", "li", function() {
		var old = $(".selection").closest("li");
		if (!$(this).hasClass("selected")) {
			$(this).prepend($(".selection")).addClass("selected");
			old.removeClass("selected");
			old.find(".selection").detach();
		}
		
	});

	var audio = document.getElementById("battle-music");
	var background = document.getElementById("background");
	$("#run").off("click").on("click", function() {
		audio.pause();
		audio.currentTime = 0;
		background.play();
	})

	console.log("adding attack");

	$("#attack").off("click").on("click", function() {
		var hit = $("<img class='hit' src='Images/hit.png'>");
		var hitAudio = document.getElementById("hit");
		var missAudio = document.getElementById("miss");
		
		// if monster is hit change animations and health
		if (player1.attacker.speed+Math.random() > .9) {
			monsterHealth = monsterHealth - player1.attacker.strength;
			$(".monster-list").find(".selected").append(hit); // show hit animation on selected monster
			hitAudio.play();

			setTimeout(function() {
				$(".monster-list").find(".hit").remove();
				console.log("a", monster);

				// monster defeated
				if (monsterHealth <= 0) {
					$("#battle").modal("hide");
					$(".monster-health").find(".health-nums").empty();
					var image = "Images/icon_shuai.png";
					monster.marker.setIcon(image);
					audio.pause();
					audio.currentTime = 0;
					background.play();

					setTimeout(function() {
						$(".monster-health").find(".health").css("width", "100%");
						monster.health = monsterHealth;	 // permanently change monster health
						player1.attacker.currentHealth = fighterHealth; // permanently change pet health
						console.log(monster.health);
						monster.marker.setIcon("Images/cloud.png");
						var poof = document.getElementById("poof");
						poof.play();

						setTimeout(function() {
							monster.marker.setMap(null);
						}, 500);
					}, 1500);
					
				}
				else {
					$(".monster-health").find(".health-nums").empty();
					$(".monster-health").find(".health-nums").append("<p>" + monsterHealth + "/" + monster.health + "</p>");
					var healthLeft = (monsterHealth/monster.health) * 100;
					$(".monster-health").find(".health").css("width", healthLeft + "%");


					monster.battle(monsterHealth, fighterHealth);
				}
			}, 200);


		}
		// player misses monster
		else {
			missAudio.play();
			$(".monster-list").find(".selected").prepend("<p class='miss-text'>Miss!</p>");
			console.log("player misses");
			monster.battle(monsterHealth, fighterHealth);

			setTimeout(function() {
				$(".monster-list").find(".miss-text").remove();
			}, 200);
		}
		
	})
}


Kakoi.prototype.battle = function(monsterHealth, fighterHealth) {
	var hit = $("<img class='hit' src='Images/hit.png'>");
	var hitAudio = document.getElementById("hit");
	var missAudio = document.getElementById("miss");
	

	$("#battle").find("button").attr("disabled", "disabled");
		
	setTimeout((function() {
		if (this.speed+Math.random() > 1) {
			hitAudio.play();
			console.log(hit);
			$(".arena").find(".pet").append(hit);
			fighterHealth = fighterHealth - this.strength;
			console.log("pistis:", fighterHealth);

			$(".pet-health").find(".health-nums").empty();
			$(".pet-health").find(".health-nums").append("<p>" + fighterHealth + "/" + player1.attacker.health + "</p>");
			var healthLeft = (fighterHealth/player1.attacker.health) * 100;
			$(".pet-health").find(".health").css("width", healthLeft + "%");

			setTimeout(function() {
				$(".arena").find(".hit").remove();
			}, 200);

			player1.attack(this, monsterHealth, fighterHealth);

		}
		else {
			missAudio.play();
			// $(".arena").prepend("<p class='action'>Miss!</p>");
			console.log("monster misses");
			player1.attack(this, monsterHealth, fighterHealth);
		}
	}).bind(this), 1000);
	
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
        "featureType": "water",
        "stylers": [
            {"color": "#021019"}
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {"color": "#08304b"}
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {"color": "#0c4152" },
            {"lightness": 5}
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {"color": "#000000"}
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {"color": "#0b434f"},
            {"lightness": 25}
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {"color": "#000000"}
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {"color": "#0b3d51"},
            {"lightness": 16}
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {"color": "#000000"}
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {"color": "#ffffff"}
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {"color": "#000000"},
            {"lightness": 13}
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {"color": "#146474"}
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {"color": "#000000"}
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {"color": "#144b53"},
            {"lightness": 14},
            {"weight": 1.4}
        ]
    }
];
	/*
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
];*/

	// Create a new StyledMapType object, passing it the array of styles,
  	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styles, 
		{name: "Styled Map"});

$('#battle').on('hidden.bs.modal', function (e) {
  $(".monster-list, #run, #attack, #fight").off("click");
})

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
			scrollwheel: false,

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
		$(this).find(".modal-header").empty();
		$(this).find(".modal-body").empty();
	})


	$("#fight").on("click", function() {
		
	})


});





