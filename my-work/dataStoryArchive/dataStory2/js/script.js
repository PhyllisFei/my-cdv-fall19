d3.json("json/adults.json").then(gotData1);
d3.json("json/dietcomp.json").then(gotData2);

let w = 1500;
let h = 900;
let col = 50;

function gotData1(incomingData){
  incomingData = fixJSDateObjects1(incomingData);
  console.log(incomingData);
  let adultsData = incomingData[0];
  let data = adultsData;

  let xDomain = d3.extent(adultsData, function(d){ return d.year });

  //here I place 100 humans
  let humanFigureData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

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

  let figureGroupElements = d3.select("#visualization1").append("svg")
                                .attr("width", w)
                                .attr("height", h)
                                .selectAll(".figuregroup").data(humanFigureData)
                                .enter()
                                .append("g")
                                .attr("class", "figuregroup")
  ;

  figureGroupElements.append("rect")
    .attr("x", setX)
    .attr("y", setY)
    .attr("width", 12)
    .attr("height", 40)
    .attr("stroke", "black")
    .attr("fill", "white")
  ;

  // scale width according to share
  let xScale = d3.scaleLinear().domain(0, 7).range([12, 20]);

  //this is a year slider
  var slider = d3
    .sliderBottom()
    .min(d3.min(xDomain))
    .max(d3.max(xDomain))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(900)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(xDomain)
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
      // console.log(val);
      // console.log(val.getTime());

      let match = incomingData[0].find(d=>{
        //here
        if (val.getFullYear() == d.year.getFullYear()){
          // console.log(val.getTime() );
          // console.log( d.year.getTime() ) ;
          // console.log("_");
          return true;
        }else {
          // console.log("nomatch");
          return false;
        }
      })

      let matchShare = match.share;
      console.log(matchShare%1);

      figureGroupElements.select("rect").attr("fill", function(d,i){
        // console.log(i);
        if(i+1 <= matchShare){
          return "red"
      }
      });


      //figure change size while sliding
      newSize = this.size;
      figureGroupElements.attr("width", newSize);
      // console.log(newSize);
    });

  var gTime = d3
    .select("div#slider")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 100)
    .append("g")
    .attr('transform', 'translate(20,20)');
  ;
  gTime.call(slider);


}

// viz % of carb, protein, Fat
function gotData2(incomingData){
  incomingData = fixJSDateObjects2(incomingData);

  let percentageData = calcShare(incomingData);

  console.log(percentageData);

  let viz = d3.select("#visualization2")
    .append("svg")
      .attr("width", w)
      .attr("height", h)
  ;

  //Circle viz for carbs in 1961
  let datapoint1 = viz.selectAll(".groups").data(percentageData.carbs).enter()
    .append("g")
      .attr("class", "groups")
  ;
  let carbsCircle = datapoint1.append("circle")
      .attr("r", 10)
      .attr("cx", 100)
      .attr("cy", 500)
      .attr("fill", "red")
  ;



  // //Circle viz for protein in 2013
  // let datapoint2 = viz.selectAll(".groups").data(percentageData.protein).enter()
  //   .append("g")
  //     .attr("class", "groups")
  // ;
  // let proteinCircle = datapoint2.append("circle")
  //   .attr("r", 10)
  //   .attr("cx", 200)
  //   .attr("cy", 500)
  //   .attr("fill", "green")
  //   ;
  //
  //   //Circle viz for fat in 2013
  // let datapoint3 = viz.selectAll(".groups").data(percentageData.fat).enter()
  //   .append("g")
  //     .attr("class", "groups")
  // ;
  // let fatCircle = datapoint3.append("circle")
  //     .attr("r", 10)
  //     .attr("cx", 300)
  //     .attr("cy", 500)
  //     .attr("fill", "blue")
  // ;
}

// //Liquid Fill Gauge graph
// var gauge1 = loadLiquidFillGauge("fillgauge1", 55);
//     var config1 = liquidFillGaugeDefaultSettings();
//     config1.circleColor = "#FF7777";
//     config1.textColor = "#FF4444";
//     config1.waveTextColor = "#FFAAAA";
//     config1.waveColor = "#FFDDDD";
//     config1.circleThickness = 0.2;
//     config1.textVertPosition = 0.2;
//     config1.waveAnimateTime = 1000;
//
// function NewValue(){
//     if(Math.random() > .5){
//         return Math.round(Math.random()*100);
//     } else {
//         return (Math.random()*100).toFixed(1);
//     }
// }


//calculate percentage of carb, fat, protein
function calcShare(data){
  // here we create a place to store the calculated data
  let output = {
    carbs: [],
    fat: [],
    protein: []
  }

  let carbs = data.map(function(d){
    const total = parseInt(d.total);
    const carbs = parseInt(d.carbs);
    return (carbs/total)*100;
  });
  // console.log(carb); //Max: 1961

  let fat = data.map(function(d){
    const total = parseInt(d.total);
    const fat = parseInt(d.fat);
    return (fat/total)*100;
  });
  // console.log(fat); //Max: 2013

  let protein = data.map(function(d){
    const total = parseInt(d.total);
    const proteinA = parseInt(d.proteinA);
    const proteinP = parseInt (d.proteinP);
    const protein = proteinA + proteinP;
    return (protein/total)*100;
  })
  // console.log(protein); //Max: 2013

  //here we update the calculated data
  output = {
    carbs: carbs,
    fat: fat,
    protein: protein
  };
  return output;
}


function fixJSDateObjects1(dataToFix){
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

function fixJSDateObjects2(dataToFix){
  let timeParse = d3.timeParse("%Y");
  // console.log(dataToFix);
  return dataToFix.map(function(data){
      return {
        "entity": data.Entity,
        "year": data.Year,
        "proteinA": data.ProteinA,
        "proteinP": data.ProteinP,
        "fat": data.Fat,
        "carbs": data.Carbohydrates,
        "total": data.Total
      }
  });
}




// here is the scrolling event listener
let previousSection;
d3.select("#textboxes").on("scroll", function(){
  // the currentBox function is imported on the
  // very fist line of this script
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
  let midpoint = scrollTop + targetRec.height/2;

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
// function adjustVizHeight(){
//   viz.style("height", function(){
//     w = parseInt(viz.style("width"), 10);
//     h = w*heightRatio;
//     return h;
//   })
// }
// function resized(){
//   adjustVizHeight()
// }
// window.addEventListener("resize", resized);
