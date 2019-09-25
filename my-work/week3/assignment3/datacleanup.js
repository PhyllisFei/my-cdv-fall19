d3.json("dataUpdate.json").then(gotData);

let newdata = [];

function gotData(olddata){
  // console.log(olddata);
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
  let viz = d3.select("body")
                  .append("svg")
                      .attr("width", 1500)
                      .attr("height", 800)
                      .style("background-color", "black")
  ;

  let datagroups = viz.selectAll(".groups").data(newdata);
  console.log(newdata);

// append groups
  datagroups.enter()
              .append("g")
              .attr("class", "groups")
                .append("circle")
                  .attr("r", 2)
                  .attr("fill", getColor)
                  .attr("transform", getPos)
  ;
}
