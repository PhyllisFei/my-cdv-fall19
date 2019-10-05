/***** filtered data *****/
let newdata = [];

function gotData(olddata){
  for(let i=0; i<olddata.length; i++){
    let d = olddata[i];
    let date = d.date;

    for (let j=0; j<d.family; j++){
      let value = d.family;
      let newd = {date: date, value: value}
      newdata.push(newd);
    }
  }
  console.log(newdata);

/***** line chart *****/
  var margin = {top: 150, right: 100, bottom: 100, left: 100},
      width = 1000,
      height = 500;

  let viz = d3.select("#container")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
  var x = d3.scaleTime()
        .domain( [ 0, newdata.date] )
        .range([ 0, width ]);
      viz.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

// Add Y axis
  var y = d3.scaleLinear()
    .domain( [0, newdata.value] )
    .range([ height, 0 ]);
  viz.append("g")
    .call(d3.axisLeft(y));

// Add the line
  viz.append("path")
    .datum(newdata)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function d(d) { return x(newdata.date) })
      .y(function d(d) { return x(newdata.value) })
      )
}

function d(d){
    return { date : d3.timeParse("%Y-%m-%d")(newdata.date), value : newdata.value };
  }

d3.json("laughter.json").then(gotData);
