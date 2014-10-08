var World = function(kakoi, percentage, zone) {
	this.kakoi = kakoi;				// array of monsters in this zone/world
	this.percentBad = percentBad;	// percentage of bad vs good in zone
	this.zone = zone;				// players zone by city or state
}

var Player = function(name, level, pets, attacker, location){
	this.name = name; 			// string
	this.level = level; 		// number
	this.pets = pets || [];  	// array
	this.attacker = attacker || "none"		// equiped pet
	this.location = location 	// string of coordinantes?
}


var Kakoi = function(name, image, health, strength, speed, location, pref, known, creates) {
	this.name = name;			// string
	this.image = image;			// image file?
	this.health = health;		// number
	this.strength = strength;
	this.speed = speed;			// speed
	this.location = location;	// location coordinates
	this.pref = pref;			// preferred location
	this.known = known;			// bool
	this.creates = creates || "none";		// array of Doroi born from this
}

var Blessing = function(name, image, health, origin){
	this.name = name;			// string
	this.image = image; 		// image file?
	this.health = health;		// number
	this.origin	= origin;		// kakoi object
}

var Finder = function(name, image, health, origin, known, role, tracking) {
	Blessing.call(this, name, image, health, origin);

	this.role = role;			// string (necessary?)
	this.tracking = tracking;	// number that determines tracking ability strength
}
Finder.prototype = new Blessing();
Finder.prototype.constructor = Finder;

var Fighter = function(name, image, health, origin, role, strength, speed) {
	Blessing.call(this, name, image, health, origin);

	this.role = role;			// string (necessary?)
	this.strength = strength;	// number that determines fighting strength
	this.speed = speed;			// number that determine hit %
}
Fighter.prototype = new Blessing();
Fighter.prototype.constructor = Fighter;



