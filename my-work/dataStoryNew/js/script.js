d3.json("json/milktea.json").then(gotData1);

let w = 1500;
let h = 800;
let padding = 30;
let heightRatio = 0.8;
let col = 50;

function gotData1(incomingData){
  let milkteaData = incomingData;
  console.log(milkteaData);
  let allBrands = milkteaData.map(function(d){return d.Brand});

  let viz1 = d3.select("#visualization1")
    .append("svg")
      .style("width", w)
      .style("height", h)
  ;

  //here we draw the xAxis
  let xScale = d3.scaleBand()
      .domain(allBrands)
      .range([padding, w-padding])
      .paddingInner(0.1)
  ;
  let xAxis = d3.axisBottom(xScale);
  // xAxis.tickFormat(d=>{return milkteaData.filter(dd=>dd.Brand==d)[0].Product;});
  let xAxisGroup1 = viz1.append("g").classed("xAxis", true);
  xAxisGroup1.call(xAxis);
  xAxisGroup1.selectAll("text").attr("font-size", 24).attr("y", 9);
  xAxisGroup1.selectAll("line").remove();
  xAxisGroup1.attr("transform", "translate(0,"+ (h-padding) +")");

  //here we draw the yAxis
  let yMax1 = d3.max(milkteaData, function(d){return d.SugarS});
  let yDomain1 = [0, yMax1];
  let yScale1 = d3.scaleLinear().domain(yDomain1).range([0, h-padding*2]);
  let graphGroup1 = viz1.append("g").classed("graphGroup", true)
                      .selectAll(".datapoint").data(milkteaData, function(d){return d.Brand;})
                      .enter()
                        .append("g").classed("datapoint", true)
                        .attr("transform", function(d, i){
                          return "translate("+ xScale(d.Brand)+ "," + (h - padding) + ")"
                        })
                          .append("rect")
                            .attr("fill", "lightblue")
                            .attr("opacity", "1")
                            .attr("width", function(){
                              return xScale.bandwidth();
                            })
                            .attr("height", function(d, i){
                              return yScale1(d.SugarS);
                            })
                            .attr("y", function(d,i){
                              return -yScale1(d.SugarS);
                            })
                        ;
 // hide detailed info box
  let detailBox = d3.select("#visualization1").append("div").attr("class", "detailBox")
     .attr("class", "detailBox")
     .style("opacity", 0)
  ;

  graphGroup1
    .on("mouseover", function(d){
      console.log("hovering");
      let element = d3.select(this);
      element.select("rect").transition().duration(100).attr("opacity", 0);

      // show detailed info box on hover
      detailBox.transition()
                 .duration(50)
                 .style("opacity", .9)
      ;

      //POSITION not changing???
      detailBox.html(d.Product + "<br/>" + d.NetWeight + "mL")
                   .style("left", (d3.event.pageX) + "px")
                   .style("top", (d3.event.pageY) + "px")
     ;

   })

    .on("mouseout", function(){
      let element = d3.select(this);
      element.select("rect").transition().duration("100").attr("opacity", 1);

      detailBox.transition()
                 .duration(50)
                 .style("opacity", 0);
    });

  let checkState1 = d3.extent(milkteaData, function(d){return d.WithSugar});
  console.log(checkState1);

  // if (checkState1.yes){
  //   graphGroup1.attr("fill", "lightblue");
  //   console.log("yes");
  // }else{
  //   graphGroup1.attr("fill", "red");
  //   console.log("no");
  // }


  //here we discuss about coffein
  let viz2 = d3.select("#visualization2")
    .append("svg")
      .style("width", w)
      .style("height", h)
  ;

  let xAxisGroup2 = viz2.append("g").classed("xAxis", true);
  xAxisGroup2.call(xAxis);
  xAxisGroup2.selectAll("text").attr("font-size", 24).attr("y", 9);
  xAxisGroup2.selectAll("line").remove();
  xAxisGroup2.attr("transform", "translate(0,"+ (h-padding) +")");

  //here we draw the xAxis
  let yMax2 = d3.max(milkteaData, function(d){return d.CoffeinS});
  let yDomain2 = [0, yMax2];
  let yScale2 = d3.scaleLinear().domain(yDomain2).range([0, h-padding*2]);
  let graphGroup2 = viz2.append("g").classed("graphGroup2", true)
                      .selectAll(".datapoint").data(milkteaData, function(d){return d.Brand;})
                      .enter()
                        .append("g").classed("datapoint", true)
                        .attr("transform", function(d, i){
                          return "translate("+ xScale(d.Brand)+ "," + (h - padding) + ")"
                        })
                          .append("rect")
                            .attr("width", function(){
                              return xScale.bandwidth();
                            })
                            .attr("height", function(d, i){
                              return yScale2(d.CoffeinS);
                            })
                            .attr("y", function(d,i){
                              return -yScale2(d.CoffeinS);
                            })
                        ;

}

  // //here I place 100 humans
  // let humanFigureData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  //
  // function setX(datapoint,i){
  //   return 28 * (i % col)  + 50;
  // }
  //
  // function setY(datapoint,i){
  //   if(i == 0){
  //     y = 0;
  //   }
  //   if (i % col == 0){
  //     y++;
  //   }
  //   return h - 150 * y;
  // }
  //
  // let figureGroupElements = d3.select("#visualization1").append("svg")
  //                               .attr("width", w)
  //                               .attr("height", h)
  //                               .selectAll(".figuregroup").data(humanFigureData)
  //                               .enter()
  //                               .append("g")
  //                               .attr("class", "figuregroup")
  // ;
  //
  // figureGroupElements.append("rect")
  //   .attr("x", setX)
  //   .attr("y", setY)
  //   .attr("width", 12)
  //   .attr("height", 40)
  //   .attr("stroke", "black")
  //   .attr("fill", "white")
  // ;

  // scale width according to share
  // let xScale = d3.scaleLinear().domain(0, 7).range([12, 20]);

