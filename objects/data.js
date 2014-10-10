///////////////////////////////
// Monsters for no geolocater //
///////////////////////////////

var monster1 = new Kakoi("Metus", "Images/kakoi.png", 300, 20, .8, [40.01897124659721, -105.293869972229], "none", true);
var monster2 = new Kakoi("Nemesis", "Images/kakoi.png", 500, 20, .8, [40.02541266390118, -105.26425838470459], "none", true);
var monster3 = new Kakoi("Metus", "Images/kakoi.png", 300, 20, .8, [40.01486288226095, -105.26846408843994], "none", true);
var monster4 = new Kakoi("Tenebrae", "Images/kakoi.png", 650, 20, .8, [40.01213479170214, -105.25627613067627], "none", false);
var monster5 = new Kakoi("Nemesis", "Images/kakoi.png", 500, 20, .8, [40.027154371267265, -105.30331134796143], "none", true);
var monster6 = new Kakoi("Fraus", "Images/kakoi.png", 250, 20, .8, [40.01282504178692, -105.3024959564209], "none", true);	



//////////////////////////////////////////
// Monsters for when geolocater working //
//////////////////////////////////////////

/*var monster1 = new Kakoi("Metus", "Images/kakoi.png", 300, .8, [40.01680206104785, -105.22773742675781], "none", true);
var monster2 = new Kakoi("Nemesis", "Images/kakoi.png", 500, .8, [40.026727164142486, -105.24052619934082], "none", true);
var monster3 = new Kakoi("Metus", "Images/kakoi.png", 300, .8, [40.028797450660306, -105.21430492401123], "none", true);
var monster4 = new Kakoi("Tenebrae", "Images/kakoi.png", 650, .8, [40.02856742192779, -105.1972246170044], "none", false);
var monster5 = new Kakoi("Nemesis", "Images/kakoi.png", 500, .8, [40.01870831868798, -105.19572257995605], "none", true);
var monster6 = new Kakoi("Fraus", "Images/kakoi.png", 250, .8, [40.0126278281893, -105.20636558532715], "none", true);*/


var monsters = [monster1, monster2, monster3, monster4, monster5, monster6];

var pistis = new Fighter("Pistis", "Images/carbuncle.png", 1000, 1000, "Metus", "Fighter", 80, .8);

var player1 = new Player("Ammy", "1", [pistis], pistis, "Colorado");











