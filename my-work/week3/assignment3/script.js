// 7 columns * 2 rows:
function translate1(){
  let x = 100 + Math.random()*80;
  let y = 100 + Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate2(){
  let x = 250+Math.random()*80;
  let y = 100+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate3(){
  let x = 400+Math.random()*80;
  let y = 100+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate4(){
  let x = 550+Math.random()*80;
  let y = 100+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate5(){
  let x = 700+Math.random()*80;
  let y = 100+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate6(){
  let x = 850+Math.random()*80;
  let y = 100+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate7(){
  let x = 1000+Math.random()*80;
  let y = 100+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate8(){
  let x = 100+Math.random()*80;
  let y = 300+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate9(){
  let x = 250+Math.random()*80;
  let y = 300+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate10(){
  let x = 400+Math.random()*80;
  let y = 300+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate11(){
  let x = 550+Math.random()*80;
  let y = 300+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate12(){
  let x = 700+Math.random()*80;
  let y = 300+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate13(){
  let x = 850+Math.random()*80;
  let y = 300+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}
function translate14(){
  let x = 1000+Math.random()*80;
  let y = 300+Math.random()*80;
  return "translate (" + x + ", " + y + ")";
}

function getColor(datapoint, i){
  if(datapoint.cause == "family"){
    return "orange";
  }
  if(datapoint.cause == "friends"){
    return "lightblue";
  }
  if(datapoint.cause == "professors"){
    return "lightgreen";
  }
  if(datapoint.cause == "strangers"){
    return "pink";
  }
  if(datapoint.cause == "alone"){
    return "purple";
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
  if(datapoint.date == "2019-09-1916:00:00.000Z"){
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

// function gotData1(newdata){
//   console.log(newdata);
//   let family = [];
//   for (i = 0; i< newdata.length; i++){
//     family = viz.selectAll(".group1").data(newdata[i].family);
//   }
// group data by categories
//   let family = viz.selectAll(".group1").data(newdata)
//   family.enter()
//           .append("g")
//           .attr("class", "group1")
//   ;
// append different shapes to each category
//   family.append("circle")
//       .attr("r", 3)
//       .attr("fill", "red")
//       .attr("stroke", "black")
//   ;
//   family.attr("transform", translate1);
// }
// function gotData2(newdata){
//   let friends = viz.selectAll(".group2").data(newdata)
//     .enter()
//       .append("g")
//       .attr("class", "group2")
//   ;
//   friends.append("rect")
//       .attr("width", 4)
//       .attr("height", 4)
//       .attr("fill", "yellow")
//       .attr("stroke", "black")
//   ;
//   friends.attr("transform", translate2);
// }
// function gotData3(newdata){
//   let prof = viz.selectAll(".group3").data(newdata)
//     .enter()
//       .append("g")
//       .attr("class", "group3")
//   ;
//   prof.append("ellipse")
//       .attr("rx", 2)
//       .attr("ry", 4)
//       .attr("fill", "pink")
//       .attr("stroke", "black")
//   ;
//   prof.attr("transform", translate3);
// }
// function gotData4(newdata){
//   let strangers = viz.selectAll(".group4").data(newdata)
//     .enter()
//       .append("g")
//       .attr("class", "group4")
//   ;
//   strangers.append("rect")
//       .attr("width", 3)
//       .attr("height", 6)
//       .attr("fill", "lightgreen")
//       .attr("stroke", "black")
//   ;
//   strangers.attr("transform", translate4);
// }
// function gotData5(newdata){
//   let alone = viz.selectAll(".group5").data(newdata)
//     .enter()
//       .append("g")
//       .attr("class", "group5")
//   ;
//   alone.append("line")
//       .attr("")
//       .attr("")
//       .attr("")
//       .attr("")
//   ;
//   alone.attr("transform", randomTranslate);
// }

// d3.json("dataUpdate.json").then(gotData1);
// d3.json("dataUpdate.json").then(gotData2);
// d3.json("dataUpdate.json").then(gotData3);
// d3.json("dataUpdate.json").then(gotData4);
// d3.json("dataUpdate.json").then(gotData5);
