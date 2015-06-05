

var OpenStates = require('openstates');

// the api key is in a file in /api and is just a string of the api key the Sunlight foundation gave me.
var apiKey = require('./api/sunkey.js')
var openstates = new OpenStates(apiKey);

module.exports = (stateDat);

function stateDat (d){
  var chambers = d.chambers;
  var state = d.abbreviation;
  //console.log(state)

  openstates.metadataState(state, function(err, json) {
  if (err) throw err;
  //console.log(json);
});

//getleginfo(state, chambers[0]);
 for (i in chambers){
   console.log(i);

 }
}
