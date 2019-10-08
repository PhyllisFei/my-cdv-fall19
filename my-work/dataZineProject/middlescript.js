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
      let newd = {date: timedate, time: time, cause: "professors"}
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
                    .attr("fill", "black")
                    .attr("x", 65)
                    .attr("y", 305)
  ;

  //CANNOT SHOW???
  let text2 = viz.append("test")
                    .text("Sep 11th")
                    .attr("fill", "black")
                    .attr("x", 240)
                    .attr("y", 305)
  ;
  let text3 = viz.append("text")
                    .text("Sep 12th")
                    .attr("fill", "black")
                    .attr("x", 410)
                    .attr("y", 305)
  ;
  let text4 = viz.append("text")
                    .text("Sep 13th")
                    .attr("fill", "black")
                    .attr("x", 570)
                    .attr("y", 305)
  ;
  let text5 = viz.append("text")
                    .text("Sep 14th")
                    .attr("fill", "black")
                    .attr("x", 730)
                    .attr("y", 305)
  ;
  let text6 = viz.append("text")
                    .text("Sep 15th")
                    .attr("fill", "black")
                    .attr("x", 900)
                    .attr("y", 305)
  ;
  let text7 = viz.append("text")
                    .text("Sep 16th")
                    .attr("fill", "black")
                    .attr("x", 1070)
                    .attr("y", 305)
  ;
  let text8 = viz.append("text")
                    .text("Sep 17th")
                    .attr("fill", "black")
                    .attr("x", 65)
                    .attr("y", 550)
  ;
  let text9 = viz.append("text")
                    .text("Sep 18th")
                    .attr("fill", "black")
                    .attr("x", 240)
                    .attr("y", 550)
  ;
  let text10 = viz.append("text")
                    .text("Sep 19th")
                    .attr("fill", "black")
                    .attr("x", 410)
                    .attr("y", 550)
  ;
  let text11 = viz.append("text")
                    .text("Sep 20th")
                    .attr("fill", "black")
                    .attr("x", 570)
                    .attr("y", 550)
  ;
  let text12 = viz.append("text")
                    .text("Sep 21st")
                    .attr("fill", "black")
                    .attr("x", 730)
                    .attr("y", 550)
  ;
  let text13 = viz.append("text")
                    .text("Sep 22nd")
                    .attr("fill", "black")
                    .attr("x", 900)
                    .attr("y", 550)
  ;
  let text14 = viz.append("text")
                    .text("Sep 23th")
                    .attr("fill", "black")
                    .attr("x", 1070)
                    .attr("y", 550)
  ;

// Line Area Chart
  let dateObjectConverter = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

  let alternativeDomainArray = d3.extent(newdata, function(d){
    return dateObjectConverter(d.date);
  });

  console.log(alternativeDomainArray);

  /***** X-axis *****/
  let xPadding = 70;
  let xScale = d3.scaleTime().domain(alternativeDomainArray).range([xPadding+w/2, w-xPadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  xAxisGroup.call(xAxis);

  let xAxisYPos = h-130;
  xAxisGroup.attr("transform", "translate(0, "+ xAxisYPos +")");

  /***** Y-axis *****/
  let yScale = d3.scaleLinear()
                    .domain([0, 18])
                    .range( [xAxisYPos, 80] );

  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate( "+ (xPadding + w/2) +", 0)");

  /***** family line area *****/
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

  console.log(areadata[0]);

  var color = d3.scaleOrdinal()
    .domain(mygroups)
    .range(['lightblue','pink','lightgreen','gray','orange'])
  ;

  let area = d3.area()
              .x(function(d, i) { return xScale(new Date(d.data.key)); })
              .y0(function(d) { return yScale(d[0]); })
              .y1(function(d) { return yScale(d[1]); })
  ;

  viz.selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
        .style("fill", function(d) { name = mygroups[d.key] ;  return color(name); })
        .attr("stroke-width", 1.5)
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
  //CANNOT SHOW???
  if(datapoint.cause == "professors"){
    return "lightgreen";
  }
  if(datapoint.cause == "strangers"){
    return "gray";
  }
  if(datapoint.cause == "alone"){
    return "orange";
  }
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
