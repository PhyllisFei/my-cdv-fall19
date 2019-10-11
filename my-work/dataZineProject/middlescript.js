let newdata = [];
let areadata = [];

function gotData(olddata){
  for (let i=0; i<olddata.length; i++){
    let d = olddata[i];
    let date = d.date;
    let time = d.time;

    let timedate = new Date(date);
    timedate.setHours(parseInt(String(time).substring(0,2)));

    areadata.push({date: timedate, time: time, name: "family", value: d.family})
    for (let j=0; j < d.family; j++){
      let newd = {date: date, time: time, cause: "family"}
      newdata.push(newd);
    }
    areadata.push({date: timedate, time: time, name: "friends", value: d.friends})
    for (let j=0; j < d.friends; j++){
      let newd = {date: date, time: time, cause: "friends"}
      newdata.push(newd);
    }
    areadata.push({date: timedate, time: time, name: "professors", value: d.professors})
    for (let j=0; j < d.professors; j++){
      let newd = {date: date, time: time, cause: "professors"}
      newdata.push(newd);
    }
    areadata.push({date: timedate, time: time, name: "strangers", value: d.strangers})
    for (let j=0; j < d.strangers; j++){
      let newd = {date: date, time: time, cause: "strangers"}
      newdata.push(newd);
    }
    areadata.push({date: timedate, time: time, name: "alone", value: d.alone})
    for (let j=0; j < d.alone; j++){
      let newd = {date: date, time: time, cause: "alone"}
      newdata.push(newd);
    }
  }

// create svg
  let w = 2400;
  let h = 800;

  let viz = d3.select("#container")
                  .append("svg")
                      .attr("width", w)
                      .attr("height", h)
                      .style("margin-top", 60)
                      .style("background-color", "black")
  ;

  let datagroups = viz.selectAll(".groups").data(newdata).enter()
    .append("g")
      .attr("class", "groups")
  ;

  let shapes = datagroups.append("circle")
      .attr("r", 4)
      .attr("fill", getColor)
      .attr("transform", getPos)
  ;

  // let title = viz.append("text")
  //                   .text("These are people who make me laugh every day ;)")
  //                   .attr("fill", "black")
  //                   .attr("x", 350)
  //                   .attr("y", 30)
  //                   .attr("font-size", 25)
  // ;

  let text1 = viz.append("text")
                    .text("Sep 10th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 60)
                    .attr("y", 315)
  ;
  let text2 = viz.append("text")
                    .text("Sep 11th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 235)
                    .attr("y", 315)
  ;
  let text3 = viz.append("text")
                    .text("Sep 12th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 400)
                    .attr("y", 315)
  ;
  let text4 = viz.append("text")
                    .text("Sep 13th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 560)
                    .attr("y", 315)
  ;
  let text5 = viz.append("text")
                    .text("Sep 14th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 720)
                    .attr("y", 315)
  ;
  let text6 = viz.append("text")
                    .text("Sep 15th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 890)
                    .attr("y", 315)
  ;
  let text7 = viz.append("text")
                    .text("Sep 16th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 1060)
                    .attr("y", 315)
  ;
  let text8 = viz.append("text")
                    .text("Sep 17th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 60)
                    .attr("y", 560)
  ;
  let text9 = viz.append("text")
                    .text("Sep 18th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 235)
                    .attr("y", 560)
  ;
  let text10 = viz.append("text")
                    .text("Sep 19th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 400)
                    .attr("y", 560)
  ;
  let text11 = viz.append("text")
                    .text("Sep 20th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 560)
                    .attr("y", 560)
  ;
  let text12 = viz.append("text")
                    .text("Sep 21st")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 720)
                    .attr("y", 560)
  ;
  let text13 = viz.append("text")
                    .text("Sep 22nd")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 890)
                    .attr("y", 560)
  ;
  let text14 = viz.append("text")
                    .text("Sep 23th")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 24)
                    .attr("fill", "white")
                    .attr("x", 1060)
                    .attr("y", 560)
  ;

// Area Chart
  // for (let i=0;i<areadata.length;i++){
  //   areadata[i].date = areadata[i].date.toString();
  // }

  // let dateObjectConverter = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

  // get time domain in the array
  let alternativeDomainArray = d3.extent(areadata, function(d){
    return ((d.date));
  });
  console.log(alternativeDomainArray);

  /***** X-axis *****/
  let xPadding = 70;
  let xScale = d3.scaleTime().domain(alternativeDomainArray).range([xPadding+w/2, w-xPadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  xAxisGroup.call(xAxis);

  let xAxisYPos = h-130;
  xAxisGroup.attr("transform", "translate(0, "+ xAxisYPos +")")
            .attr("color", "white")
            .attr("font-family", "Mansalva")
            .attr("font-size", 18)
;

  /***** Y-axis *****/
  let yScale = d3.scaleLinear()
                    .domain([0, 16])
                    .range( [xAxisYPos, 80] );

  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate( "+ (xPadding + w/2) +", 0)")
            .attr("color", "white")
            .attr("font-family", "Mansalva")
            .attr("font-size", 18)
;

  /*****  *****/
  var nestedData = d3.nest()
      .key(function(d, i) { return d.date;})
      .entries(areadata)
  ;
  // console.log(nestedData);

  var mygroups = ["family", "friends", "professors", "strangers", "alone"];
  var mygroup = [0,1,2,3,4];
  var stackedData = d3.stack()
    .keys(mygroup)
    .value(function(d, key){
      // console.log(d);
      // console.log(d.values[key].value);
      return d.values[key].value
      }
    )(nestedData);
  // console.log(areadata);

  var color = d3.scaleOrdinal()
    .domain(mygroups)
    .range(['lightblue','pink','lightgreen','orange'])
  ;
  // var strokeColor = d3.scaleOrdinal()
  //   .domain(mygroups)
  //   .range(['blue','red','green','orange'])
  // ;

  let area = d3.area()
              // .interpolate("basis")    /* failed to smooth the line */
              .x(function(d, i) { return xScale(new Date(d.data.key)); })
              .y0(function(d) { return yScale(d[0]); })
              .y1(function(d) { return yScale(d[1]); })
  ;

  viz.selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
        .style("fill", function(d) { name = mygroups[d.key] ;  return color(name); })
        // .attr("stroke", function(d) { name = mygroups[d.key] ;  return strokeColor(name); })
        .attr("stroke-width", .5)
        .attr("d", area)
  ;
}

// 7 columns * 2 rows:
function translate1(){
  let x = 50 + Math.random()*100;
  let y = 150 + Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate2(){
  let x = 220+Math.random()*100;
  let y = 150+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate3(){
  let x = 390+Math.random()*100;
  let y = 150+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate4(){
  let x = 550+Math.random()*100;
  let y = 150+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate5(){
  let x = 710+Math.random()*100;
  let y = 150+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate6(){
  let x = 880+Math.random()*100;
  let y = 150+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate7(){
  let x = 1050+Math.random()*100;
  let y = 150+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate8(){
  let x = 50+Math.random()*100;
  let y = 400+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate9(){
  let x = 220+Math.random()*100;
  let y = 400+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate10(){
  let x = 390+Math.random()*100;
  let y = 400+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate11(){
  let x = 550+Math.random()*100;
  let y = 400+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate12(){
  let x = 710+Math.random()*100;
  let y = 400+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate13(){
  let x = 880+Math.random()*100;
  let y = 400+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate14(){
  let x = 1050+Math.random()*100;
  let y = 400+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}

function getColor(datapoint, i){
  if(datapoint.cause == "family"){
    return "lightblue";
  }
  if(datapoint.cause == "friends"){
    return "pink";
  }
  if(datapoint.cause == "professors"){
    return "lightgreen";
  }
  if(datapoint.cause == "strangers"){
    return "orange";
  }
  // if(datapoint.cause == "alone"){
  //   return "gray";
  // }
}

function getPos(datapoint, i){
  if(datapoint.date == "2019-09-09T16:00:00.000Z"){
    return translate1();
  }
  if(datapoint.date == "2019-09-10T16:00:00.000Z"){
    return translate2();
  }
  if(datapoint.date == "2019-09-11T16:00:00.000Z"){
    return translate3();
  }
  if(datapoint.date == "2019-09-12T16:00:00.000Z"){
    return translate4();
  }
  if(datapoint.date == "2019-09-13T16:00:00.000Z"){
    return translate5();
  }
  if(datapoint.date == "2019-09-14T16:00:00.000Z"){
    return translate6();
  }
  if(datapoint.date == "2019-09-15T16:00:00.000Z"){
    return translate7();
  }
  if(datapoint.date == "2019-09-16T16:00:00.000Z"){
    return translate8();
  }
  if(datapoint.date == "2019-09-17T16:00:00.000Z"){
    return translate9();
  }
  if(datapoint.date == "2019-09-18T16:00:00.000Z"){
    return translate10();
  }
  if(datapoint.date == "2019-09-19T16:00:00.000Z"){
    return translate11();
  }
  if(datapoint.date == "2019-09-20T16:00:00.000Z"){
    return translate12();
  }
  if(datapoint.date == "2019-09-21T16:00:00.000Z"){
    return translate13();
  }
  if(datapoint.date == "2019-09-22T16:00:00.000Z"){
    return translate14();
  }
}

d3.json("laughter.json").then(gotData);
