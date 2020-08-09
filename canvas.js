var ctx;
var canvas;

var isDrawing = false;
var latestPosition;

var canvasOffset;
var offsetX;
var offsetY;

function init() {
    console.log("Dibujando...");
    canvas = document.getElementById("devoff-canvas");
    ctx = canvas.getContext('2d');
    canvasOffset=$("#devoff-canvas").offset();
    offsetX = canvasOffset.left;
    offsetY = canvasOffset.top;
    $('#devoff-canvas').mousedown(beginStroke);
    $('#devoff-canvas').mousemove(stroke);
    $('#devoff-canvas').mouseup(endStroke);

}

function extractMousePos(e) {
    let pos = {};
    pos.x = e.pageX - offsetX;
    pos.y = e.pageY - offsetY;
    return pos;
}

function beginStroke(position) {
    console.log("Bajo el pincel");
    isDrawing = true;
    latestPosition = extractMousePos(position);
}

function stroke(position) {
    console.log("Muevo el pincel");
    let currentPosition = extractMousePos(position);
    if(isDrawing) {
        drawline(latestPosition, currentPosition);
        latestPosition = currentPosition;
    }
}

function endStroke() {
    console.log("Subo el pincel");
    isDrawing = false;
}

function pickColor(color) {
    ctx.strokeStyle = color;
}

function drawline(p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.closePath();
    ctx.stroke();
}

function save() {
    var a = document.createElement('a');

    a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    a.download = "devoff.png";
    a.style = "display: none;"

    document.body.appendChild(a);
    a.click();
}