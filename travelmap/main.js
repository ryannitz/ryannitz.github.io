//allow someone to add url param to point to some hosted geojson array file
//allow import/export of geojson arrays


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

var locationSearchResults = []

function getLatLngFromGeoJSON(geoJSON){
    return L.latLng(geoJSON.geometry.coordinates[1], geoJSON.geometry.coordinates[0])
}

function onEachFeature(feature, layer) {
    var latlng = getLatLngFromGeoJSON(tempLocation)
    let popupContent = `
    <p>${feature.properties.display_name}</p>
    <button type="button" class="btn btn-primary w-100 delete-location-btn" onclick="deleteLocation(${latlng.lat},${latlng.lng},${locationMarkers.length})">Delete Marker</button>
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
    map.closePopup(); 
    locations.push(tempLocation)
    const newLocationMarker = L.geoJSON(tempLocation, {
		pointToLayer(feature, latlng) {
			return L.marker(latlng);
		},
		onEachFeature
	}).addTo(locationsLayer);
    locationMarkers.push(newLocationMarker)
    map.flyTo(getLatLngFromGeoJSON(tempLocation), 18)
    tempLocation = {}
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
        <button type="button" class="btn btn-primary w-100" onclick="addLocation()">Add Marker at this Address</button>
        <hr>
        <h5>Coordinates</h5>
        <p class="mb-0">Lattitude: ${lat}</p>
        <p class="mt-0">Longitude: ${lng}</p>
        <p>Note: Saving the marker with custom lat/long will generate inaccurate export data. This selection is better for vast expanses of unmarked land</p>
        <button type="button" class="btn btn-primary w-100" onclick="keepClickLatLong(${lat},${lng})">Add Marker at this Lat/Long</button>
        `
        L.popup()
        .setLatLng(clicklatlng)
        .setContent(popupContent)
        .openOn(map);
    });
}

function downloadLocationData() {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.locations)], {type: "application/json"});

    a.href= URL.createObjectURL(file);
    a.download = "locations.json";
    a.click();
    
    URL.revokeObjectURL(a.href);
}

function importLocationData() {
    console.log("Import")
}

async function loadLocations() {
    await fetch("travelmap/locations.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        locations = response.json();
        placeLocationMarkers();
    })
    .catch(error => {
        // ...report the error, then:
        return [];
    });
}

function placeLocationMarkers(){
    locationsLayer.clearLayers();
    map.closePopup(); 
    locations.forEach(location => {
        const newLocationMarker = L.geoJSON(location, {
	    	pointToLayer(feature, latlng) {
	    		return L.marker(latlng);
	    	},
	    	onEachFeature
	    }).addTo(locationsLayer);
    });
}

function toggleLocations() {

}

function clearLocations() {
    locationsLayer.clearLayers();
}

function getLocationSearchResults() {
    $("#locationSearchResults").empty()
    var query = $("#locationSearchInput").val()
    if(query) {
        var searchGeoQuery = `https://nominatim.openstreetmap.org/search?q=${query}&accept-language=en&limit=10&format=geojson`
        $.get(searchGeoQuery, function(data){
            locationSearchResults = data.features
            locationSearchResults.forEach(location => {
                var latlng = getLatLngFromGeoJSON(location)
                var listItemHtml = `
                    <li class="list-group-item" onclick="selectMarkerAddress(${latlng.lat},${latlng.lng})">${location.properties.display_name}</li>
                `
                $("#locationSearchResults").append(listItemHtml);
            })
        });
    }
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

$("#locationSearchBtn").click(function(){
    getLocationSearchResults();
})
$("#locationSearchBtn").submit(function(){
    getLocationSearchResults();
})

$(document).ready(function(){
    loadLocations()

    $("form").submit(function(e){
        e.preventDefault();
    });

	map.on('click', onMapClick);

});