//   //this is a year slider
//   var slider = d3
//     .sliderBottom()
//     .min(d3.min(xDomain))
//     .max(d3.max(xDomain))
//     .step(1000 * 60 * 60 * 24 * 365)
//     .width(900)
//     .tickFormat(d3.timeFormat('%Y'))
//     .tickValues(xDomain)
//     .on('onchange', val => {
//       d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
//       // console.log(val);
//       // console.log(val.getTime());
//
//       let match = incomingData[0].find(d=>{
//         //here
//         if (val.getFullYear() == d.year.getFullYear()){
//           // console.log(val.getTime() );
//           // console.log( d.year.getTime() ) ;
//           // console.log("_");
//           return true;
//         }else {
//           // console.log("nomatch");
//           return false;
//         }
//       })
//
//       let matchShare = match.share;
//       console.log(matchShare%1);
//
//       figureGroupElements.select("rect").attr("fill", function(d,i){
//         // console.log(i);
//         if(i+1 <= matchShare){
//           return "red"
//       }
//       });
//
//
//       //figure change size while sliding
//       newSize = this.size;
//       figureGroupElements.attr("width", newSize);
//       // console.log(newSize);
//     });
//
//   var gTime = d3
//     .select("div#slider")
//     .append("svg")
//     .attr("width", 1000)
//     .attr("height", 100)
//     .append("g")
//     .attr('transform', 'translate(20,20)');
//   ;
//   gTime.call(slider);
//
//
// }
//
// // viz % of carb, protein, Fat
// function gotData2(incomingData){
//   incomingData = fixJSDateObjects2(incomingData);
//
//   let percentageData = calcShare(incomingData);
//
//   console.log(percentageData);
//
//   let viz = d3.select("#visualization2")
//     .append("svg")
//       .attr("width", w)
//       .attr("height", h)
//   ;
//
//   //Circle viz for carbs in 1961
//   let datapoint1 = viz.selectAll(".groups").data(percentageData.carbs).enter()
//     .append("g")
//       .attr("class", "groups")
//   ;
//   let carbsCircle = datapoint1.append("circle")
//       .attr("r", 10)
//       .attr("cx", 100)
//       .attr("cy", 500)
//       .attr("fill", "red")
//   ;
// }


// here is the scrolling event listener
let previousSection;
d3.select("#textboxes").on("scroll", function(){
  currentBox(function(box){
    console.log(box.id);

    if(box.id=="two" && box.id!=previousSection){
      console.log("changing viz");
      // trigger a new transition
      previousSection = box.id;
    }
  })
})

function currentBox(cb){
  // next line from: https://stackoverflow.com/a/222847
  let boxes = Array.prototype.slice.call( document.getElementsByClassName("box") );
  let scrollTop = event.target.scrollTop;
  let targetRec = event.target.getBoundingClientRect();
  let firstBoxRec = boxes[0].getBoundingClientRect();
  let midpoint = scrollTop;// + targetRec.height/2;

  let closestBox = boxes.reduce(function(closest, box){
    box.style.color = "black";
    let preMid = closest.getBoundingClientRect().top+closest.getBoundingClientRect().height/2;
    let preOffset = preMid - firstBoxRec.top;
    let preDist = Math.abs(preOffset - midpoint);
    let newMid = box.getBoundingClientRect().top+box.getBoundingClientRect().height/2;
    let newOffset = newMid - firstBoxRec.top;
    let newDist = Math.abs(newOffset - midpoint);
    if(newDist < preDist){
      return box
    }else{
      return closest
    }
  }, boxes[0]);
  return cb(closestBox, boxes);

}

// function to adjust viz height dynamically
// in order to keep the heightRatio at any given
// width of the browser window
function adjustVizHeight(){
  let viz = d3.select("#container")
      .style("width", w)
      .style("height", h)
  ;

  viz.style("height", function(){
    w = parseInt(viz.style("width"), 10);
    h = w*heightRatio;
    return h;
  })
}
function resized(){
  adjustVizHeight()
}
window.addEventListener("resize", resized);
