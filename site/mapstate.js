d3.select("body").append("div").attr("class", 'mapper');




d3.json('ny.topojson', function(err, d){
  if (err){
    console.log("error, error data wasn't loaded:", err)
  }
  console.log(d)
  // the topology i want is called colli
  var stageo = topojson.feature(d, d.objects.colli);

  console.log(stageo);

  var features;

  var width = 960,
  var height = 600;

  var lat;
  var lon;


  //console.log(stageo)
})
