import 'p5'
import { Color, Vector } from 'p5'

const colors = ['#F2B84B', '#D97904', '#D95E32', '#F27979']
const backgroundColor = '#E8E9EB'
let cans: Can[] = []

class Can {
  pos: Vector
  color: Color
  scale: number
  delta: number

  constructor(color: Color, pos: Vector, scale: number, delta: number) {
    this.color = color
    this.pos = pos
    this.scale = scale
    this.delta = delta
  }

  move() {
    if (this.pos.x > width) {
      this.pos = createVector(0, this.pos.y)
      return
    }
    this.pos = createVector(this.pos.x + this.delta, this.pos.y)
  }

  draw() {
    push()
    scale(this.scale)
    translate(this.pos)
    const lc = lerpColor(color(255), this.color, 0.5)
    fill(this.color)
    stroke(lc)
    rect(0, 0, 50, 140)
    ellipse(25, 0, 50, 25)
    arc(25, 30, 50, 25, 0, PI)
    arc(25, 140, 50, 25, 0, PI)
    noStroke()
    rect(2, 120, 46, 20)
    fill(lc)
    stroke(lc)
    ellipse(25, 95, 30, 60)
    pop()
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  for (let i = 0; i < 4; i++) {
    const c = color(random(colors))
    for (let j = 0; j < width / 10; j++) {
      const x = i % 2 === 0 ? j * (width / 10) : j * (width / 10) + 40
      const y = i * (height / 4) + 20
      const pos = createVector(x, y)
      const delta = i % 2 === 0 ? 2 : -2
      cans.push(new Can(c, pos, 0.8, delta))
    }
  }
}

function draw() {
  background(color(backgroundColor))
  cans.forEach((e) => {
    e.move()
    e.draw()
  })
}

window.setup = setup
window.draw = draw
