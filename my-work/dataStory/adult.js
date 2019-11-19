// d3.json("adults.json").then(gotData);
let w = 1500;
let h = 900;
let col = 50;

let humanFigureData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;

function setX(datapoint,i){
  return 28 * (i % col)  + 50;
}

function setY(datapoint,i){
  if(i == 0){
    y = 0;
  }
  if (i % col == 0){
    y++;
  }
  return h - 150 * y;
}

let figureGroupElements = viz.selectAll(".figuregroup").data(humanFigureData)
.enter()
  .append("g")
  .attr("class", "figuregroup")
;

figureGroupElements.append("rect")
  .attr("x", setX)
  .attr("y", setY)
  .attr("width", 12)
  .attr("height", 40)
  .attr('fill', "black")
;

figureGroupElements
  .on("mouseover", function(d){
    console.log("hovering");
    let element = d3.select(this);
    element.select("rect").transition().attr("width", 18).attr("fill","red");
  })

  .on("mouseout", function(){
    let element = d3.select(this);
    element.select("rect").transition().attr("width", 12).attr("fill","black");
  })

var dragger = d3.drag()
  .on("drag", function () {
        d3.select(this)
            .attr("x", d3.event.x)
            .attr("y", d3.event.y);
    });

dragger(figureGroupElements.selectAll("rect"));


// var gauge1 = loadLiquidFillGauge("fillgauge1", 55);
//     var config1 = liquidFillGaugeDefaultSettings();
//     config1.circleColor = "#FF7777";
//     config1.textColor = "#FF4444";
//     config1.waveTextColor = "#FFAAAA";
//     config1.waveColor = "#FFDDDD";
//     config1.circleThickness = 0.2;
//     config1.textVertPosition = 0.2;
//     config1.waveAnimateTime = 1000;

// function NewValue(){
//         if(Math.random() > .5){
//             return Math.round(Math.random()*100);
//         } else {
//             return (Math.random()*100).toFixed(1);
//         }
// }

// function gotData(incomingData){
//   incomingData = fixJSDateObjects(incomingData);
//   // console.log(incomingData);
//
//   let adultsData = incomingData[0];
//   let menData = incomingData[1];
//   let womenData = incomingData[2];
//   // console.log(menData);
//
//   let data = adultsData;
//
//   let xDomain = d3.extent(adultsData, function(d){ return d.year });
//   let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
//   let xAxis = d3.axisBottom(xScale);
//   let xAxisGroup = viz.append("g")
//       .attr("class", "xaxisgroup")
//       .attr("transform", "translate(0,"+(h-ypadding)+")")
//   ;
//   xAxisGroup.call(xAxis);
//
//   let yMax = d3.max(adultsData, function(d){
//     return d.share;
//   })
//   let yDomain = [0, yMax];
//   let yScale = d3.scaleLinear().domain(yDomain).range([h-ypadding, ypadding]);
//   let yAxis = d3.axisLeft(yScale);
//   let yAxisGroup = viz.append("g")
//       .attr("class", "yaxisgroup")
//       .attr("transform", "translate("+(xpadding/2)+",0)")
//   ;
//   yAxisGroup.call(yAxis);
//
//
//   function update(newdata){
//     data = newdata;
//
//     function getX(d){
//       return xScale(d.year);
//     }
//
//     function getY(d){
//       return yScale(d.share);
//     }
//
//     let lineMaker = d3.line()
//                         .x(getX)
//                         .y(getY)
//     ;
//
//     let thisSituation = viz.datum(data);
//
//     thisSituation.append("path")
//                   .attr("class", "line")
//                   .attr('opacity', 0)
//                   .transition()
//                   .duration(500)
//                   .attr('opacity', 1)
//                   .attr("d", lineMaker)
//                   .attr("fill", "none")
//                   .attr("stroke", "blue")
//                   .attr("stroke-width", 2)
//                   .attr('opacity', 1)
//                   .transition()
//                   .delay(3000)
//                   .attr("stroke", "red")
//                   .duration(2000)
//                   .attr("opacity", 0)
//
//   ;
//
//     let exitingGroups = thisSituation.exit();
//
//     exitingGroups
//       .transition()
//       .duration(1000)
//       .remove()
//     ;
//   }
//
//   document.getElementById("data1button").addEventListener("click", function(){
//     update(adultsData);
//   });
//   document.getElementById("data2button").addEventListener("click", function(){
//     update(menData);
//   });
//   document.getElementById("data3button").addEventListener("click", function(){
//     update(womenData);
//   });
//
// }
//
// function fixJSDateObjects(dataToFix){
//   let timeParse = d3.timeParse("%Y");
//   return dataToFix.map(function(data){
//     return data.map(function(d){
//       return {
//         "entity": d.Entity,
//         "year": timeParse(d.Year),
//         "share": d.Share
//       }
//     })
//   });
// }
