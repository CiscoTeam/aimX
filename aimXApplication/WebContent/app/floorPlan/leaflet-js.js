

var map = L.map('map', {
	crs: L.CRS.Simple,
	minZoom: -5
});

map.on('load', function(event)
{
	//populateMarkers();
	console.log("map loaded");
}
);

L.control.fullscreen().addTo(map);

var bounds = [[0,0], [1000,1000]];

var image = L.imageOverlay('test_map_full.png', bounds).addTo(map);
var markerArray = [];

map.fitBounds(bounds);

var iconDevice = L.icon({
	iconUrl: 'icons/device.png',
    shadowUrl: 'icons/shadow.png',
    iconSize:     [30, 30], // size of the icon  //w h
    shadowSize:   [30, 30], // size of the shadow
    iconAnchor:   [15, 25], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 15],  // the same for the shadow
    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
});

var iconToggleOn = L.icon({
	iconUrl: 'icons/toggle_on.png',
    shadowUrl: 'icons/shadow.png',
    iconSize:     [40, 40], // size of the icon  //w h
    shadowSize:   [30, 30], // size of the shadow
    iconAnchor:   [22, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 15],  // the same for the shadow
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

var iconToggleOff = L.icon({
	iconUrl: 'icons/toggle_off.png',
    shadowUrl: 'icons/shadow.png',
    iconSize:     [40, 40], // size of the icon  //w h
    shadowSize:   [30, 30], // size of the shadow
    iconAnchor:   [22, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 15],  // the same for the shadow
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

var popup = L.popup();

function populateMarkers()
{
	var scope = angular.element(document.querySelector('[id="map"]')).scope();
	
	map.removeLayer(image);
	image = L.imageOverlay('../../uploads/'+scope.usertest._id+'.png', bounds).addTo(map);
	angular.forEach(scope.devices, function(aDevice) 
	{
		if(aDevice.floorPlanX != null)
		{
			addMarker(aDevice.floorPlanX, aDevice.floorPlanY, aDevice._id);
		}
	});
}

function changeIcon(e)
{
	this.setIcon(iconLightOn);
	
}

//marker.on("click", changeIcon);

var mapPosition = [-20, -20];
function mouseDragEnd(e)
{
	console.log(e.latlng.toString());
	mapPosition = e.latlng;
	var x = ev.clientX;
	var y = ev.clientY;
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
	//position
	var clientX = ev.clientX;
	var clientY = ev.clientY;
	var mapX = getOffset( document.getElementById('map') ).left; 
	var mapY = getOffset( document.getElementById('map') ).top; 
	var x = clientX-mapX;
	var y = clientY-mapY;

	var markerPosition = map.containerPointToLatLng([x, y]);
	addMarker(markerPosition.lat, markerPosition.lng, data);
	
	//create Marker
	/*if(data == "drag01")
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
	}*/
}



function addMarker(x, y, data)
{
	var scope = angular.element(document.querySelector('[id="map"]')).scope();
	
	var markerPosition = L.latLng(x,y);
	var setIcon = iconDevice;
	
	var device;
	var foundInDB = false;
	var foundInMap = false;
	angular.forEach(scope.devices, function(aDevice) 
	{
		if(data == aDevice._id)
		{
			device = aDevice;
			foundInDB = true;
		}
	});
	
	if(foundInDB)
	{
		markerArray.forEach(inMap);
		function inMap(item, index)
		{
			if(item.deviceID == device._id)
			{
				foundInMap = true;
			}
		}
		
		if(!foundInMap)
		{
			if(device.deviceType == "minecraft")
			{
				
				if(device.state == 0)
				{
					setIcon = iconToggleOff; //off
				}
				else
				{
					setIcon = iconToggleOn; //on
				}
			}
			var popupText = "<b style='font-size:25px;'>"+device.name+"</b><div style='text-align:center;'><button type='button' class='buttonDelete btn btn-danger btn-xs'>Delete Marker</button></div>";
			marker = L.marker(markerPosition, {icon: setIcon,draggable:"true"}).addTo(map).bindPopup(popupText);
			marker.on("popupopen", onPopupOpen);
			marker.on("dragend", onDragEnd);
			marker.deviceID = device._id;
			markerArray.push(marker);
			
			var position = marker.getLatLng();
			savePosition(position.lat,position.lng,marker.deviceID);
			
			//console.log("created: "+data);
			//console.log(markerArray);
		}
	}
}

function onPopupOpen() 
{
    var tempMarker = this;
	
    // To remove marker on click of delete
    $(".buttonDelete").click(function () 
	{
		//remove marker
		var index = markerArray.indexOf(tempMarker);
		deletePosition(tempMarker.deviceID);
		markerArray.splice(index, 1);
        map.removeLayer(tempMarker);
    });
}

function onDragEnd()
{
	var tempMarker = this;
	var position = tempMarker.getLatLng();
	
	savePosition(position.lat,position.lng,tempMarker.deviceID);
}

function savePosition(x, y, data)
{
	var scope = angular.element(document.querySelector('[id="map"]')).scope();
	
	var device;
	var foundInDB = false;
	angular.forEach(scope.devices, function(aDevice) 
	{
		if(data == aDevice._id)
		{
			device = aDevice;
			foundInDB = true;
		}
	});
	if(foundInDB)
	{
		device.floorPlanX = x;
		device.floorPlanY = y;

		angular.element(document.querySelector('[id="map"]')).scope().deviceInfo = device;
		angular.element(document.querySelector('[id="map"]')).scope().updateDevice();	
		//console.log("saved position "+x+" "+y)
	}
}

function deletePosition(data)
{
	var scope = angular.element(document.querySelector('[id="map"]')).scope();
	
	var device;
	var foundInDB = false;
	angular.forEach(scope.devices, function(aDevice) 
	{
		if(data == aDevice._id)
		{
			device = aDevice;
			foundInDB = true;
		}
	});
	if(foundInDB)
	{
		device.floorPlanX = null;
		device.floorPlanY = null;

		angular.element(document.querySelector('[id="map"]')).scope().deviceInfo = device;
		angular.element(document.querySelector('[id="map"]')).scope().updateDevice();
		console.log("deleted position")
	}
}

function zoomToDevice(zoomID)
{
	tempMarker = getMarkerByDeviceID(zoomID);
	if(tempMarker != null)
	{
		var position = tempMarker.getLatLng();
		map.setView(position);
		tempMarker.openPopup();
	}
	else console.log("marker not found");
}

function zoomToArea(areaID)
{
	var scope = angular.element(document.querySelector('[id="map"]')).scope();
	
	var xMin;
	var yMin;
	var xMax;
	var yMax;
	var found = false;
	var first = true;
	markerArray.forEach(inMap);
	function inMap(item, index)
	{
		var device;
		angular.forEach(scope.devices, function(aDevice) 
		{
			if(aDevice._id == item.deviceID)
			{
				device = aDevice;
			}
		});
		
		if(device.areaID == areaID)
		{
			var position = item.getLatLng();
			if(first)
			{
				first = false;
				found = true;
				xMin = position.lat;
				xMax = position.lat;
				yMin = position.lng;
				yMax = position.lng;
			}
			else
			{
				if(position.lat < xMin)
					xMin = position.lat;
				if(position.lat > xMax)
					xMax = position.lat;
				if(position.lng < yMin)
					yMin = position.lng;
				if(position.lng > yMax)
					yMax = position.lng;
			}
		}
	}
	
	if(found)
	{
		var offset = 50;
		var areaBounds = [[xMin-offset,yMin-offset], [xMax+offset,yMax+offset]];
		map.fitBounds(areaBounds);
	}
	else console.log("could not find a device under area in the floor plan");
}

function getMarkerByDeviceID(deviceID)
{
	markerArray.forEach(inMap);
	var device;
	function inMap(item, index)
	{
		if(item.deviceID == deviceID)
		{
			device = item;
		}
	}
	return device;
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
