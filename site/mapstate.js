

d3.select("body").append("div").attr("class", 'mapper');
var width = 960;
var height = 600;


var features;


var holder = d3.select('.mapper')
.style("width", width + "px").style("height", height+"px")


var svg = holder.append("svg")
.attr("width", width)
.attr("height", height)
.style('background', 'black')
.style('border', '2px solid grey');


d3.json('nyLow.topojson', function(err, d){
  if (err){
    console.log("error, error data wasn't loaded:", err)
  }
  console.log(d)
  // the topology i want is called colli
  var stageo = topojson.feature(d, d.objects.colli);

  console.log(stageo);




  var lat;
  var lon;

  var projection = d3.geo.mercator()
    .scale(3000)
    .translate([width / 2, height / 2])
    .center([-75,43]);

    // So now when I call path on jam it will use this projection and stuff
  var path = d3.geo.path()
  .projection(projection);


  var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .scaleExtent([1, 18])
    .on("zoom", zoomed);


  //starting to really make the big bad map here
  features = svg.append('g');


  svg.call(zoom)


  features.selectAll(".casubun")
    .data(stageo.features)
    .enter().append("path")
    .attr("class", function(d) { return "casubun"; })
    .attr("d", path)
    .attr("fill",function(d,i){
      //console.log(d)
      return "#8c96c6";
    });











  //console.log(stageo)
})



function zoomed() {
  features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  features.selectAll(".bords").style("stroke-width", 1.5 / d3.event.scale + "px");
  features.selectAll(".myloc").attr("r", 8 / d3.event.scale + "px");
}
