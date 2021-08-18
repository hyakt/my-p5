import 'p5'
import { Graphics, Vector } from 'p5'

let pg: Graphics
let crystals: Crystal[] = []
const crystalsNum = 50
const step = 0.5

class Crystal {
  rot: Vector
  rotStep: Vector
  w: number
  h: number

  constructor() {
    this.rot = createVector(
      random(-360, 360),
      random(-360, 360),
      random(-360, 360)
    )
    this.rotStep = createVector(
      random(-step, step),
      random(-step, step),
      random(-step, step)
    )
    this.w = random(50, 100)
    this.h = random(200, 800)
  }
  move() {
    this.rot.add(this.rotStep)
  }
  display() {
    texture(pg)
    noStroke()
    push()
    rotateX(this.rot.x)
    rotateY(this.rot.y)
    rotateZ(this.rot.z)
    box(this.w, this.h, this.w)
    pop()
  }
}

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)
  angleMode(DEGREES)

  pg = createGraphics(300, 500)

  pg.noStroke()
  pg.fill(0)

  noStroke()
  fill(0)

  let gradientFill = (
    pg.drawingContext as CanvasRenderingContext2D
  ).createLinearGradient(
    pg.width * 0.5,
    pg.height * 0.0,
    pg.width * 0.5,
    pg.height * 1.0
  )

  gradientFill.addColorStop(0, '#FFFFFF')
  gradientFill.addColorStop(0.5, '#0BA1CC')
  gradientFill.addColorStop(1, '#011B42')
  ;(pg.drawingContext as CanvasRenderingContext2D).fillStyle = gradientFill
  pg.rect(0, 0, pg.width, pg.height)

  for (let i = 0; i < crystalsNum; i++) {
    crystals.push(new Crystal())
  }
}

window.draw = () => {
  background('#e7ecf2')

  lights()
  for (let i = 0; i < crystals.length; i++) {
    crystals[i].move()
    crystals[i].display()
  }
}
