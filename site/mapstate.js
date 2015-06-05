

d3.select("body").append("div").attr("class", 'mapper');
var width = 960;
var height = 600;


var features;

var dems = 0,
repubs = 0;


var holder = d3.select('.mapper')
.style("width", width + "px").style("height", height+"px")


var svg = holder.append("svg")
.attr("width", width)
.attr("height", height)
.style('background', 'black')
.style('border', '2px solid grey');


var polinfo = d3.select("body").append("div").attr("class", 'parhouse')
    .style('height', "440px").style('width', '250px')
    .style('background', 'grey')
    .style('float', 'right');

    polinfo.append('div')
    .attr('class','tots')

    .text('Totals:');



    polinfo.append('div')
    .html(
    ' </br><div class = "dems"><span class="demtext"> </span> Democrats</div> <div class="repubs"><span class="reptext"></span> Republicans</div>');


var polSquare = d3.select('.politsq')
                .attr('height', '20px')
                .attr('width', '20px')
                .attr('background', 'orange')
                .attr('class', 'politsq')


d3.json('nyUpper.topojson', function(err, d){
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


  features.selectAll(".distos")
    .data(stageo.features)
    .enter().append("path")
    .attr("class", function(d) { return "distos"; })
    .attr("d", path)
    .attr("fill",function(d,i){
      //console.log(d)
      return "#8c96c6";
    });



    d3.json("http://localhost:5000/db/?house=upper&state=ny", function(err, d){
      if( err){
        console.log("something went wrong getting the politicians", err);
      }

      console.log('data heresies', d)

            d3.selectAll('.distos')
              .style('fill', function(geo){
              //  console.log(geo.properties)
              //  return 'orange'

                   d.forEach(function(q){
                    // console.log(q)
                      if(q.district === geo.properties.name){
                        console.log('matched one!')

                        geo.properties.party = q.party;


                        return d;

                        }
                      })

                      //console.log(geo)
                      return makePcol(geo)


                })
              .attr('class', 'distos')
              .attr('stroke','null')


               countPollies(d)


    })




  //console.log(stageo)
})


function countPollies(){
  console.log('gonna add some polly stuff')
  console.log('repubs number:', repubs);
  console.log('democrat num:', dems)

  d3.select('.demtext')
    .text(dems);

    d3.select(".reptext").text(repubs)





}

function makePcol(d){
  //  console.log('making colors', d)
  var elesq;


  if(d.properties.party == 'Democratic'){
    dems += 1;
    elesq = d3.select('.dems')
      .append('div')
  //    .data(pols)
      .style('height', '20px')
      .style('width', '20px')
      .style('background', 'blue')
      .style('margin', '5px 5px 5px 5px')

      .attr('class', 'politsq')

          return 'blue'
  }
  else if(d.properties.party == 'Republican'){
    repubs += 1;
    elesq = d3.select('.repubs')
      .append('div')
  //    .data(pols)
      .style('height', '20px')
      .style('width', '20px')
      .style('background', 'red')
      .style('margin', '5px 5px 5px 5px')

      .attr('class', 'politsq')
    return 'red';
  }
  else{
    return 'yellow'
  }

}

function zoomed() {
  features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  features.selectAll(".bords").style("stroke-width", 1.5 / d3.event.scale + "px");
  features.selectAll(".myloc").attr("r", 8 / d3.event.scale + "px");
}
