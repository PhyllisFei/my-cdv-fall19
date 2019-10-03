let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lightyellow")
;

let xpadding = 10;
let xScale = d3.scaleLinear().domain( [0, 100] ).range( [xpadding, w-xpadding] );

function xPosition(d, i){
  return xScale(i);
}

function yPosition(d, i){
  return h/2-20;
}

// let padding = 20; // to space the graph and text
// let yScale = d3.scaleLinear().domain( [ 0,828 ] ).range( [ padding, h/2-(2*padding)] );

let yScale = d3.scaleLinear().domain( [ 0,828 ] ).range( [ 0, h/2] );

function getSize(d, i){
  console.log(d);
  return yScale(d.height); //-padding;
}

function getGroupTranslation(d, i){
  return "translate(" + xPosition(d,i) + "," + yPosition(d,i) + ")";
}

function getName(d, i){
  return d.name + " - " + d.height
}

// let colorScale = d3.scaleLinear().domain( [300, 400, 828] ).range( ["white", "black", "red"] );

let colorScale = d3.scaleSequential(d3.interpolateCool).domain( [300, 828] );

function filterFunction(d, i){
  return d.height>400;
}

function getColor(d, i){
  return colorScale(d.height);
}

function gotData(incomingData){
  console.log(incomingData);

  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter().filter(filterFunction)
    .append("g")
      .classed("datagroup", true)
  ;

  let towers = datagroups.append("rect")
      .attr("x", 0)
      .attr("y", function(d,i){
        return (-1)*getSize(d, i)
      })
      .attr("width", 20)
      .attr("height", getSize)
      .attr("fill", getColor)
  ;

  let labels = datagroups.append("text")
      .text(getName)
      .attr("fill", getColor)
      .attr("transform", "rotate(90)")
  ;

  datagroups.attr("transform", getGroupTranslation);

}

d3.json("buildings.json").then(gotData);
