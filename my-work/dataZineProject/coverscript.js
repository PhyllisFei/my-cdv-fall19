let w = 1200;
let h = 800;

let viz = d3.select("#container")
                .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .style("background-color", "#FAF7E1")
;

let text1 = viz.append("text")
                  .text("Feeling Happy Today?")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 80)
                  .attr("font-weight","bold")
                  .attr("fill", "#76767A")
                  .attr("x", w/2-350)
                  .attr("y", h/2-20)
;
let text2 = viz.append("text")
                  .text("CDV Fall 2019")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 35)
                  .attr("fill", "#76767A")
                  .attr("x", w-350)
                  .attr("y", h-265)
;
let text3 = viz.append("text")
                  .text("Data Zine Project")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 35)
                  .attr("fill", "#76767A")
                  .attr("x", w-400)
                  .attr("y", h-205)
;
let text4 = viz.append("text")
                  .text("Phyllis Fei")
                  .attr("font-family", "Mansalva")
                  .attr("font-size", 35)
                  .attr("fill", "#76767A")
                  .attr("x", w-270)
                  .attr("y", h-145)
;

// var d = document.getElementById("img");
// document.body.appendChild(d);
//   d.style.position = "absolute";
//   d.style.left = 35+'%';
//   d.style.top = 18+'%';
