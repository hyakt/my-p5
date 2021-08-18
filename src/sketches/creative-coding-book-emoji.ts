/// <reference types="p5/global" />
import 'p5'
import { Graphics } from 'p5'

let boxSize: number
let pg: Graphics
let emoji, emojiCode

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)
  boxSize = min(width, height) * 0.475
  pg = createGraphics(400, 400)
  pg.background(200, 200, 200)
  pg.textAlign(CENTER, CENTER)
}

window.draw = () => {
  background(0)
  // const emojiCode = random(127744, 128306)
  emojiCode = random(100) < 70 ? random(127744, 128306) : random(128512, 128592)
  emoji = String.fromCodePoint(floor(emojiCode))

  pg.textSize(random(40, 100))
  pg.text(emoji, random(width), random(height))

  lights()
  noStroke()
  texture(pg)
  rotateX(frameCount * 0.01)
  rotateY(frameCount * 0.01)
  rotateZ(frameCount * 0.01)
  box(boxSize)
}
