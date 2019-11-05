d3.json("adults.json").then(gotData);

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
  // console.log(incomingData);

  let adultsData = incomingData[0];
  let menData = incomingData[1];
  let womenData = incomingData[2];
  // console.log(menData);

  let data = adultsData;

  let xDomain = d3.extent(adultsData, function(d){ return d.year });
  let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-ypadding)+")")
  ;
  xAxisGroup.call(xAxis);

  let yMax = d3.max(adultsData, function(d){
    return d.share;
  })
  let yDomain = [0, yMax];
  let yScale = d3.scaleLinear().domain(yDomain).range([h-ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+(xpadding/2)+",0)")
  ;
  yAxisGroup.call(yAxis);


  function update(newdata){
    data = newdata;

    function getX(d){
      return xScale(d.year);
    }

    function getY(d){
      return yScale(d.share);
    }

    let lineMaker = d3.line()
                        .x(getX)
                        .y(getY)
    ;

    let thisSituation = viz.datum(data);

    thisSituation.append("path")
                  .attr("class", "line")
                  .attr('opacity', 0)
                  .transition()
                  .duration(500)
                  .attr('opacity', 1)
                  .attr("d", lineMaker)
                  .attr("fill", "none")
                  .attr("stroke", "blue")
                  .attr("stroke-width", 2)
                  .attr('opacity', 1)
                  .transition()
                  .delay(3000)
                  .attr("stroke", "red")
                  .duration(2000)
                  .attr("opacity", 0)

  ;

    let exitingGroups = thisSituation.exit();

    exitingGroups
      .transition()
      .duration(1000)
      .remove()
    ;
  }

  document.getElementById("data1button").addEventListener("click", function(){
    update(adultsData);
  });
  document.getElementById("data2button").addEventListener("click", function(){
    update(menData);
  });
  document.getElementById("data3button").addEventListener("click", function(){
    update(womenData);
  });

}

function fixJSDateObjects(dataToFix){
  let timeParse = d3.timeParse("%Y");
  return dataToFix.map(function(data){
    return data.map(function(d){
      return {
        "entity": d.Entity,
        "year": timeParse(d.Year),
        "share": d.Share
      }
    })
  });
}
