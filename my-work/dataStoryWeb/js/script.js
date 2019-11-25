d3.json("adults.json").then(gotData);

let w = 1500;
let h = 900;
let col = 50;

let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
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


function gotData(incomingData){
  incomingData = fixJSDateObjects(incomingData);
  console.log(incomingData);

  let adultsData = incomingData[0];

  let data = adultsData;

  let xDomain = d3.extent(adultsData, function(d){ return d.year });

//year slider
  var slider = d3
    .sliderBottom()
    .min(d3.min(xDomain))
    .max(d3.max(xDomain))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(900)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(xDomain)
    // .default(new Date(1975, 10, 3))
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
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

// scrolling event listener
// you might move this block into the part of your code
// in which your data is loaded/available
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



// function to adjust viz height dynamically
// in order to keep the heightRatio at any given
// width of the browser window
function adjustVizHeight(){
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
