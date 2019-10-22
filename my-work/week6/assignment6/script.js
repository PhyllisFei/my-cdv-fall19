let w = 1200;
let h = 800;

// for convenience
let datafile = "data.json";

// function to retrieve only the data points
// belonging to one step in time:
function getName(data, name){
  return data.filter(function(datapoint){
    if(datapoint.name == name){
      return true;
    }else{
      return false;
    }
  });
}

// creating the svg that holds everything else
// we do this outside the gotData function to
// keeps things clean
let viz = d3.select("#container")
  .append('svg')
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "darkcyan")
;

var datagroups;

function gotData(incomingData){
  // checking out our data
  // console.log(incomingData);
  // testing the filter function defined above
  // console.log(getName(incomingData, "A"));

  let xDomain = d3.extent(incomingData, function(datapoint){
    return datapoint.x;
  });
  let yDomain = d3.extent(incomingData, function(datapoint){
    return datapoint.y;
  })

  // general padding of our visualization
  let padding = 40;
  // scale to map from min and max of our x values to the
  // boundaries (minus padding) of our svg:
  let xScale = d3.scaleLinear().domain(xDomain).range([padding, w-padding]);

  // create axis for this scale
  let xAxis = d3.axisBottom(xScale);
  // create a groyp to gold the axis elements
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  // tell d3 to fill the group with the axis elements
  xAxisGroup.call(xAxis);
  // position the axis at the bottom of the svg
  xAxisGroup.attr("transform", "translate(0, "+ (h-padding) +")");
  // note how we flip the orientation (in the range) of our y scale
  // to make sure that low y values are at the bottom of the graph
  let yScale = d3.scaleLinear().domain(yDomain).range([h-padding, padding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+padding+",0)");

  // group that contains everything to do with graph (aka the actual shapes)
  let vizgroup = viz.append("g").attr("class", "vizgroup");

  // data to visualize
  // drawViz("A");


  function drawViz(name){
    let data = getName(incomingData, name);
    console.log(data);
    d3.shuffle(data);

    datagroups = vizgroup.selectAll(".datagroup").data(data, function(d){
      return d.step;
    });

    let enteringDataGroups = datagroups.enter()
      .append("g")
      .attr("class", "datagroup")
    ;
    enteringDataGroups.append("circle")
        .attr("r", 5)
        .attr("fill", "white")
    ;

    enteringDataGroups.transition()
                      // .delay(500)
                      .attr("transform", function(d, i){
                      return "translate("+ xScale(d.x) + ", " + yScale(d.y) + ")"
                    });

    datagroups.transition()
              // .duration(1000)
              .attr("transform", function(d, i){
                  return "translate("+ xScale(d.x) + ", " + yScale(d.y) + ")"
                }

              );
//transition problem: incoming data "jumps" into the graph when there are more datapoints entering. Want to fix it but don't know how!!
    datagroups.exit().remove(); //but I don't fully understand...
  }

  document.getElementById("btn1").addEventListener("click", function(){drawViz('A');});
  document.getElementById("btn2").addEventListener("click", function(){drawViz('B');});
  document.getElementById("btn3").addEventListener("click", function(){drawViz('C');});
}

d3.json(datafile).then(gotData);
