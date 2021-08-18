import 'p5'
import { Color } from 'p5'

let circlesNum = 10
const circles: Circle[] = []

class Circle {
  size: number
  weight: number
  x: number
  y: number
  d: number

  strokeColor: Color

  constructor(dValue?: number, colorValue?: Color) {
    this.size = 500
    this.weight = 70
    this.x = 0
    this.y = 0
    this.d = dValue === 0 ? dValue : random(-10, 10)
    this.strokeColor = colorValue
      ? colorValue
      : color(random(100), random(100), 100)
  }
  move() {}
  display() {
    push()
    stroke(this.strokeColor)
    strokeWeight(this.weight)
    circle(width / 2 + this.d, height / 2 + this.d, this.size)
    pop()
  }
}

window.setup = () => {
  colorMode(HSB, 100)
  createCanvas(window.innerWidth, window.innerHeight)
  for (let i = 0; i < circlesNum; i++) {
    circles.push(new Circle())
  }
  circles.push(new Circle(0, color(0)))
}

window.draw = () => {
  circles.forEach((e) => {
    e.display()
  })
}
