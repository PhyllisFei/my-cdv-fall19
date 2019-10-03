// data cleanup
let newdata = [];

function gotData(olddata){
  for (let i=0; i<olddata.length; i++){
    // console.log(olddata[i]);
    let d = olddata[i];
    let date = d.date;
    let time = d.time;

    for (let j=0; j < d.family; j++){
      let newd = {date: date, time: time, cause: "family"}
      newdata.push(newd);
    }
    for (let j=0; j < d.friends; j++){
      let newd = {date: date, time: time, cause: "friends"}
      newdata.push(newd);
    }
    for (let j=0; j < d.professors; j++){
      let newd = {date: date, time: time, cause: "professors"}
      newdata.push(newd);
    }
    for (let j=0; j < d.strangers; j++){
      let newd = {date: date, time: time, cause: "strangers"}
      newdata.push(newd);
    }
    for (let j=0; j < d.alone; j++){
      let newd = {date: date, time: time, cause: "alone"}
      newdata.push(newd);
    }
  }

// create svg
  let viz = d3.select("#container")
                  .append("svg")
                      .attr("width", 1500)
                      .attr("height", 800)
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

  // let labels = datagroups.append("text")
  //   .text(getDate)
  //   .attr("fill", "black")
  //   .attr("transform", getPos)
  // ;

  let title = viz.append("text")
                    .text("These are people who make me laugh every day ;)")
                    .attr("fill", "black")
                    .attr("x", 350)
                    .attr("y", 30)
                    .attr("font-size", 25)
  ;

  let text1 = viz.append("text")
                    .text("Family")
                    .attr("fill", "lightblue")
                    .attr("x", 120)
                    .attr("y", 500)
  ;
  let text2 = viz.append("test")
                    .text("Friends")
                    .attr("fill", "pink")
                    .attr("x", 120)
                    .attr("y", 520)
  ;
  let text3 = viz.append("text")
                    .text("professors")
                    .attr("fill", "lightgreen")
                    .attr("x", 120)
                    .attr("y", 540)
  ;
  let text4 = viz.append("text")
                    .text("strangers")
                    .attr("fill", "gray")
                    .attr("x", 120)
                    .attr("y", 560)
  ;
  let text5 = viz.append("text")
                    .text("alone")
                    .attr("fill", "orange")
                    .attr("x", 120)
                    .attr("y", 580)
  ;

  let circle1 = viz.append("svg")
                      .append("circle")
                        .attr("r", 4)
                        .attr("fill", "lightblue")
                        .attr("x", 100)
                        .attr("y", 500)
  ;
  let circle2 = viz.append("svg")
                      .append("circle")
                        .attr("r", 4)
                        .attr("fill", "pink")
                        .attr("x", 100)
                        .attr("y", 520)
  ;
  let circle3 = viz.append("svg")
                      .append("circle")
                        .attr("r", 4)
                        .attr("fill", "lightgreen")
                        .attr("x", 100)
                        .attr("y", 540)
  ;
  let circle4 = viz.append("svg")
                      .append("circle")
                        .attr("r", 4)
                        .attr("fill", "gray")
                        .attr("x", 100)
                        .attr("y", 560)
  ;
  let circle5 = viz.append("svg")
                      .append("circle")
                        .attr("r", 4)
                        .attr("fill", "orange")
                        .attr("x", 100)
                        .attr("y", 580)
  ;
}

// 7 columns * 2 rows:
function translate1(){
  let x = 100 + Math.random()*100;
  let y = 100 + Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate2(){
  let x = 250+Math.random()*100;
  let y = 100+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate3(){
  let x = 400+Math.random()*100;
  let y = 100+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate4(){
  let x = 550+Math.random()*100;
  let y = 100+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate5(){
  let x = 700+Math.random()*100;
  let y = 100+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate6(){
  let x = 850+Math.random()*100;
  let y = 100+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate7(){
  let x = 1000+Math.random()*100;
  let y = 100+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate8(){
  let x = 100+Math.random()*100;
  let y = 300+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate9(){
  let x = 250+Math.random()*100;
  let y = 300+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate10(){
  let x = 400+Math.random()*100;
  let y = 300+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate11(){
  let x = 550+Math.random()*100;
  let y = 300+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate12(){
  let x = 700+Math.random()*100;
  let y = 300+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate13(){
  let x = 850+Math.random()*100;
  let y = 300+Math.random()*100;
  return "translate (" + x + ", " + y + ")";
}
function translate14(){
  let x = 1000+Math.random()*100;
  let y = 300+Math.random()*100;
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

// function getDate(datapoint, i){
//   return datapoint.date;
// }

d3.json("laughter.json").then(gotData);
