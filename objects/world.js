var World = function(kakoi, percentage, zone) {
	this.kakoi = kakoi;				// array of monsters in this zone/world
	this.percentBad = percentBad;	// percentage of bad vs good in zone
	this.zone = zone;				// players zone by city or state
}

var Player = function(name, level, pets, location){
	this.name = name; 			// string
	this.level = level; 		// number
	this.pets = pets;  			// array
	this.location = location 	// string of coordinantes?
}


var Kakoi = function(name, image, health, location, pref, known, creates) {
	this.name = name;			// string
	this.image = image;			// image file?
	this.health = health;		// number
	this.location = location;	// location coordinates (string?)
	this.pref = pref;			// preferred location
	this.known = known;			// bool
	this.creates = creates || "none";		// array of Doroi born from this
}

var Doroi = function(name, image, health, origin){
	this.name = name;			// string
	this.image = image; 		// image file?
	this.health = health;		// number
	this.origin	= origin;		// kakoi object
}

var Finder = function(name, image, health, origin, known, role, tracking) {
	Doroi.call(this, name, image, health, origin);

	this.role = role;			// string (necessary?)
	this.tracking = tracking;	// number that determines tracking ability strength
}
Finder.prototype = new Doroi();

var Fighter = function(name, image, health, origin, known, role, strength) {
	Doroi.call(this, name, image, health, origin);

	this.role = role;			// string (necessary?)
	this.strength = strength;	// number that determines fighting strength
}
Fighter.prototype = new Doroi();



