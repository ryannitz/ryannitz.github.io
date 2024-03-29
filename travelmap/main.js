//allow someone to add url param to point to some hosted geojson array file
//Set zoom level based on the geoJSON that gets returned. THEN do flyTO. Always get the geoJSON zoom level before flying


// {
//     "type": "FeatureCollection",
//     "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//     "features": [
//       {
//         "type": "Feature",
//         "properties": {
//           "place_id": "18512203",
//           "osm_type": "node",
//           "osm_id": "1704756187",
//           "place_rank": "30",
//           "category": "place",
//           "type": "house",
//           "importance": "0",
//           "addresstype": "place",
//           "name": null,
//           "display_name": "71, Via Guglielmo Marconi, Saragozza-Porto, Bologna, BO, Emilia-Romagna, 40122, Italy",
//           "address": {
//             "house_number": "71",
//             "road": "Via Guglielmo Marconi",
//             "suburb": "Saragozza-Porto",
//             "city": "Bologna",
//             "county": "BO",
//             "state": "Emilia-Romagna",
//             "postcode": "40122",
//             "country": "Italy",
//             "country_code": "it"
//           }
//         },
//         "bbox": [
//           11.3397676,
//           44.5014307,
//           11.3399676,
//           44.5016307
//         ],
//         "geometry": {
//           "type": "Point",
//           "coordinates": [
//             11.3398676,
//             44.5015307
//           ]
//         }
//       }
//     ]
//   }

var locations = []
var locationMarkers = []
var tempLocation = {}

var searchQuery = ""
var markerFilterQuery = ""
var locationSearchResults = []

const markerDefault = L.divIcon({
    html: '<i class="marker-default fa-solid fa-3x fa-location-dot text-center text-secondary"></i>',
    className: 'marker-default',
    iconAnchor: [12, 41],
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    //shadowSize: [41, 41],
    //shadowUrl: "marker-shadow.png"
    //shadowAnchor: [4, 62],
});

const markerFocused = L.divIcon({
    html: '<i class="marker-default fa-solid fa-3x fa-location-dot text-center text-danger"></i>',
    className: 'marker-default',
    iconAnchor: [12, 41],
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    //shadowSize: [41, 41],
    //shadowUrl: "marker-shadow.png"
    //shadowAnchor: [4, 62],
});


function getLatLngFromGeoJSON(geoJSON){
    return L.latLng(geoJSON.geometry.coordinates[1], geoJSON.geometry.coordinates[0])
}

function onEachFeature(feature, layer) {
    var latlng = getLatLngFromGeoJSON(tempLocation)
    let popupContent = `
    <p>${feature.properties.display_name}</p>
    <div class="row p-0">
        <div class="col p-0 mx-3 mb-3">
            <button type="button" class="btn btn-secondary w-100 delete-location-btn" onclick="zoomHere(${latlng.lat},${latlng.lng})">Zoom In</button>
        </div>
        <div class="col p-0 mx-3 mb-3">
            <button type="button" class="btn btn-secondary w-100 delete-location-btn" onclick="deleteLocation(${latlng.lat},${latlng.lng},${locationMarkers.length})">Delete Marker</button>
        </div>
    </div>
    
    `;
    layer.bindPopup(popupContent);
}

function deleteLocation(lat, lng, idx){
    locations = $.grep(locations, function(location){ 
        return (location.geometry.coordinates[1] != lat && location.geometry.coordinates[0] != lng); 
   });
   console.log(locations);
   locationsLayer.removeLayer(locationMarkers[idx])
}

function addLocation(){
    //stop it from adding markers in the exact same spot...
    var tempLocationLatLng = getLatLngFromGeoJSON(tempLocation)
    if(isLatLngAlreadyMarked(tempLocationLatLng.lat, tempLocationLatLng.lng)){
        console.log("Location already marked")
        tempLocation = {}
        return;
    }
    map.closePopup(); 
    locations.push(tempLocation)
    var newLocationMarker = L.geoJSON(tempLocation, {
		pointToLayer(feature, latlng) {
			return L.marker(latlng);
		},
		onEachFeature
	}).addTo(locationsLayer);
    newLocationMarker.getLayers()[0].setIcon(markerDefault)
    locationMarkers.push(newLocationMarker)
    map.flyTo(tempLocationLatLng, 18)
    tempLocation = {}
    filterMarkerList()
}

function placeLocationMarkers(){
    locationsLayer.clearLayers();
    map.closePopup(); 
    locations.forEach(location => {
        tempLocation = location
        var newLocationMarker = L.geoJSON(tempLocation, {
	    	pointToLayer(feature, latlng) {
	    		return L.marker(latlng);
	    	},
	    	onEachFeature
	    }).addTo(locationsLayer);
        newLocationMarker.getLayers()[0].setIcon(markerDefault)
        locationMarkers.push(newLocationMarker)
    });
}

