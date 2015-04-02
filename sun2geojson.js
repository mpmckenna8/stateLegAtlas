
module.exports = function(json){
  console.log('got some json to work with');
//  console.log('shapy',json.shape);

  var togo =
    { "type":"FeatureCollection",
      "features":[
        { "type":"Feature",
          "geometry":{"type": "Polygon", "coordinates":[]},
          "properties":{

            }
          }
      ]
    }

    console.log(json.shape.length)

    togo.features[0].properties = json;

    console.log(togo.features);
}
