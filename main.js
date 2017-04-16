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

CartoDB_DarkMatter.addTo(mymap);


/* DON'T TOUCH THIS OR I WILL RIP YOUR HEART OUT-------------------------------------------------------------------------*/
$('#start').click(function(air){
  console.log("we starting");

  $.getJSON("https://api.waqi.info/map/bounds/?latlng=28.70,-127.50,48.85,-55.90&token=ad9b0d10be0a4d6028e3724fc9d4f7e24a429d85", function(result){
    result.data.forEach(function(thing){
      console.log(thing)

      var lng = thing.lon;
      var lat = thing.lat;

      var circle = L.circle([lat,lng],{
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 5000
      })
      circle.addTo(mymap);
    });
  });
});

/* okay we cool -------------------------------------------------------------------------------------------------------*/
