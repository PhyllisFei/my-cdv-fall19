let w = 1500;
let h = 800;
let padding = 30;
let heightRatio = 0.8;
let col = 50;

function gotData1(incomingData){
  let milkteaData = incomingData;
  console.log(milkteaData);

  //----- NEW SUGAR ARRAY -----//
  milkteaData.forEach(function(d){
    // map sugar value to number of cube sugar (4g)
    const total = parseInt(d.SugarS);
    const sugarunits = total/4;
    d.sugarunits = sugarunits;
  })
  let sugarArray = [];
  //resturcture dataset: datapoints == sugar units
  milkteaData.forEach(function(d){
    let number = d.sugarunits;
    for(var i=0; i<number; i++){
      var sugarObject = new Object();
      sugarObject.brand = d.Brand;
      sugarObject.product = d.Product;
      sugarObject.withSugar = d.WithSugar;
      sugarObject.sugar = d.SugarS;
      sugarObject.netWeight = d.NetWeight;

      sugarArray.push(sugarObject);
    }
  })
  // console.log(sugarArray);

//----- NEW AMERICANO ARRAY -----//
  milkteaData.forEach(function(d){
    // map coffein value to cups of Americano (108mg)
    const total = parseInt(d.CoffeinS);
    const americanounits = total/108;
    d.americanounits = americanounits;
  })
  let americanoArray = [];
  //resturcture dataset: datapoints == americano units
  milkteaData.forEach(function(d){
    let number = d.americanounits;
    for(var i=0; i<number; i++){
      var americanoObject = new Object();
      americanoObject.brand = d.Brand;
      americanoObject.product = d.Product;
      americanoObject.withSugar = d.WithSugar;
      americanoObject.coffein = d.CoffeinS;
      americanoObject.netWeight = d.NetWeight;

      americanoArray.push(americanoObject);
    }
  })
    // console.log(americanoArray);

  //----- NEW Redbull ARRAY -----//
  milkteaData.forEach(function(d){
    // map coffein value to cups of Redbull (50mg)
    const total = parseInt(d.CoffeinS);
    const redbullunits = total/50;
    d.redbullunits = redbullunits;
  })
  let redbullArray = [];
  //resturcture dataset: datapoints == americano units
  milkteaData.forEach(function(d){
    let number = d.redbullunits;
    for(var i=0; i<number; i++){
      var redbullObject = new Object();
      redbullObject.brand = d.Brand;
      redbullObject.product = d.Product;
      redbullObject.withSugar = d.WithSugar;
      redbullObject.coffein = d.CoffeinS;
      redbullObject.netWeight = d.NetWeight;

      redbullArray.push(redbullObject);
    }
  })
    // console.log(redbullArray);

  let viz1 = d3.select("#visualization1")
    .append("svg")
      .style("width", w)
      .style("height", h)
  ;
  let viz2 = d3.select("#visualization2")
    .append("svg")
      .style("width", w)
      .style("height", h)
  ;
  let viz3 = d3.select("#visualization3")
    .append("svg")
      .style("width", w)
      .style("height", h)
  ;

  let allBrands = milkteaData.map(function(d){return d.Brand});
  let xScale = d3.scaleBand()
      .domain(allBrands)
      .range([padding, w-padding])
      .paddingInner(0.1)
  ;
  let xAxis = d3.axisBottom(xScale);

//---- Viz 1: vertical bar----//
  let xAxisGroup1 = viz1.append("g").classed("xAxis", true);
  xAxisGroup1.call(xAxis);
  xAxisGroup1.selectAll("text").attr("font-size", 24).attr("y", 9);
  xAxisGroup1.selectAll("line").remove();
  xAxisGroup1.attr("transform", "translate(0,"+ (h-padding) +")");

//---- Viz 2: horizontal bar----//
  let yScale2 = d3.scaleBand()
      .domain(allBrands)
      .range([0, h])
      .paddingInner(0.1)
  ;
  let yAxis2 = d3.axisLeft(yScale2);
  let yAxisGroup2 = viz2.append("g").classed("yAxis", true);
  yAxisGroup2.call(yAxis2);
  yAxisGroup2.selectAll("text").attr("font-size", 24).attr("x", 180);
  yAxisGroup2.selectAll("line").remove();
  yAxisGroup2.attr("transform", "translate(0,0)");

//---- Viz 3: vertical bar----//
  let xAxisGroup3 = viz3.append("g").classed("xAxis", true);
  xAxisGroup3.call(xAxis);
  xAxisGroup3.selectAll("text").attr("font-size", 24).attr("y", 9);
  xAxisGroup3.selectAll("line").remove();
  xAxisGroup3.attr("transform", "translate(0,"+ (h-padding) +")");

  //here we draw the yAxis
  let yMax1 = d3.max(milkteaData, function(d){return d.SugarS});
  let yDomain1 = [0, yMax1];
  let yScale1 = d3.scaleLinear().domain(yDomain1).range([0, h-padding*2]);

  let xMax2 = d3.max(milkteaData, function(d){return d.CoffeinS});
  let xDomain2 = [0, xMax2];
  let xScale2 = d3.scaleLinear().domain(xDomain2).range(0, w);

  let yMax3 = d3.max(milkteaData, function(d){return d.CoffeinS});
  let yDomain3 = [0, yMax3];
  let yScale3 = d3.scaleLinear().domain(yDomain3).range([0, h-padding*2]);

  /*---------------- Visualization1 --------------------*/
  let graphGroup1 = viz1.append("g").classed("graphGroup", true)
                      .selectAll(".datapoint").data(sugarArray, function(d){return d.Brand;})
                      .enter()
                        .append("g").classed("datapoint", true)
                        .attr("transform", function(d, i, datapoints){

                          let brand = d.brand;
                          let cansseenbefore = datapoints.slice(0, i);

                          function checkBrand(datapointFromTheLeft) {
                            let datapointFromTheLeftssBrand = datapointFromTheLeft.__data__.brand;
                            return datapointFromTheLeftssBrand == brand;
                          }
                          let samebranditems = cansseenbefore.filter(checkBrand);

                          // console.log("placing itme number", i, ". The brand is", brand, ". already placed these cans:", cansseenbefore);
                          // console.log(samebranditems.length);

                          let canheight = 25;
                          let x = xScale(d.brand) + 40 + 10 * Math.random();
                          let y = (h - padding*3/2) - (canheight * samebranditems.length);
                          return "translate("+ x + "," + y + ")"
                        })
  ;

  let graphGroup2 = viz2.append("g").classed("graphGroup2", true)
                      .selectAll(".datapoint").data(americanoArray, function(d){return d.Brand;})
                      .enter()
                        .append("g").classed("datapoint", true)
                        .attr("transform", function(d, i, datapoints){

                          let brand = d.brand;
                          let cansseenbefore = datapoints.slice(0, i);

                          function checkBrand(datapointFromTheLeft) {
                            let datapointFromTheLeftssBrand = datapointFromTheLeft.__data__.brand;
                            return datapointFromTheLeftssBrand == brand;
                          }
                          let samebranditems = cansseenbefore.filter(checkBrand);

                          let canwidth = 45;
                          let y = yScale2(d.brand) + padding*2 + 8*Math.random();
                          let x = padding*9 + (canwidth * samebranditems.length);
                          return "translate("+ x + "," + y + ")"
                        })
  ;

 let graphGroup3 = viz3.append("g").classed("graphGroup3", true)
                     .selectAll(".datapoint").data(redbullArray, function(d){return d.Brand;})
                     .enter()
                       .append("g").classed("datapoint", true)
                       .attr("transform", function(d, i, datapoints){

                         let brand = d.brand;
                         let cansseenbefore = datapoints.slice(0, i);

                         function checkBrand(datapointFromTheLeft) {
                           let datapointFromTheLeftssBrand = datapointFromTheLeft.__data__.brand;
                           return datapointFromTheLeftssBrand == brand;
                         }
                         let samebranditems = cansseenbefore.filter(checkBrand);

                         let canheight = 53;
                         let x = xScale(d.brand) + 40 + 15 * Math.random();
                         let y = (h - padding * 10/3) - (canheight * samebranditems.length);
                         return "translate("+ x + "," + y + ")"
                       })
  ;

 //hide detailed info box
  let detailBox1 = d3.select("#visualization1").append("div")
     .attr("class", "detailBox")
     .style("opacity", 0)
  ;
  let detailBox2 = d3.select("#visualization2").append("div").attr("class", "detailBox")
     .attr("class", "detailBox")
     .style("opacity", 0)
  ;
  let detailBox3 = d3.select("#visualization3").append("div").attr("class", "detailBox")
     .attr("class", "detailBox")
     .style("opacity", 0)
  ;

  graphGroup1
    .on("mousemove", function(d){
      // console.log("hovering");
      detailBox1.transition()
                 .duration(50)
                 .style("opacity", .9)
      ;

      detailBox1.html(d.product + " (" + d.netWeight + "mL)" + "<br/>" + d.sugar + " g/serving")
                   .style("left", (d3.event.pageX) + "px")
                   .style("top", (d3.event.pageY) - 60 + "px")
     ;
   })
    .on("mouseout", function(){
      // console.log('out');
      detailBox1.transition()
                 .duration(50)
                 .style("opacity", 0)
      ;
    })
  ;

/*---------------- Visualization2: Americano Coffein --------------------*/
 graphGroup2
   .on("mouseover", function(d){
     console.log("hovering");
     detailBox2.transition()
                .duration(50)
                .style("opacity", .9)
     ;
     detailBox2.html(d.product + " (" + d.netWeight + "mL)" + "<br/>" + d.coffeinS + " mg/serving")
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY) + "px")
    ;
  })

   .on("mouseout", function(){
     let element = d3.select(this);
     element.select("rect").transition().duration("100").attr("opacity", 1);

     detailBox2.transition()
                .duration(50)
                .style("opacity", 0);
   });

 /*---------------- Visualization3: Redbull Coffein --------------------*/
  graphGroup3
    .on("mouseover", function(d){
      console.log("hovering");
      // show detailed info box and img box on hover
      detailBox3.transition()
                 .duration(50)
                 .style("opacity", .9)
      ;
      detailBox3.html(d.product + " (" + d.netWeight + "mL)" + "<br/>" + d.coffeinS + " mg/serving")
                   .style("left", (d3.event.pageX) + "px")
                   .style("top", (d3.event.pageY) + "px")
     ;
   })

    .on("mouseout", function(){
      let element = d3.select(this);
      element.select("rect").transition().duration("100").attr("opacity", 1);

      detailBox3.transition()
                 .duration(50)
                 .style("opacity", 0);
    });

