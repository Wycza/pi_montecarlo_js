let pi;
let pointsInside;
let totalPoints;

function estimatePi() {
  initValues();

  let width = document.getElementById('squareLength').value;
  let context = setCanvas(width);

  drawRectangle(context, width);
  drawCircle(context, width, width / 2);

  for (let i = 0; i < totalPoints; i++) {
    (function (j) {
      let x = Math.ceil(Math.random() * width);
      let y = Math.ceil(Math.random() * width);
      setTimeout(() => {
        calculatePi(x, y, width / 2);
        drawPoint(context, x, y);
      }, (5000 / totalPoints).toPrecision(3) * j); // add some delay to animation
    })(i);
  }
}

function initValues() {
  pi = 0;
  pointsInside = 0;
  totalPoints = +(document.getElementById('totalPoints').value);
}

function setCanvas(width) {
  let canvas = document.getElementById('_canvas');
  canvas.width = width;
  canvas.height = width;

  return context = canvas.getContext('2d');
}

function drawRectangle(context, width) {
  context.fillStyle = "rgba(130,130,230, 0.1)";
  context.fillRect(0, 0, width, width);
  context.strokeRect(0, 0, width, width);
}

function drawCircle(context, width, radius) {
  context.beginPath();
  context.arc(width / 2, width / 2, radius, 0, 2 * Math.PI);
  context.stroke();
  context.fillStyle = "rgba(230,130,130, 0.2)";
  context.fill();
}

function drawPoint(context, x, y) {
  context.beginPath();
  context.arc(x, y, 1, 0, 2 * Math.PI);
  context.stroke();
  context.fillStyle = "rgba(30,30,30, 0.2)";
  context.fill();
}

function calculatePi(x, y, r) {
  let d = Math.sqrt(Math.pow((x - r), 2) + Math.pow((y - r), 2));
  if (d < r) {
    pointsInside++;
  }
  pi = 4 * pointsInside / totalPoints;

  document.getElementById('pi_output').innerText = pi;
}