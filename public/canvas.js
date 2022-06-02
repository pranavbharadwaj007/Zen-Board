let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let pencolor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let mousedown = false;
let tool = canvas.getContext("2d");
tool.strokeStyle = pencolor;
tool.lineWidth = penWidth;

canvas.addEventListener("mousedown", (e) => {
  mousedown = true;
  // beginPath({
  //   x: e.clientX,
  //   y: e.clientY,
  // });
  let data = {
    x: e.clientX,
    y: e.clientY,
  };
  socket.emit("beginPath", data);
});

canvas.addEventListener("mousemove", (e) => {
  if (mousedown) {
    let data = {
      x: e.clientX,
      y: e.clientY,
      color: eraserFlag ? eraserColor : pencolor,
      width: eraserFlag ? eraserWidth : penWidth,
    };
    socket.emit("drawStroke", data);
  }
});

canvas.addEventListener("mouseup", (e) => {
  mousedown = false;
});

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj) {
  tool.strokeStyle = strokeObj.color;
  tool.lineWidth = strokeObj.width;
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.stroke();
}
pencilColor.forEach((colorElem) => {
  colorElem.addEventListener("click", (e) => {
    let color = colorElem.classList[0];
    pencolor = color;
    tool.strokeStyle = pencolor;
  });
});

pencilWidthElem.addEventListener("change", (e) => {
  penWidth = pencilWidthElem.value;
  tool.lineWidth = penWidth;
});
eraserWidthElem.addEventListener("change", (e) => {
  eraserWidth = eraserWidthElem.value;
  tool.lineWidth = eraserWidth;
});

eraser.addEventListener("click", (e) => {
  if (eraserFlag) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    tool.strokeStyle = pencolor;
    tool.lineWidth = penWidth;
  }
});
download.addEventListener("click", (e) => {
  let url = canvas.toDataURL();
  let a = document.createElement("a");
  a.href = url;
  a.download = "whiteb.jpg";
  a.click();
});
socket.on("beginPath", (data) => {
  beginPath(data);
});
socket.on("drawStroke", (data) => {
  drawStroke(data);
});