//here I append svgs
  graphGroup1.html(svgSugar)
            .selectAll("path")
              .attr("transform", "scale(0.02)")
  ;
  graphGroup2.html(svgAmericano)
              .selectAll("path").attr("transform", "scale(0.02)")
  ;
  graphGroup3.html(svgRedbull)
             .selectAll("path").attr("transform", "scale(0.4)")
  ;


/*------ Visualization 5: Official Standardization Line -----*/

     //------ Here is a a graphic equation of coffein (pick the one that has the most) ------//
     // 1 milktea = XX Americano == XX Redbull



     // // display different color for different suger proportion: normal/no sugar
     //   let checkState1 = d3.extent(milkteaData, function(d){return d.WithSugar});
     //   console.log(checkState1);
     //  // ----------- ????? color not changing----------------
       // if (checkState1.yes){
       //   graphGroup1.attr("fill", "lightblue");
       //   console.log("yes");
       // }else{
       //   graphGroup1.attr("fill", "red");
       //   console.log("no");
       // }

     // // Here I draw a standard LINE --
     // // According to the Dietary Guidelines for Chinese Residents:
     // // <= 25g/day is suggested, not exceed 50g/day
     //
     // let lineData = [ { "x": 0,   "y": 20},  { "x": 2000,  "y": 20}];
     //
     // let lineMaker = d3.line()
     //                     .x(function(d){ return d.x})
     //                     .y(function(d){ return d.y})
     //                 ;
     // viz1.datum(lineData)
     //                 .append("path")
     //                 .attr("d", lineMaker)
     //                 .attr("fill", "none")
     //                 .attr("stroke", "black")
     //                 .attr("transform", function(d, i){
     //                   return "translate("+ xScale(d.Brand)+ "," + (h - padding) + ")"
     //                 })
     // ;



}





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


