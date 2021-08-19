import p5, { Color, Vector } from 'p5'

let circlesNum = 20
const circles: Circle[] = []
const initialJitter = 6
const aRange = 10
const size = 400
const weight = 40

function easeOutElastic(x: number): number {
  const c4 = (2 * Math.PI) / 3

  return x === 0
    ? 0
    : x === 1
    ? 1
    : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1
}

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
    this.jitter = width

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
    this.tStep = 1 / 60
  }
  move() {
    this.dist = p5.Vector.lerp(
      this.prevDist,
      this.nextDist,
      easeOutElastic(this.t)
    ) as any as Vector
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

const baseCircle = () => {
  stroke(0)
  strokeWeight(weight)
  circle(width / 2, height / 2, size)
}

function setup() {
  colorMode(HSB, 100)
  noFill()
  createCanvas(window.innerWidth, window.innerHeight)
  for (let i = 0; i < circlesNum; i++) {
    circles.push(new Circle())
  }
  baseCircle()
}

function draw() {
  background('#fff')
  circles.forEach((e) => {
    e.display()
    e.move()
  })
  baseCircle()
}

function mouseClicked() {
  circles.forEach((e) => {
    e.click()
  })
}

window.setup = setup
window.draw = draw
window.mouseClicked = mouseClicked
