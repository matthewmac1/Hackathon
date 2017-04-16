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


/* DON'T TOUCH THIS OR I WILL RIP YOUR HEART OUT-------------------------------------------------------------------------*/
/*When button is clicked*/
$('#start').click(function(air){
	/*Print this to console*/
  console.log("we starting");

/*Get the JSON from the API*/
  $.getJSON("https://api.waqi.info/map/bounds/?latlng=28.70,-127.50,48.85,-55.90&token=ad9b0d10be0a4d6028e3724fc9d4f7e24a429d85", function(result){
  /*ForEach loop to find every dot*/
  result.data.forEach(function(thing){
  /*Print details on each dot to console*/
      console.log(thing)

			/*Create longitude and latitude variables*/
      var lng = thing.lon;
      var lat = thing.lat;

	var ql = thing.aqi;

	function getLevel(ql){
		return ql > 300 ? 7:
		 	ql > 200 ? 6:
			ql > 150 ? 5:
			ql > 100 ? 4:
			ql > 50  ? 3:
			ql > 25  ? 2:
				    1;
	}



	function getColour(lvl){
		return lvl == 7  ?  '#7e0023':
			lvl == 6  ?  '#660099':
			lvl == 5  ?  '#cc0033':
			lvl == 4  ?  '#ff9933':
			lvl == 3  ?  '#ffde33':
			lvl == 2  ?  '#99cc44':
		      	     	     '#009966';
	}



	function getRadius(lvl){
		return 5000 + ((lvl - 1)*1500);
	}




	var level = getLevel(ql);

			/*Draw circles*/
      var circle = L.circle([lat,lng],{


	 		/*Make 'em colourful*/
        color: getColour(level),
				/*Fill 'em colourful*/
        fillColor: getColour(level),
				/*make 'em see through*/
        fillOpacity: 0.5,

				/*make it radius out*/
        radius: getRadius(level)
      })
			/*Draw Circle on map*/
      circle.addTo(mymap);
    });
  });
});

/* okay we cool -------------------------------------------------------------------------------------------------------*/
