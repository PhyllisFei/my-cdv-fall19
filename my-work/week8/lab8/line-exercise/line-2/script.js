d3.json("births.json").then(gotData);


let w = 900;
let h = 500;
let xpadding = 100;
let ypadding = 50;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;


function gotData(incomingData){
  incomingData = fixJSDateObjects(incomingData);
  console.log(incomingData);

  let data1 = incomingData[0];
  let data2 = incomingData[1];
  // console.log(data1);
  // console.log(data2);

  let xDomain = d3.extent(data1, function(d){ return d.year });
  let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-ypadding)+")")
  ;
  xAxisGroup.call(xAxis);

  let yMax = d3.max(data2, function(d){
    return d.birthsPerThousand;
  })
  let yDomain = [0, yMax];
  let yScale = d3.scaleLinear().domain(yDomain).range([h-ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+(xpadding/2)+",0)")
  ;
  yAxisGroup.call(yAxis);


  function getX(d){
    return xScale(d.year);
  }

  function getY(d){
    return yScale(d.birthsPerThousand);
  }

  let lineMaker = d3.line()
                      .x(getX)
                      .y(getY)
  ;

  let thisSituation1 = viz.datum(data1);

  thisSituation1.append("path")
                .attr("d", lineMaker)
                .attr("fill", "none")
                .attr("stroke", "blue")
  ;

  let thisSituation2 = viz.datum(data2);
  thisSituation2.append("path")
                .attr("d", lineMaker)
                .attr("fill", "none")
                .attr("stroke", "red")
  ;
}

// function that turns all datapoints year values
// into JS date objects in the very beginning
// so that WE DON'T HAVE TO DEAL WITH IT LATER
function fixJSDateObjects(dataToFix){
  // timeParser
  let timeParse = d3.timeParse("%Y");
  return dataToFix.map(function(data){
    return data.map(function(d){
      return {
        "country": d.country,
        "year": timeParse(d.year),
        "birthsPerThousand": d.birthsPerThousand
      }
    })
  });
}
