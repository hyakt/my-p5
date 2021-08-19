import 'p5'
import p5, { Color, Vector } from 'p5'
import easing from '../lib/easing'

let circlesNum = 10
const circles: Circle[] = []
const initialJitter = 6
const aRange = 10
const size = 400
const weight = 40

class Circle {
  size: number
  weight: number
  jitter: number
  initialDist: Vector
  dist: Vector
  prevDist: Vector
  nextDist: Vector

  acc: number
  tStep: number
  t: number
  direction: number
  strokeColor: Color

  constructor() {
    this.size = size
    this.weight = weight
    this.acc = random(-aRange, aRange)
    this.jitter = width / 2

    this.initialDist = createVector(
      random(-initialJitter, initialJitter),
      random(-initialJitter, initialJitter)
    )
    this.dist = createVector(
      random(-this.jitter, this.jitter),
      random(-this.jitter, this.jitter)
    )
    this.prevDist = this.dist.copy()
    this.nextDist = this.initialDist.copy()
    this.direction = random([0, 1])

    this.strokeColor = color(random(100), random(100), 100, 50)
    this.t = 0
    this.tStep = 1 / 100
  }
  move() {
    this.dist = p5.Vector.lerp(
      this.prevDist,
      this.nextDist,
      easing.easeOutElastic(this.t)
    )
    this.t += this.tStep
    // if (this.dist.equals(this.initialDist)) {
    //   this.initialDist = createVector(
    //     random(-initialJitter, initialJitter),
    //     random(-initialJitter, initialJitter)
    //   )
    //   this.nextDist = createVector(
    //     random(-this.jitter, this.jitter),
    //     random(-this.jitter, this.jitter)
    //   )
    // }
    if (this.t > 1.0) {
      this.prevDist.set(this.nextDist)
      this.nextDist.set(this.initialDist)
      this.t = 0.0
    }
  }
  click() {
    this.initialDist = createVector(
      random(-initialJitter, initialJitter),
      random(-initialJitter, initialJitter)
    )
    this.nextDist.set(
      random(-this.jitter, this.jitter),
      random(-this.jitter, this.jitter)
    )
    this.prevDist = this.dist.copy()
    this.t = 0
  }
  display() {
    push()
    stroke(this.strokeColor)
    strokeWeight(this.weight)

    circle(
      width / 2 + this.acc + this.dist.x,
      height / 2 + this.acc + this.dist.y,
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
