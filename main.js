//===============================================================================
//map create
var mymap = L.map('mapid', {zoomControl: false}).setView([40, -110], 4);

//setting to focus on USA and desired zoom
mymap.bounds = [],
mymap.setMaxBounds([
  //S,W,N,E
  [20, -150],
  [55, -60]
])
mymap.maxZoom = [],
mymap.minZoom = [],
mymap.setMaxZoom([7])//zoom in
mymap.setMinZoom([4])//zoom out

//creating map tiles
var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
});
CartoDB_DarkMatter.addTo(mymap);

//===============================================================================
//border outlines
function style(feature) {
    return {
        fillColor: 'white',
        weight: 2,
        opacity: 1,
        color: '#666',
        dashArray: '3',
        fillOpacity: 0.01
    };
}
//highlight on mouseover
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#ffffff',
        dashArray: '',
        fillOpacity: 0.1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

var geojson;

//click to zoom
function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(mymap);
//===============================================================================
