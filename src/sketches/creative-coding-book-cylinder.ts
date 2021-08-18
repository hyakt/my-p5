import 'p5'
import { Color } from 'p5'

let rects: Rect[] = []

const detailXarray = [4, 5, 7]
const palette = ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff']
const cylinderCount = 50

class Rect {
  rectPosition: { x: number; y: number; z: number }
  rotateDegrees: { x: number; y: number; z: number }
  t: number
  tStep: number
  cylinderRadius: number
  cylinderHeight: number
  cylinderDetailX: number
  fillColor: Color

  constructor() {
    this.rectPosition = {
      x: random(-width / 2, width / 2),
      y: random(-height / 2, height / 2),
      z: random(0, 50),
    }
    this.rotateDegrees = {
      x: random(360),
      y: random(360),
      z: random(360),
    }
    this.cylinderRadius = random(30, 50)
    this.cylinderHeight = this.cylinderRadius / 2
    this.cylinderDetailX = random(detailXarray)
    this.t = 0
    this.tStep = random(0.25, 1.0)
    // this.tStep = 1
    this.fillColor = color(random(palette))
  }
  move() {
    this.t += this.tStep
  }
  display() {
    fill(this.fillColor)

    push()
    const { x, y, z } = this.rectPosition
    translate(x + sin(this.t) * 100, y + cos(this.t) * 100, z + sin(this.t))
    rotateX(this.rotateDegrees.x + this.t)
    rotateY(this.rotateDegrees.y + this.t)
    rotateZ(this.rotateDegrees.z)

    cylinder(this.cylinderRadius, this.cylinderHeight, this.cylinderDetailX, 1)
    pop()
  }
}

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)
  angleMode(DEGREES)
  // noLoop()
  frameRate(30)
  for (let i = 0; i < cylinderCount; i++) {
    rects.push(new Rect())
  }
}

window.draw = () => {
  background('#E7ECF2')

  lights()
  noStroke()

  rects.forEach((e) => {
    e.display()
    e.move()
  })
}
