//
let viz = d3.select("#viz-container")
                  .append("svg")
                      .attr("id", "viz") //
                      .attr("width", 800)
                      .attr("height", 800)
;
// // current sslelction: <svg></svg>
//
// viz.attr("height", 500);
//
let myCircle = viz.append("circle")
            .attr("cx", 200)
            .attr("cy", 100)
            .attr("r", 50)
;
//
myCircle.attr("fill","white");
//
// let myRect = viz.append("rect")
//                           .attr("x", 400)
//                           .attr("y", 400)
//                           .attr("width", 400)
//                           .attr("height", 400)
// ;
//
// myRect.attr("fill", "green");
let myData = [3, 6, 8, 1, 5];
let circels = viz.selectAll("circle").data(myData);
// 1 4


circels.exit().remove();

circels.enter().append("circle")
                            .attr("cx", 120)
                            .attr("cy", 400)
                            .attr("r", 20)
;

circels.attr("fill", "red");
//
