let w = 1200;
let h = 800;

let viz = d3.select("#container")
                .append("svg")
                    .attr("width", w)
                    .attr("height", h)
;

let text1 = viz.append("text")
                  .text("Feeling Happy Today?")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 80)
                  .attr("font-weight","bold")
                  .attr("fill", "black")
                  .attr("x", w/2-350)
                  .attr("y", h/2-10)
;