let svgSugar = `<g transform="rotate(270)">
    <path d="M1495 1681 c-11 -5 -40 -9 -65 -9 -25 -1 -75 -8 -110 -17 -88 -22
    -500 -34 -535 -15 -42 22 -73 3 -199 -123 -145 -145 -286 -302 -286 -316 0 -5
    6 -14 14 -18 24 -14 38 -162 45 -496 5 -287 8 -320 24 -331 9 -7 17 -20 17
    -29 0 -10 12 -18 33 -21 61 -10 402 -13 482 -5 44 5 142 9 217 10 l137 3 71
    57 c125 102 225 168 246 163 12 -3 27 3 38 15 17 19 18 43 13 448 -5 411 -14
    527 -41 571 -4 7 -2 26 4 43 25 59 -35 98 -105 70z m-140 -215 c-163 -156
    -113 -140 -465 -156 -124 -6 -268 -14 -320 -19 -52 -4 -96 -7 -98 -5 -2 1 55
    62 126 136 l130 133 235 2 c163 1 263 6 328 18 51 8 95 18 98 20 2 3 27 5 55
    5 l51 -1 -140 -133z m203 -455 c-4 -349 -5 -375 -22 -385 -10 -6 -68 -51 -130
    -99 l-111 -88 -6 43 c-4 24 -10 192 -14 373 -4 182 -11 347 -15 368 l-8 37
    119 113 c80 75 126 111 138 109 11 -2 23 3 27 10 18 28 25 -122 22 -481z
    m-368 -173 c5 -205 10 -387 10 -405 l0 -31 -112 -6 c-62 -3 -219 -10 -348 -15
    -129 -6 -248 -13 -265 -16 l-30 -6 -3 188 c-4 249 -18 470 -37 567 -10 57 -12
    82 -4 87 20 12 162 21 451 28 158 3 290 10 294 14 4 4 13 -2 21 -12 10 -15 15
    -109 23 -393z"/>
  </g>`

