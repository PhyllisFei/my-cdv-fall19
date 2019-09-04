window.onload=function(){
  document.getElementById("myBtn").addEventListener("click", drawManySquares);
}

function drawSquare() {
  var node = document.createElement("div");
  //<div>  </div>
  document.getElementById("container").appendChild(node);
}

function drawManySquares(){
  var a = document.getElementById ("myNumber").value;
  for (var i=0; i<a; i++) {
    drawSquare();
  }
}
