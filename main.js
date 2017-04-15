/**
 *inspired by John Isaacs
 */



//set the map and initial coordinates
var mymap = L.map('mapid').setView([40, -95], 5);

//set the initial tilelayer
var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

//add the tilelayer to the map
CartoDB_DarkMatter.addTo(mymap);

/*
//when the button on is clicked
$('#shakey').click(function() {
    console.log("getting quakes");
    //use the jquery get json method to retrieve our json
    $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(result) {
        //response data is now in the result variable
        //uncomment the line below to see the raw json, this would let you see the structure of the response
        //console.log(result)
        //I know that the earthquakes are defined in an array (or list) result.features
        result.features.forEach(function(quake) {
          //for each earthquake
          //get its coordinates
          var lng = quake.geometry.coordinates[0];
          var lat = quake.geometry.coordinates[1];
          //and it magnitude
          var mag = quake.properties.mag * 50;
          //for each earthquake create a circle
            var circle = L.circle([lat, lng], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: mag
            })
            //and add it to the map
            circle.addTo(mymap);

        });

    });


    $.getJSON("http://www.kuakes.com/json/?callback=?", function(result) {
      console.log(result);
    });

});
*/
