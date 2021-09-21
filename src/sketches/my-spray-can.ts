import 'p5'

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noLoop()
}

function draw() {
  stroke(0)
  rect(50, 30, 50, 140)
  ellipse(75, 30, 50, 25)
  arc(75, 60, 50, 25, 0, PI)
  ellipse(75, 170, 50, 25)
  erase()
  rect(50, 150, 50, 20)
}

window.setup = setup
window.draw = draw