function keepClickLatLong(lat, lng) {
    tempLocation.geometry.coordinates[1] = lat
    tempLocation.geometry.coordinates[0] = lng
    tempLocation.properties.display_name = `Latitude: ${lat}, Longitude: ${lng}`
    addLocation();
}

function selectMarkerAddress(lat, lng){
    map.closePopup(); 
    var clicklatlng = L.latLng(lat, lng)
    map.flyTo(clicklatlng, 16, {duration:1.5})
    var reverseGeoQuery = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lng}&zoom=18`
    $.get(reverseGeoQuery, function(data){
        tempLocation = data.features[0]
        var distanceDifference = clicklatlng.distanceTo(getLatLngFromGeoJSON(tempLocation));
        var popupContent = `
        <h5>Closest location (${distanceDifference.toFixed(0)/1000}km):</h5>
        <p>${tempLocation.properties.display_name}</p>
        <button type="button" class="btn btn-secondary w-100" onclick="addLocation()">Add Marker at this Address</button>
        <hr>
        <h5>Coordinates</h5>
        <p class="mb-0">Lattitude: ${lat}</p>
        <p class="mt-0">Longitude: ${lng}</p>
        <p>Note: Saving the marker with custom lat/long will generate inaccurate export data. This selection is better for vast expanses of unmarked land</p>
        <button type="button" class="btn btn-secondary w-100" onclick="keepClickLatLong(${lat},${lng})">Add Marker at this Lat/Long</button>
        `
        L.popup()
        .setLatLng(clicklatlng)
        .setContent(popupContent)
        .openOn(map);
    });
}

function isLatLngAlreadyMarked(lat, lng){
    var matches = filteredLocations = locations.filter( (location, idx) => { 
        var locationLatLng = getLatLngFromGeoJSON(location)
        return locationLatLng.lat == lat && locationLatLng.lng == lng
    })
    return matches.length > 0
}

function gotoMarker(lat, lng, idx){
    var latLng = getLatLngFromGeoJSON(locations[idx])
    map.flyTo(latLng, 16, {duration:1.5})
}

function downloadLocationData() {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.locations)], {type: "application/json"});

    a.href= URL.createObjectURL(file);
    a.download = "locations.json";
    a.click();
    
    URL.revokeObjectURL(a.href);
}

function uploadLocationData() {
    const fileElem = $("#uploadedFile")
    if (fileElem) {
      fileElem.click();
    }
}

async function loadLocations() {
    axios
    .get("https://ryannitz.github.io/travelmap/locations.json")
    .then(response => {
        locations = response.data;
        placeLocationMarkers();
        filterMarkerList()
    })
    .catch(e => {
        if(e.response){
            console.log(e);
            if(e.response.status == 404){
                
            }else{
                //createAlert(, alertLocation, alertDuration, alertText);
            }
        }
    });
}

var locationsMarkers = true
function toggleMarkers() {
    const toggleButton = $("#toggleMarkers")
    if(locationsMarkers){
        map.removeLayer(locationsLayer)
        locationsMarkers = false
        toggleButton.html("Show Markers")
    }else{
        locationsLayer.addTo(map) 
        locationsMarkers = true
        toggleButton.html("Hide Markers")
    }
}

function clearLocations() {
    locationsLayer.clearLayers();
    locations = [];
    locationMarkers = []
    filterMarkerList()
}

function getLocationSearchResults() {
    var newSearchQuery = $("#locationSearchInput").val()
    if(!newSearchQuery){
        return;
    }

    if(newSearchQuery.length > 0 && newSearchQuery === searchQuery){
        console.log("Query is same same")
        return;
    }

    searchQuery = newSearchQuery
    $("#locationSearchResults").empty()
    $("#mapSearch > .loading").show()
    
    var searchGeoQuery = `https://nominatim.openstreetmap.org/search?q=${searchQuery}&accept-language=en&limit=10&format=geojson`
    $.get(searchGeoQuery, function(data){
        locationSearchResults = data.features
        $("#mapSearch > .loading").hide()
        if(locationSearchResults.length == 0){
            $("#mapSearch > .no-results").show()
        }else{
            $("#markerSearch > .no-results").hide()
            locationSearchResults.forEach(location => {
                var latlng = getLatLngFromGeoJSON(location)
                var listItemHtml = `
                    <a href="#" class="list-group-item list-group-item-action" onclick="selectMarkerAddress(${latlng.lat},${latlng.lng})">${location.properties.display_name}</a>
                `
                $("#locationSearchResults").append(listItemHtml);
            })
        }
    });
    
}

function centerHere(lat, lng){
    map.panTo(L.latLng(lat,lng))
}

function zoomHere(lat,lng){
    map.flyTo(L.latLng(lat,lng), 18)
}

