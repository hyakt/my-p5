import 'p5'
import p5, { Vector } from 'p5'

let dots: Dot[] = []
let dotsNum = 100
let rangeArray = [50, 100, 150]
let range: number

class Dot {
  pos: Vector
  prevPos: Vector
  nextPos: Vector
  seq: number
  step: number

  constructor() {
    this.pos = createVector(random(width), random(height))
    this.prevPos = createVector(random(width), random(height))
    this.nextPos = createVector(
      this.prevPos.x + random(-range, range),
      this.prevPos.y + random(-range, range)
    )
    this.seq = 0.0
    // this.step = 1.0 / (60.0 * 2.0)
    this.step = 1.0 / (60.0 * 2.0)
  }
  move() {
    this.seq += this.step
    if (this.seq > 1.0) {
      range = random(rangeArray)

      let deltaX: number
      if (this.pos.x < 0) {
        deltaX = random(range)
      } else if (this.pos.x > width) {
        deltaX = random(-range)
      } else {
        deltaX = random(-range, range)
      }

      let deltaY: number
      if (this.pos.y < 0) {
        deltaY = random(range)
      } else if (this.pos.y > height) {
        deltaY = random(-range)
      } else {
        deltaY = random(-range, range)
      }

      this.prevPos.set(this.pos)
      this.nextPos.set(this.prevPos.x + deltaX, this.prevPos.y + deltaY)
      this.seq = 0.0
    }
  }
  display() {
    this.pos = p5.Vector.lerp(
      this.prevPos,
      this.nextPos,
      elasticOut(this.seq)
    ) as any as Vector
    circle(this.pos.x, this.pos.y, 12)
  }
}

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  range = random(rangeArray)
  fill(255)
  stroke(255)

  for (let i = 0; i < dotsNum; i++) {
    dots.push(new Dot())
  }
}

window.draw = () => {
  background(0)

  for (let j = 0; j < dots.length; j++) {
    for (let k = 0; k < dots.length; k++) {
      if (
        k != j &&
        dist(dots[j].pos.x, dots[j].pos.y, dots[k].pos.x, dots[k].pos.y) < 150
      ) {
        line(dots[j].pos.x, dots[j].pos.y, dots[k].pos.x, dots[k].pos.y)
      }
    }
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].move()
    dots[i].display()
  }
}

const elasticOut = (x: number): number => {
  return sin(-13 * HALF_PI * (x + 1)) * pow(2, -10 * x) + 1
}
