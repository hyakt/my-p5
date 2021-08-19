import 'p5'
import p5, { Color, Vector } from 'p5'

let rings: Ring[] = []
let ringsNum = 50
let cylinderMaxWidth: number
let range = 50
let rangeArray = [30, 60, 90, 120, 150, 180]
const palette = [
  'rgba(3, 138, 191, 0.5)',
  'rgba(4, 177, 216, 0.5)',
  'rgba(242, 156, 106, 0.5)',
  'rgba(191, 105, 74, 0.5)',
  'rgba(140, 57, 50, 0.5)',
]

function easeInOutCirc(x: number): number {
  return x < 0.5
    ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
    : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
}

class Ring {
  cylinderRadius: number
  cylinderHeight: number
  angle: Vector
  prevAngle: Vector
  nextAngle: Vector
  angleStep: Vector
  fillColor: Color
  seq: number
  step: number

  constructor() {
    this.cylinderRadius = random(cylinderMaxWidth * 0.25, cylinderMaxWidth)
    this.cylinderHeight = random(
      cylinderMaxWidth * 0.03,
      cylinderMaxWidth * 0.125
    )
    this.angle = createVector()
    this.prevAngle = createVector(
      random(-360, 360),
      random(-360, 360),
      random(-360, 360)
    )
    this.nextAngle = createVector(
      this.prevAngle.x + random(-range, range),
      this.prevAngle.y + random(-range, range),
      this.prevAngle.z + random(-range, range)
    )
    this.seq = 0
    this.step = 1 / 60.0
    this.angleStep = createVector(0.25, 0.25, 0.25)
    this.fillColor = color(random(palette))
  }
  move() {
    this.angle = p5.Vector.lerp(
      this.prevAngle,
      this.nextAngle,
      easeInOutCirc(this.seq)
    ) as any as Vector
    this.seq += this.step
    if (this.seq > 1.0) {
      this.prevAngle.set(this.angle)
      this.nextAngle.set(
        this.prevAngle.x + random(-range, range),
        this.prevAngle.y + random(-range, range),
        this.prevAngle.z + random(-range, range)
      )
      this.seq = 0.0
      range = random(rangeArray)
    }
  }
  display() {
    fill(this.fillColor)
    push()
    rotateX(this.angle.x)
    rotateY(this.angle.y)
    rotateZ(this.angle.z)
    cylinder(this.cylinderRadius, this.cylinderHeight, 24, 1, false, false)
    pop()
  }
}

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)

  angleMode(DEGREES)
  noStroke()
  cylinderMaxWidth = min(width, height) * 0.43
  for (let i = 0; i < ringsNum; i++) {
    rings.push(new Ring())
  }
}

window.draw = () => {
  background('#ccc')
  lights()
  for (let i = 0; i < ringsNum; i++) {
    rings[i].move()
    rings[i].display()
  }
}
