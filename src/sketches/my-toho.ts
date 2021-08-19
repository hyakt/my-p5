import 'p5'
import { Color } from 'p5'

let circlesNum = 10
const circles: Circle[] = []
const initialJitter = 6
const aRange = 10
const size = 400
const weight = 40

type Dist = {
  x: number
  y: number
}

class Circle {
  size: number
  weight: number
  initialDist: Dist
  dist: Dist
  acc: number
  tStep: number
  t: number
  direction: number
  strokeColor: Color

  constructor() {
    this.size = size
    this.weight = weight
    this.acc = random(-aRange, aRange)
    this.initialDist = {
      x: random(-initialJitter, initialJitter),
      y: random(-initialJitter, initialJitter),
    }
    this.dist = this.initialDist
    this.direction = random([0, 1])

    this.strokeColor = color(random(100), random(100), 100, 50)
    this.t = 0
    this.tStep = random(0, 0.1)
  }
  move() {
    this.t += this.tStep
  }
  click() {}
  display() {
    push()
    stroke(this.strokeColor)
    strokeWeight(this.weight)

    let deltaX: number
    let deltaY: number
    if (this.direction) {
      deltaX = sin(this.t)
      deltaY = cos(this.t)
    } else {
      deltaX = cos(this.t)
      deltaY = sin(this.t)
    }

    circle(
      width / 2 + deltaX * this.acc + this.dist.x,
      height / 2 + deltaY * this.acc + this.dist.y,
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
