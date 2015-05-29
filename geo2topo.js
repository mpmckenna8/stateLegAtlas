

var topojson = require("topojson");
var locey = require("./local.js");


//console.log()
//locey(bleeper);
function bleeper (geoj){
var id = 1;
  console.log('what I try to use is', geoj);
  console.log(typeof(geoj));
  var toppy = topojson.topology(geoj, {"property-transform": function (feature) {
  return null//feature.properties;
}});
  console.log(//Object.keys
    (toppy)) //.objects.collection))

}


var practer = {
          type: "FeatureCollection",
          features: [
            {type: "Feature", geometry: {type: "LineString", coordinates: [[.1, .2], [.3, .4]]}},
            {type: "Feature", geometry: {type: "Polygon", coordinates: [[[.5, .6], [.7, .8]]]}}
          ]
        }
  var toprac = topojson.topology({colli:practer});

  console.log(practer)
  console.log(toprac)
