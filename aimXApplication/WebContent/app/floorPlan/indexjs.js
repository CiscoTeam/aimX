var map = L.map('map', {
	crs: L.CRS.Simple,
	minZoom: -5
});

var bounds = [[-26.5,-25], [1000,1000]];
var image = L.imageOverlay('test_map_full.png', bounds).addTo(map);

map.fitBounds(bounds);

function allowDrop(ev) {
    ev.preventDefault();
}

var greenIcon = L.icon({
    iconUrl: 'lightBulb_off.png',
    //shadowUrl: 'lightBulb_off.png',

    iconSize:     [20, 35], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [10, 34], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var green2Icon = L.icon({
    iconUrl: 'lightBulb_on.png',
    //shadowUrl: 'lightBulb_off.png',

    iconSize:     [20, 35], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [10, 34], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var marker = L.marker([-20, -20], {icon: greenIcon}).addTo(map).bindPopup("<b>Hello world!</b><br>I am a popup.");
var marker1 = L.marker([54.5, -0.09]).addTo(map).bindPopup("<b>Hi</b><br>I am a popup.");
var marker2 = L.marker([155.5, -0.09]).addTo(map).bindPopup("<b>Yo</b><br>I am a popup.");
var marker3 = L.marker([256.5, -0.09]).addTo(map).bindPopup("<b>README</b><br>I am a popup.");

//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
//marker1.bindPopup("<b>Hi</b><br>I am a popup.").openPopup();
//marker2.bindPopup("<b>Yo</b><br>I am a popup.").openPopup();
//marker3.bindPopup("<b>README</b><br>I am a popup.").openPopup();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        //.openOn(map);
		marker = L.marker([-20, -20], {icon: green2Icon}).addTo(map);
}

map.on('click', onMapClick);

//drap and drop stuff

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}