import 'p5'
import p5, { Color, Renderer, Vector } from 'p5'

let circlesNum = 10
const circles: Circle[] = []
let baseCircle: Circle
let cnv: Renderer
const initialRange = 6
const aRange = 10
const size = 400
const weight = 40

class Circle {
  size: number
  weight: number
  vector: Vector
  a: number
  tStep: number
  seq: number
  direction: number
  strokeColor: Color

  constructor() {
    this.size = size
    this.weight = weight
    this.a = random(-aRange, aRange)
    this.vector = createVector(
      random(-initialRange, initialRange),
      random(-initialRange, initialRange),
      0
    )
    this.strokeColor = color(random(100), random(100), 100, 50)

    this.seq = 0
    this.tStep = random(0, 0.1)
    this.direction = random([0, 1])
  }
  move() {
    this.seq += this.tStep
  }
  click() {}
  display() {
    push()
    stroke(this.strokeColor)
    strokeWeight(this.weight)

    let deltaX: number
    let deltaY: number
    if (this.direction) {
      deltaX = sin(this.seq) * this.a
      deltaY = cos(this.seq) * this.a
    } else {
      deltaX = cos(this.seq) * this.a
      deltaY = sin(this.seq) * this.a
    }

    circle(
      width / 2 + deltaX + this.vector.x,
      height / 2 + deltaY + this.vector.y,
      this.size
    )
    pop()
  }
}

window.setup = () => {
  colorMode(HSB, 100)
  noFill()
  createCanvas(window.innerWidth, window.innerHeight)
  for (let i = 0; i < circlesNum; i++) {
    circles.push(new Circle())
  }
}

window.draw = () => {
  background('#fff')
  circles.forEach((e) => {
    e.display()
    e.move()
  })
  stroke(0)
  strokeWeight(weight)
  circle(width / 2, height / 2, size)
}

window.mouseClicked = () => {
  circles.forEach((e) => {
    e.click()
  })
}
