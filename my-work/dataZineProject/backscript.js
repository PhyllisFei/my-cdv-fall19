let w = 1200;
let h = 800;

let viz = d3.select("#container")
                .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .style("background-color", "black")
;

let title = viz.append("text")
                  .text("How to Read Me ...")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 50)
                  .attr("font-weight","bold")
                  .attr("fill", "white")
                  .attr("x", 80)
                  .attr("y", 100)
;
let content1 = viz.append("text")
                    .text(" I collected my laughter caused by")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 30)
                    .attr("fill", "white")
                    .attr("x", w/2-200)
                    .attr("y", 160)
;
let content2 = viz.append("text")
                    .text("4 groups of people,")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 30)
                    .attr("fill", "white")
                    .attr("x", w/2-110)
                    .attr("y", 220)
;
let content3 = viz.append("text")
                    .text("every 2 hours from 8am to 8pm,")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 30)
                    .attr("fill", "white")
                    .attr("x", w/2-170)
                    .attr("y", 280)
;
let content4 = viz.append("text")
                    .text("in 2 weeks from Sep 9th to 22nd.")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", 30)
                    .attr("fill", "white")
                    .attr("x", w/2-180)
                    .attr("y", 340)
;
let subt1 = viz.append("text")
                  .text("* “Matrix” Graph")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 30)
                  .attr("fill", "white")
                  .attr("x", 100)
                  .attr("y", 420)
;
let expl1 = viz.append("text")
                  .text("Visualizes numbers and causes of my laughter break down into 14 days.")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 25)
                  .attr("fill", "white")
                  .attr("x", 140)
                  .attr("y", 480)
;
let subt2 = viz.append("text")
                  .text("* Area Graph")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 30)
                  .attr("fill", "white")
                  .attr("x", 100)
                  .attr("y", 540)
;
let expl2 = viz.append("text")
                  .text("Visualizes trend and cumulated totals of my laughter over 14 days.")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 25)
                  .attr("fill", "white")
                  .attr("x", 140)
                  .attr("y", 600)
;
let subt3 = viz.append("text")
                  .text("* Each color represents one cause of my laughter")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 20)
                  .attr("fill", "white")
                  .attr("x", 100)
                  .attr("y", 660)
;

let circle1 = viz.append("circle")
                      .attr("r", 7)
                      .attr("fill", "lightblue")
                      .attr("cx", 160)
                      .attr("cy", 694)
;
let text1 = viz.append("text")
                    .text("Family")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", "20")
                    .attr("stroke", "lightblue")
                    .attr("x", 180)
                    .attr("y", 700)
;

let circle2 = viz.append("circle")
                  .attr("r", 7)
                  .attr("fill", "pink")
                  .attr("cx", 300)
                  .attr("cy", 694)
;
let text2 = viz.append("text")
                    .text("Friends")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", "20")
                    .attr("stroke", "pink")
                    .attr("x", 320)
                    .attr("y", 700)
;
let circle3 = viz.append("circle")
                  .attr("r", 7)
                  .attr("fill", "lightgreen")
                  .attr("cx", 440)
                  .attr("cy", 694)
;
let text3 = viz.append("text")
                    .text("Professors")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", "20")
                    .attr("stroke", "lightgreen")
                    .attr("x", 460)
                    .attr("y", 700)
let circle4 = viz.append("circle")
                  .attr("r", 7)
                  .attr("fill", "orange")
                  .attr("cx", 580)
                  .attr("cy", 694)
;
let text4 = viz.append("text")
                    .text("Strangers")
                    .attr("font-family", "Mansalva")
                    .attr("font-size", "20")
                    .attr("stroke", "orange")
                    .attr("x", 600)
                    .attr("y", 700)
;

// let circle5 = viz.append("circle")
//                   .attr("r", 10)
//                   .attr("fill", "gray")
//                   .attr("cx", 150)
//                   .attr("cy", 701)
// ;
// let text5 = viz.append("text")
//                     .text("Alone")
//                     .attr("font-family", "Mansalva")
//                     .attr("font-size", "30")
//                     .attr("stroke", "gray")
//                     .attr("x", 180)
//                     .attr("y", 710)