function onMapClick(e) {
    var popupContent = `
    <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action" onclick="selectMarkerAddress(${e.latlng.lat}, ${e.latlng.lng})">Add Marker Here</a>
        <a href="#" class="list-group-item list-group-item-action" onclick="centerHere(${e.latlng.lat}, ${e.latlng.lng})">Center Map Here</a>
        <a href="#" class="list-group-item list-group-item-action" onclick="zoomHere(${e.latlng.lat}, ${e.latlng.lng})">Zoom Here</a>
    </div>
    `
    L.popup()
    .setLatLng(e.latlng)
    .setContent(popupContent)
    .openOn(map);
}

function focusMarker(idx){
    map.closePopup();
    locationMarkers[idx].getLayers()[0].setIcon(markerFocused)
    locationMarkers[idx].getLayers()[0].openPopup()
    locationMarkers[idx].getLayers()[0]._bringToFront()
}

function unfocusMarker(idx){
    locationMarkers[idx].getLayers()[0].setIcon(markerDefault)
    locationMarkers[idx].getLayers()[0].closePopup()
    locationMarkers[idx].getLayers()[0]._resetZIndex()
}

function filterMarkerList(){
    var filteredLocations = locations;
    var newMarkerFilterQuery = $("#markerSearchInput").val()
    if(newMarkerFilterQuery != "" && newMarkerFilterQuery === markerFilterQuery){
        return;
    }
    markerFilterQuery = newMarkerFilterQuery
    $("#markerSearchResults").empty()
    if(markerFilterQuery){
        filteredLocations = locations.filter( (location, idx) => { 
            var locationData = location.properties.type + location.properties.catagory + location.properties.display_name;
            return locationData.toLowerCase().includes(markerFilterQuery.toLowerCase())
        })
    }
    if(filteredLocations.length == 0){
        $("#markerSearch > .no-results").show()
    }else{
        $("#markerSearch > .no-results").hide()
        filteredLocations.forEach((location, idx) => {
            var latlng = getLatLngFromGeoJSON(location)
            var listItemHtml = `
            
                <a href="#" class="list-group-item list-group-item-action filtered-marker" onmouseover="focusMarker(${idx})" onmouseout="unfocusMarker(${idx})" onclick="gotoMarker(${latlng.lat},${latlng.lng}, ${idx})">
                    <i class="fa-solid fa-2x fa-location-dot float-start mt-1 ms-2"></i> 
                    <p class="p-0 m-0 ms-5">${location.properties.display_name}</p>
                </a>
            `
            $("#markerSearchResults").append(listItemHtml);
        })
    }
}


var latLine;
function drawLatitudeLine(elem){
    if(latLine){
        map.removeLayer(latLine)
    }
    if(elem && $(elem).val()){
        var newLat = parseFloat($(elem).val())
        latLine = L.polyline(
            [[-90,newLat],[90,newLat]], 
            {color: 'var(--bs-danger)', weight: 2}
        ).addTo(map)
    }
}

var lngLine;
function drawLongitudeLine(elem){
    if(lngLine){
        map.removeLayer(lngLine)
    }
    if(elem && $(elem).val()){
        var newlng = parseFloat($(elem).val())
        $(elem).val(newlng)
        lngLine = L.polyline(
            [[newlng,-180],[newlng,180]], 
            {color: 'var(--bs-danger)', weight: 2}
        ).addTo(map)
    }
}

$(".menu-item").click(function(){
    var activeClass = "text-secondary bg-light"
    $(".menu-item").removeClass(activeClass)
    $(this).addClass(activeClass)
    $(".flyout-content").hide()
    $($(this).data("target")).show()
})

$("#locationSearchBtn").click(function(){
    getLocationSearchResults()
})
$("#locationSearchBtn").submit(function(){
    getLocationSearchResults()
})

$("#gotoCoordinatesBtn").click(function(){
    var latInput = parseInt($("#latitudeSearchInput").val())
    var lngInput = parseInt($("#longitudeSearchInput").val())
    if(latInput && lngInput){
        zoomHere(latInput, lngInput)
    }
})
$("#markCoordinatesBtn").click(function(){
    var latInput = parseInt($("#latitudeSearchInput").val())
    var lngInput = parseInt($("#longitudeSearchInput").val())
    if(latInput && lngInput){
        selectMarkerAddress(latInput, lngInput)
    }
})

$("#uploadedFile").change( async function(){
    const uploadedFile = $(this).prop('files')[0];
    const fileContents = await uploadedFile.text();
    locations = JSON.parse(fileContents);
    placeLocationMarkers();
    filterMarkerList()
})

$(document).ready(function(){
    loadLocations()
    $("#locationsContent").show();

    $("form").submit(function(e){
        e.preventDefault();
    });

	map.on('click', onMapClick);

});
