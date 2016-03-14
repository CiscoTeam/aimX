var map = L.map('map', {
	crs: L.CRS.Simple,
	minZoom: -5
});

var bounds = [[0,0], [1000,1000]];
var image = L.imageOverlay('test_map_full.png', bounds).addTo(map);

map.fitBounds(bounds);

var iconDefault = L.icon({
	iconUrl: 'marker2.png',
    shadowUrl: 'iconShadow.png',
    iconSize:     [20, 35], // size of the icon
    shadowSize:   [20, 35], // size of the shadow
    iconAnchor:   [10, 34], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 34],  // the same for the shadow
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor

});

var iconLightOff = L.icon({
    iconUrl: 'lightBulb_off.png',
    shadowUrl: 'iconShadow.png',
    iconSize:     [20, 35], // size of the icon
    shadowSize:   [20, 35], // size of the shadow
    iconAnchor:   [10, 34], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 34],  // the same for the shadow
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor

});

var iconLightOn = L.icon({
    iconUrl: 'lightBulb_on.png',
    shadowUrl: 'iconShadow.png',
    iconSize:     [20, 35], // size of the icon
    shadowSize:   [20, 35], // size of the shadow
    iconAnchor:   [10, 34], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 34],  // the same for the shadow
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

var marker = L.marker([-20, -20],{draggable: true,icon: iconLightOff,title: "Light"},{icon: iconLightOff}).addTo(map).bindPopup("<b>Lights Off</b><br>The lights are off right now");
var marker1 = L.marker([54.5, -0], {draggable: true}).addTo(map).bindPopup("<b>Hi</b><br>I am a popup.");
var marker2 = L.marker([155.5, -0], {draggable: true}).addTo(map).bindPopup("<b>Yo</b><br>I am a popup.");
var marker3 = L.marker([-256.5, -0], {draggable: true}).addTo(map).bindPopup("<b>README</b><br>I am a popup.");

var popup = L.popup();


function changeIcon(e)
{
	this.setIcon(iconLightOn);
	
}

marker.on("click", changeIcon);

var mapPosition = [-20, -20];
function mouseDragEnd(e)
{
	console.log(e.latlng.toString());
	mapPosition = e.latlng;
	var x = ev.clientX;
	var y = ev.clientY;
	console.log("drag x:"+x+" y:"+y);
}

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
	console.log("created: "+data);
	//position
	var clientX = ev.clientX;
	var clientY = ev.clientY;
	var mapX = getOffset( document.getElementById('map') ).left; 
	var mapY = getOffset( document.getElementById('map') ).top; 
	var x = clientX-mapX;
	var y = clientY-mapY;
	var mapPosition2 = map.containerPointToLatLng([x, y]);
	
	//create Marker
	if(data == "drag01")
	{
		var icon2 = iconLightOff;
	}
	else if(data == "drag02")
	{
		var icon2 = iconLightOn;
	}
	else 
	{
		var icon2 = iconDefault;
	}
	var popupText = "<b>Lights</b><br>"+data;
	marker = L.marker(mapPosition2, {icon: icon2,draggable:"true"}).addTo(map).bindPopup(popupText);
	//popup.setLatLng(map.latlng).setContent("You clicked the map").openOn(map);
}


/////////////////////////////
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
