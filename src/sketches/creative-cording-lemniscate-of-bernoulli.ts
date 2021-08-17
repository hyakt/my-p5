/// <reference types="p5/global" />
import 'p5'
import { Color } from 'p5'

let particles: Particle[] = []
let particlesNum = 500
let palette = ['#04E762', '#F5B700', '#DC0073', '#008BF8']

class Particle {
  x: number
  y: number
  t: number
  tStep: number
  a: number
  d: number
  fillColor: Color

  constructor() {
    this.x = 0
    this.y = 0
    this.t = random(360)
    // this.t = 360
    this.tStep = random(0.25, 1.0)
    // this.tStep = 1
    this.a = 300 + random(-70, 70)
    this.d = random(5, 30)
    // this.a = 300
    this.fillColor = color(random(palette))
  }
  move() {
    this.t += this.tStep
  }
  display() {
    this.x =
      width / 2 + (this.a * sqrt(2) * cos(this.t)) / (sq(sin(this.t)) + 1)
    this.y =
      height / 2 +
      (this.a * sqrt(2) * cos(this.t) * sin(this.t)) / (sq(sin(this.t)) + 1)

    fill(this.fillColor)
    circle(this.x, this.y, this.d)
  }
}

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  angleMode(DEGREES)
  noStroke()
  for (let i = 0; i < particlesNum; i++) {
    particles.push(new Particle())
  }
}

window.draw = () => {
  background(255)
  for (let i = 0; i < particles.length; i++) {
    particles[i].move()
    particles[i].display()
  }
}