let svgAmericano = `<g transform="rotate(180)">
    <path d="M790 2779 c-48 -7 -104 -22 -281 -74 -25 -7 -74 -27 -108 -44 -71
    -36 -86 -61 -76 -132 6 -44 -11 -165 -24 -173 -13 -8 -112 14 -127 28 -8 9
    -22 16 -29 16 -16 0 -55 -51 -55 -72 0 -8 -7 -23 -15 -34 -8 -10 -15 -31 -15
    -46 0 -23 9 -33 53 -58 28 -17 63 -33 77 -36 14 -3 39 -12 57 -20 17 -8 38
    -14 46 -14 22 0 33 -19 50 -90 19 -75 92 -506 102 -595 13 -119 56 -384 94
    -585 22 -113 50 -259 61 -325 26 -142 49 -235 61 -235 4 0 11 -15 14 -33 4
    -21 17 -39 37 -52 97 -62 125 -75 168 -75 25 0 68 -7 95 -16 30 -9 66 -13 90
    -9 22 3 72 1 110 -5 59 -8 84 -6 160 11 131 29 153 37 223 80 35 21 69 39 77
    39 22 0 33 29 44 121 12 91 37 362 46 499 9 124 32 381 60 650 22 211 30 312
    51 617 5 80 8 92 26 96 11 3 30 1 43 -5 36 -16 115 32 115 71 0 23 -78 139
    -106 158 -15 9 -42 13 -79 11 l-57 -3 -28 84 c-21 63 -26 90 -19 103 15 27 2
    70 -26 91 -14 10 -73 27 -132 38 -92 18 -153 21 -418 24 -171 1 -335 -2 -365
    -6z m710 -97 c19 -6 57 -13 84 -17 27 -4 45 -10 40 -15 -12 -12 -227 -71 -289
    -80 -27 -4 -95 -14 -150 -23 -148 -23 -378 -30 -440 -13 l-50 14 76 1 c85 1
    113 18 102 59 -10 38 -48 50 -135 41 -42 -4 -82 -10 -88 -14 -5 -3 -10 -25
    -10 -47 l0 -41 -86 7 c-48 3 -95 13 -106 20 -20 14 -19 15 18 31 22 9 50 19
    64 21 14 3 37 9 51 15 14 5 66 21 115 34 87 24 95 24 429 20 187 -2 356 -8
    375 -13z m158 -149 c25 -67 40 -123 34 -126 -14 -8 -68 -19 -142 -28 -41 -6
    -100 -14 -130 -19 -128 -21 -438 -43 -615 -45 -148 -2 -411 10 -422 19 -1 0 5
    31 14 67 14 63 16 67 46 72 39 6 226 -9 284 -23 80 -19 312 -12 496 15 95 14
    195 32 222 40 100 29 190 53 196 54 4 1 11 -11 17 -26z m221 -190 c7 -14 0
    -22 -48 -45 -31 -16 -75 -40 -99 -54 -32 -18 -78 -31 -170 -45 -70 -11 -138
    -22 -152 -24 -60 -10 -335 -28 -440 -28 -179 -2 -500 13 -553 25 -27 6 -51 16
    -54 24 -3 8 -20 13 -46 12 -55 -1 -167 31 -167 48 0 7 3 19 6 28 7 17 3 18
    134 -13 117 -28 271 -40 495 -41 224 -1 373 9 655 45 19 2 77 9 128 15 51 6
    135 24 185 40 110 34 113 35 126 13z m-144 -516 c-8 -77 -15 -143 -15 -148 0
    -5 -4 -9 -9 -9 -5 0 -51 -25 -102 -55 -52 -31 -123 -65 -159 -76 -90 -28 -254
    -35 -516 -19 -184 10 -227 16 -287 37 -136 47 -145 56 -163 156 -21 114 -62
    301 -74 331 -15 41 -13 45 28 35 20 -4 102 -8 182 -8 80 0 188 -6 241 -12 73
    -9 116 -9 173 0 42 6 120 11 173 11 53 0 123 5 157 10 33 6 122 19 198 30 75
    11 147 24 160 29 23 8 23 8 26 -82 1 -49 -4 -153 -13 -230z m-30 -289 c-5 -27
    -30 -251 -50 -463 -17 -175 -21 -195 -38 -195 -7 0 -29 -16 -48 -36 -45 -47
    -90 -69 -201 -99 -78 -21 -115 -25 -235 -25 -79 0 -162 4 -185 10 -24 5 -68
    14 -98 20 -43 8 -72 25 -141 77 -100 76 -96 68 -129 276 -10 67 -29 184 -41
    260 -12 75 -20 140 -16 143 3 3 43 -9 89 -26 89 -35 134 -40 518 -56 235 -11
    366 16 509 102 66 40 73 41 66 12z m-853 -879 c203 -44 401 -43 568 4 94 26
    118 37 169 75 l33 25 -5 -74 c-2 -41 -10 -142 -17 -225 -12 -144 -14 -152 -38
    -166 -22 -14 -28 -14 -54 1 -25 14 -29 14 -38 1 -6 -9 -6 -18 0 -24 30 -30 1
    -45 -140 -75 -72 -15 -105 -17 -215 -10 -191 13 -277 24 -302 40 -24 14 -30
    29 -13 29 16 0 11 47 -6 54 -8 3 -24 1 -34 -4 -31 -17 -40 -12 -40 23 0 17
    -13 100 -29 182 -16 83 -32 174 -36 204 l-7 55 55 -48 c50 -42 65 -49 149 -67z"/>
</g>`

