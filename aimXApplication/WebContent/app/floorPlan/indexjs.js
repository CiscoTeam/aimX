var map = L.map('map', {
	crs: L.CRS.Simple,
	minZoom: -5
});

<<<<<<< HEAD
var bounds = [[0,0], [1000,1000]];
var image = L.imageOverlay('test_map_full.png', bounds).addTo(map);

map.fitBounds(bounds);

var greenIcon = L.icon({
    iconUrl: 'lightBulb_off.png',
    //shadowUrl: 'lightBulb_off.png',

    iconSize:     [20, 35], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [10, 34], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor

});

var green2Icon = L.icon({
    iconUrl: 'lightBulb_on.png',
    //shadowUrl: 'lightBulb_off.png',

    iconSize:     [20, 35], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [10, 34], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

var marker = L.marker([-20, -20],{draggable: true,icon: greenIcon,title: "Light"},{icon: greenIcon}).addTo(map).bindPopup("<b>Lights Off</b><br>The lights are off right now");
var marker1 = L.marker([54.5, -0], {draggable: true}).addTo(map).bindPopup("<b>Hi</b><br>I am a popup.");
var marker2 = L.marker([155.5, -0], {draggable: true}).addTo(map).bindPopup("<b>Yo</b><br>I am a popup.");
var marker3 = L.marker([-256.5, -0], {draggable: true}).addTo(map).bindPopup("<b>README</b><br>I am a popup.");


//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
//marker1.bindPopup("<b>Hi</b><br>I am a popup.").openPopup();
//marker2.bindPopup("<b>Yo</b><br>I am a popup.").openPopup();
//marker3.bindPopup("<b>README</b><br>I am a popup.").openPopup();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
		//marker = L.marker([-20, -20], {icon: green2Icon,draggable:"true"}).addTo(map).bindPopup("<b>Lights On</b><br>The lights are on here.");
		//marker.setIcon(green2Icon);
}
function changeIcon(e)
{
	this.setIcon(green2Icon);
	//this.bindPopup("<b>Lights On</b><br>The lights are on here.");
}

marker.on("click", changeIcon);

var mapPosition;
function mouseDragEnd(e)
{
	console.log(e.latlng.toString());
	mapPosition = e.latlng;
}
//map.on('click', onMapClick);
//map.on('mousemove', mouseDragEnd);
//drap and drop stuff

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function allowDrop(ev) {
    ev.preventDefault();
}

function dropOnMap(ev)
{
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	var x = ev.clientX;
	var y = ev.clientY;
	console.log(x);
	console.log(y);
	//console.log(mapPosition.toString());
	marker = L.marker(mapPosition, {icon: green2Icon,draggable:"true"}).addTo(map);//.bindPopup("<b>Lights On</b><br>The lights are on here.");
	//popup.setLatLng(map.latlng).setContent("You clicked the map").openOn(map);
}