let svgRedbull = `<g>
    <path class="cls-1" d="M3.22,132.77c-1.32.69-2.83,1.75-3.06-.9a16.94,16.94,0,0,1,0-5c1.25-5.78.73-11.62.9-17.44C1.71,88,1.93,66.5,2.29,45c.13-8,.7-15.93.89-23.91.11-4.34,1.91-7.7,5.75-10.67C19.51,2.26,31.67.38,44.33.25,55,.14,65.63-.48,76.26.78a99.23,99.23,0,0,1,25.61,6.8c6.07,2.45,11.66,5.19,15.85,10.34.62.75,2,1.68,1.18,2.37-2.75,2.31-.64,4.94-.7,7.31-.33,14.62-1.15,29.22-1.83,43.83-.84,17.94-3.05,35.85-2.17,53.85.2,4-1.37,7.82-1.1,11.87.16,2.39-2.27,3.39-4,4.68-7.46,5.65-16.25,7.54-25.22,9-7.94,1.33-15.65.62-23.62-.58s-16.37-2.56-24.68-2.43c-9.52.14-18.09-2.8-26.09-7.8a14.65,14.65,0,0,1-6.37-7.33c1.3-2.32,2.63-2.39,4.65-.54,7.69,7,16.85,10.05,27.28,10.4a267.83,267.83,0,0,1,29.72,3.12,63.15,63.15,0,0,0,37.34-5.83c4.56-2.2,7.1-5.27,6.79-10.43,1.75-7.8.25-15.7.72-23.54.33-18.25,1.94-36.43,2.84-54.65.32-6.46,0-12.95,1.06-19.38.23-1.39.67-3.25-.7-4.19s-2.77.55-4,1.27c-12,7.32-25.16,11-39.13,12a13,13,0,0,1-3.47-.13c-3.55-1.13-7.22-.42-10.82-.73-8.06-1-16-2.56-23.94-4.29C24,34.21,16.79,32,10.92,26.68c-.71-.64-1.54-1.61-2.54-1.26-1.45.49-.85,2-.9,3-.18,4.13.3,8.28-.55,12.39-.94,9.32-.26,18.65-.4,28-.12,7.83,0,15.66,0,23.5A13.31,13.31,0,0,1,6.16,96c-1.47,7.56-.11,15.19-.53,22.78-.1,1.82,0,3.64,0,5.47A14.18,14.18,0,0,1,3.22,132.77Z"/>
    <path class="cls-2" d="M4.89,96l.38-3.15c.81-12.24.1-24.49.36-36.73.12-5.45-.39-10.92.29-16.36q.11-8,.22-16c0-1.46.59-2.59,2-1.1,9.65,10.4,23,11.53,35.64,14.44C47.49,38,51.42,37.39,55,39c3.61,1,7.35-.15,11,.67,16.61-.35,32-4.72,45.77-14.18.86-.59,1.76-2.05,2.94-1.14.53.42.39,1.86.34,2.83-.5,9.44-.87,18.9-1.64,28.32-.62,7.63-.42,15.27-1,22.9-.62,9.09-2,18.17-1.44,27.33-1.15,4.58-5,6.24-8.82,7.13a170.36,170.36,0,0,1-52.53,3.92A152.08,152.08,0,0,1,14,109.89C4.64,106.84,4,106,4.89,96Z"/>
    <path class="cls-3" d="M54.7,3.73H68.18A76.57,76.57,0,0,1,100.83,11c4.16,1.94,8.83,2.84,11.84,6.89,1,1.39,1.21,2-.28,2.94C101,28,89.25,33.94,75.32,35c-18,1.42-35.33-1.68-52.42-6.53-6.29-1.78-11.13-6.46-15.77-11.07-1-1-.76-1.46,0-2.33A23.44,23.44,0,0,1,12.75,11c10.84-6.42,22.66-7.89,35-7.27,2.33.12,4.66,0,7,0Z"/>
    <path class="cls-4" d="M4.89,96c.06.82.17,1.65.17,2.47,0,5.7,1.16,7.32,6.53,9.25,20.8,7.5,42.4,8.93,64.18,7.92,8.52-.39,17-2.22,25.4-3.94,3.74-.77,7.45-2.49,9.81-6,.57,6.72-.53,13.48.55,20.2.24,1.49-1.65,2.45-1.41,4.06-4.65,4.33-10.84,4-16.41,5-23,4.13-46,2.65-68.87-1.15A55.58,55.58,0,0,1,9.16,129c-1.95-1-3.85-2-5-3.93,0-8.12-.07-16.24,0-24.36C4.15,99.12,3.54,97.36,4.89,96Z"/>
    <path class="cls-5" d="M4.14,125.06c13.9,7.52,29.11,9,44.52,10.05,6.46.43,12.91.76,19.39.79,10.64,0,21.07-1.56,31.47-3.69,3.54-.72,7.06-1.51,10.6-2.25.71,4.94-1.48,7.87-5.85,10.23-13.36,7.23-27.37,8.87-42.23,6.6a243,243,0,0,0-30.61-3c-8.66-.23-16.25-3.64-23-8.92-.66-.51-1.67-1-1.81-1.65-.78-3.63-2.23-1-3.44-.45l.07,0C3,130.14,4.6,127.72,4.14,125.06Z"/>
    <path class="cls-6" d="M5.92,39.73Q6,65.38,6,91a2.45,2.45,0,0,1-.7,1.79q0-24.37,0-48.75C5.25,42.62,5,41.06,5.92,39.73Z"/>
    <path class="cls-7" d="M66,39.64c-3.66,0-7.4,1.13-11-.67C58.67,39,62.39,38.13,66,39.64Z"/>
    <path class="cls-8" d="M53.35,83.93c-5.31-.08-10.61-.45-15.92.4a3.64,3.64,0,0,1-3-1.51c-1-1.32-1.56-2.1-2.82.21-1,1.72-2.35.15-2.47-1.28a28.35,28.35,0,0,1-.06-7.91,33.57,33.57,0,0,0,1-9.24C30,63,31,62.8,32.32,62.69c4.59-.37,6.71,1.84,6.79,7.21-.6,1.95-2,3.26-3.43,4.59a1.44,1.44,0,0,0-.1,2.2c1.16.88,1.34-.44,1.53-1a5.69,5.69,0,0,1,4-3.82,4,4,0,0,1,4,2c1.4,1.68.09,3-.57,4.44,1.11-1.19,1.1-3.23,2.93-3.9.3-.11.59-.28.9-.39,1.45,0,1.93-.74,2-2.12a23,23,0,0,1,.82-5.31c.47-1.47,1.48-2.85,3-.7C56.58,72,54.57,77.94,53.35,83.93Z"/>
    <path class="cls-9" d="M28.18,51.77C34.11,50.4,40.33,49.68,45,45.22a5.48,5.48,0,0,1,4-1.52,1.8,1.8,0,0,1,1.5-.14,10.79,10.79,0,0,1,4.39,4.49c3,5.55,1.31,9.26-4.77,10.54A3.59,3.59,0,0,1,47.9,58a2.54,2.54,0,0,0-2.21.79c-1.76,1.92-1.75,1.88-3-.69-.86-1.81-2-1-3.12-.22-.53.35-1.11,1.07-1.7.62-.82-.62.35-1,.45-1.48.29-1.58-1-1.11-1.45-.87-1.71,1-3.26,2.18-5,3.14-1.39.78-1.63-.31-1.76-1.36,1.23-1.76,1.33-3.2-1.12-3.9-.75-.21-1.66-.16-1.87-1.21C27.52,52.48,27.58,51.86,28.18,51.77Z"/>
    <path class="cls-10" d="M64.06,83.86c-3.17,2.89-5.17,2.9-8.3,0-1.58-6.17-2.23-12.27,1.4-18,5.2-1,7.17.44,7,5.5,0,1.46,0,2,1.5,2.78,1.77,1,4.37-.39,5.42,2.09l1.11-1c2-1.8,3.31-.82,3.91,1.19s1.49,4.35,1,6.7c-2.41,3.79-5.82,2-9,1.57a1.44,1.44,0,0,0-.22-.78C66.67,81.43,65.35,83.18,64.06,83.86Z"/>
    <path class="cls-11" d="M66.24,45.74c2.71-.19,5.22.09,7,2.51,1.4,1.87,3.61,2.15,5.71,2.43,1.67.22,3.28.34,4.26,2,.55,1,2.15,1.69.81,3.16-2.68,1-4.86,2.23-3.09,5.67a1.62,1.62,0,0,1-.14,1.84c-.45-.46-1.08-.83-1.31-1.37-1.34-3.21-5.68-1.14-7.19-4.14-.28-.56-1.29-.09-1.28.73.07,3.6-.94,3.73-3.1,1.1-.18-.22-1.17.23-1.78.37a4.9,4.9,0,0,1-2-1.75,1.64,1.64,0,0,1-.1-1.9,2.9,2.9,0,0,1,2.2-.93,3.85,3.85,0,0,0-1.92.35c-.93.26-1.87.81-2.73-.16-1.37-4.06,1.05-6.91,3.12-9.88A1.25,1.25,0,0,1,66.24,45.74Z"/>
    <path class="cls-12" d="M75,92.17c.88,1.26.45,2.14-.84,2.72-1.48.65-1.14,1.93-.83,3,.37,1.23,1.63.69,2.54.85,1.61.28,4.37-1,4.53,1.28s-2.62,2-4.33,1.87c-2.5-.16-3.16.94-3,3.22.11,1.79,0,4.44-1.95,4.42-2.11,0-1.16-2.65-1.13-4.09,0-2.59-.93-3.64-3.49-3.32a9.28,9.28,0,0,1-2.47,0c-.8-.13-2.25.49-2.05-1.09.06-.48,1.31-.8,2-1.2a4.21,4.21,0,0,1,2.25-1c.8-.07,1.68-.1,2-1.11-.77-.18-1.46.62-2.24.17a2.92,2.92,0,0,1-1.56-3.37c.52-1.79.13-4,2.5-5.07C71.71,87.34,72,87.37,75,92.17Z"/>
    <path class="cls-13" d="M75,92.17c-.62-.19-1.42-.13-1.68-.85-.73-2-1-6.06-3.11-.6-.28.71-.84,1.12-1.51.84s-1.34-2.16-2.17-1.32c-1.1,1.13-1.13,3-1.2,4.65-.05,1,0,2.22,1.21,2.38.79.11,1.29-.86,1.48-1.7s.33-1.8,1.46-1.36c.62.24.51,1.11.54,1.75.2,3.58-.23,3.85-6,3.8.47-2.55-.74-5-.14-7.69.53-2.45.51-4.28,3.62-4.57,1.7-.16.86-1.74.63-2.79a3.72,3.72,0,0,0,1.45.15c1.75-.61,3.42-1.91,5.24,0,.33.35,1.12-.39,1.41-1a4.89,4.89,0,0,1,.92-.84c1.62-.49,2.27-2.43,4-2.73a2.28,2.28,0,0,1,1.18.42A4.62,4.62,0,0,0,86,83.6c.17,1.74-.75,2.32-2.35,2.29-2.13,0-4.26-.09-6.39,0-3.78.14-4,.43-3,4C74.44,90.64,74.77,91.4,75,92.17Z"/>
    <path class="cls-14" d="M43.34,91.93c2,0,4-.09,6-.09.64,0,1.37,0,1.62.8a1.39,1.39,0,0,1-.72,1.7c-4.09,2-1.62,5.54-1.92,8.35-.15,1.46,1.76,1,2.82,1.26,1.41.29,3.6.23,3.39,2s-2.45,1.08-3.81,1.11c-3.16.07-6.32-.07-9.48-.18-.86,0-1.71-.42-1.81-1.35s1.38-.7,1.61-1.57c2.86-2,3.11-4.8,2.27-8C43,94.69,41.68,93.26,43.34,91.93Z"/>
    <path class="cls-15" d="M36,101.86c-1.76-.29-3.62-.86-2.3-3.06,1.48-2.46-3.73-2.91-1.3-5.38a54.92,54.92,0,0,1,4.71-4.92c.88-.69,1.41.73,1.16,1.4-1.49,3.9,1,2.23,2.59,1.94a3.57,3.57,0,0,1,1,.08C42.3,96.53,39.77,100.85,36,101.86Z"/>
    <path class="cls-16" d="M86,83.6c-3.3,2.24-3.56,2.06-4-2.66-1.68-5.15-.59-10.12,1-15,1.71-2.57,2.79-1.42,3,.76.27,3.64.12,7.31.12,11C86.09,79.61,86,81.61,86,83.6Z"/>
    <path class="cls-17" d="M36,101.86c1.08-1.62,5.32-1.1,3.17-5.14-.43-.79,2.92-2.44,2.66-4.8h1.48c.67,2.72,2,5.13,1.89,8.22-.17,3.27-1.41,4.06-4.2,3.8a3.82,3.82,0,0,1-1-.1c-1-1.22-3.12-.4-4-2Z"/>
    <path class="cls-18" d="M80.88,80.78c-.81,1.37-.54,4-3.43,2.89a7.18,7.18,0,0,1-1-6.49C77.7,73.46,77.3,69.66,78,66c.77-1.71,1.62-1.33,2.5-.09C83.78,70.74,81.66,75.78,80.88,80.78Z"/>
    <path class="cls-19" d="M57.16,65.85c-1.82,3.06-.49,6.44-1,9.66-.39,2.75-.31,5.58-.44,8.38l-2.41,0c-.46-6.08.73-12.07.94-18.12Z"/>
    <path class="cls-20" d="M65,57.91c1.1.3,1,1.24,1.14,2.09C61.43,66.2,52,65.17,47.9,58l2.22-.13C56.23,61.66,60.14,61.67,65,57.91Z"/>
    <path class="cls-21" d="M41.16,71.82c-1.53,1.46-3.1,2.86-3.2,5.26,0,.91-.65,2.6-1.2,2.44-1.57-.45-2.58-1.94-3.38-3.37a1.47,1.47,0,0,1,.85-2.32,13.47,13.47,0,0,0,4.88-3.93C39.1,71.29,39.91,71.79,41.16,71.82Z"/>
    <path class="cls-22" d="M78,66a47.12,47.12,0,0,1-.51,12.32,10.63,10.63,0,0,0,0,5.4l-1.21.22c-.35-2.36-.83-4.72-1-7.09s-1.52-2-3-1.55C73.15,74.59,77.45,67.66,78,66Z"/>
    <path class="cls-23" d="M84.06,55.8l-.81-3.16c.58-.56,3.3,2.57,2-1.25-.53-1.61-1.48-3.25-.46-5.18.79-1.51,1.69-2.39,3.4-2.19a1.49,1.49,0,0,1,1.43,1.16c.07.65-.54,1.47-1.12,1.4-3.83-.5-2.81,2.39-2,3.57C89.2,53.83,87.21,55,84.06,55.8Z"/>
    <path class="cls-24" d="M66.24,45.74a3,3,0,0,1-1,.16c-4.66-2.62-9.86-1.12-14.76-1.94L49,43.7c4-3.08,11.56-3.71,15.24-1.2A3.82,3.82,0,0,1,66.24,45.74Z"/>
    <path class="cls-25" d="M80.88,80.78c0-5,.77-10-.43-14.92l2.57,0c.48,5.07-.54,10-1,15Z"/>
    <path class="cls-26" d="M28.18,51.77l-1,1c-1-2.77.75-4.74,2.06-6.83.61-1,1-1.79-.64-2-.9-.14-2.27.25-2.3-1.18,0-1,1.27-.72,1.92-1.09,1.28-.74,2.11-.3,2.93.73,1.07,1.32.42,2.48-.2,3.67C30,47.93,28.09,49.37,28.18,51.77Z"/>
    <path class="cls-27" d="M36.07,101.88c1.65,0,3.75-.89,4,2-2,.27-3.15,2.44-5.34,2.15-.77-.1-1.84.3-2.19-.51s.57-1.37,1.21-1.85S35.29,102.47,36.07,101.88Z"/>
    <path class="cls-28" d="M48.4,73.94c-1.52,1.71-3.19,3.33-3.27,5.85,0,.86-.21,1.71-1.32,1.62a1.82,1.82,0,0,1-1.24-.7c-.63-1,.58-1.28,1-1.87a8,8,0,0,0,1.6-5Z"/>
    <path class="cls-29" d="M29.05,54c1.28,0,3.08-.76,3.59.68.61,1.7-1.33,2.35-2.47,3.22A5.83,5.83,0,0,0,29.05,54Z"/>
    <path class="cls-13" d="M64.06,83.86a18.32,18.32,0,0,1,1.31-1.47c.72-.65,1.43-2.15,2.21-1.67s.48,2.08.34,3.21Z"/>
    <path class="cls-30" d="M25.8,25.18c-2.68-.17-5.4-.25-6.35-3.13a10,10,0,0,1,1.39-8.53,3.42,3.42,0,0,1,3-1.56c4.57.6,9.3,1,12.69,4.74,1.34,1.47,2.83,3.65.13,4.9C33.2,23.18,29.43,24,25.8,25.18Z"/>
    <path class="cls-31" d="M31.88,121c-1.15,1.24-.18,1.48.8,2,1.61.89,2.1,0,2.43-1.26.27-1,.33-2.28,1.38-2.45s.47,1.47,1,1.76c1.23.67,2-.56,2.84-1.14,4-2.72,5.22-2.4,7.31,2.11.29.64.58,1.27,1.29,1.32.89.07.89-.75,1-1.36.65-3.14,2.38-2.6,4.24-1.18.85.65,1.45.91,1.56-.41.34-4,3.3-1.77,5.12-2.14a.78.78,0,0,1,.82,1.25C59,123,63.75,125.33,63,128.49c-.07.33,1.19,1.31,1.49.95.78-.93,1.72-2.56.77-3.38-2.52-2.2,0-2.79,1-2.76,1.95,0,3.71-3,6-.23.47.59,1.5-1.34,1.77-2.35.58-2.14,1.07-3.23,3.28-1.08A6.61,6.61,0,0,0,81.46,121c.63,0,1.22,1.12,1.67-.36.57-1.84,1.42-3.91,2.06,0,0,.26.29,1.18.77.29,2.41-4.45,7.27-.14,10.15-2.87a.55.55,0,0,1,.49,0c2.59,1.07,2.05-3.66,4-2.44,1.55,1-.57,4,1.51,5.3,1.34.87.74,1.7,0,2.39-1.27,1.22-.88,2.74-1,4.2-.11,1,1.06,2.58-.65,2.84-1.13.17-1.07-1.39-1.32-2.31-.35-1.25-1.38-1.11-1.74-.34-1.23,2.69-4.15,2.25-5.8,2.23A34,34,0,0,0,78.94,132c-1.33.5-2.42,1.54-2.71-.87-.11-.89-1-.44-1.44-.66-2.23-1-1.92,2.53-3.85,2-.86-.25-1.16-3.23-2.7-.57a1.12,1.12,0,0,1-2,0c-.25-.36-.35-.71-1-.68-2.59.14-4.75,2.66-7.82.7-2.32-1.48-5.17-1.08-8.11-.5-2.73.54-5.82-.71-8.81-.73-1,0-1.32-.87-1.17-1.77.2-1.14.55-2.25.75-3.39.11-.65,0-1.44-.75-1.6s-1,.59-1.08,1.25,0,1.34,0,2,0,1.4-.94,1.48c-.55,0-.74-.46-1.08-.79-2.93-2.92-3-2.89-5.34.91-.26.42-.58.87-1.13.71a.93.93,0,0,1-.53-.73c.57-3.69-1.69-4.08-4.47-4-.42,0-1.15-.26-1.23-.54-.22-.75.28-1.24,1-1.3,1.29-.11,1.9-1,1.54-2-1.4-4,2.37-2.76,3.81-3.68C30.67,116.73,32,119.16,31.88,121Z"/>
    <path class="cls-32" d="M16.12,123.86c-3.66,1.11-3.54-2.29-3.22-3.63.5-2.12,2.22-4,3.58-5.85.49-.69,1.56-.15,1.34.45-1.47,4.08,1.05,2.36,2.82,2.13,1.35-.18,2.79-.14,2,2.11a47.7,47.7,0,0,0-1,4.81c-.18.67-.46,1.41.19,1.75,1,.51,2.9.52,2.36,1.85-.47,1.15-2.41.36-3.69.36s-2.36.3-3.41-.36-3.08.82-3.37-1c-.12-.75,1.54-1.79,2.38-2.7.55-.55,1.52-.36,1.93-1.13A6.49,6.49,0,0,0,16.12,123.86Z"/>
    <path class="cls-33" d="M32.22,68.27c.19-1.18-.27-3,1.59-3a2.29,2.29,0,0,1,2.41,2.54,2.82,2.82,0,0,1-2.9,2.75C31.93,70.65,32.38,69.19,32.22,68.27Z"/>
    <path class="cls-34" d="M50.51,44c3.4-1.6,7-1,10.56-1,2.07,0,3.16,1.44,4.2,2.92-.62,3.46-3.94,6.07-3.13,10,.52.52,1.49.21,1.85,1a1.25,1.25,0,0,0,1,1,2.85,2.85,0,0,1-.43,2.36c-3.33,3.38-12.2,1.88-14.48-2.41l.27-.41c1.14-1.63,4.37.68,4.46-1.82.11-2.88.81-6.19-2-8.59C51.88,46.22,50.73,45.4,50.51,44Z"/>
    <path class="cls-35" d="M59.12,80.32c-.06-1.94-.24-3.76,2.37-3.48,1,.11,2.53-.44,2.53,1.45,0,1.12-3.23,4-4.21,3.8C58.53,81.82,59.54,80.68,59.12,80.32Z"/>
    <path class="cls-36" d="M61.22,69.78c0,1.14-.31,2.32-1.47,2.28-1,0-.64-1.27-.65-2s-.27-1.84.84-1.94S61.12,69,61.22,69.78Z"/>
    <path class="cls-37" d="M64,56.89c-.8,0-1.59,0-1.85-1a9.94,9.94,0,0,1,2.67-.95c1.16-.07,3-.76,3.35.43.23.82-2,.24-2.87.95A6.69,6.69,0,0,1,64,56.89Z"/>
    <path class="cls-38" d="M23.56,23c-.65-.46-1.92.39-1.76-1,.09-.73.78-.93,1.53-.89a7.19,7.19,0,0,0,2-.15c1.48-.36,3.33-.89,2.93-2.7s-2.07-3-4.22-2c-.73.34-1.54,1.12-1.84-.24a1.65,1.65,0,0,1,1.62-2.08c4.28-.22,7.54,2.22,10.81,4.46,1,.7.22,1.46-.68,1.67C30.41,20.89,27.12,22.57,23.56,23Z"/>
    <path class="cls-39" d="M48.58,129.15c-1.64.23-2.22.11-1.95-1.74.19-1.21-.06-2.43,1.41-2.45a3.72,3.72,0,0,1,3.35,3C51.61,130,49.18,128,48.58,129.15Z"/>
    <path class="cls-40" d="M92.89,126.28c-.51,1.14-1.07,1.67-2,1.68-1.59,0-1.83-1-1.79-2.29,0-.85.21-1.89,1.21-1.68C91.57,124.26,91.19,126.38,92.89,126.28Z"/>
    <path class="cls-41" d="M16.12,123.86a4.39,4.39,0,0,0,.72-1.27c.25-1.45.22-3.25,2.43-2.67,1.17.31.86,1.61.73,2.54-.35,2.4-1.79,2.19-3.45,1.35a1.13,1.13,0,0,0-.49,0Z"/>
  </g>`

d3.json("json/milktea.json").then(gotData1);
