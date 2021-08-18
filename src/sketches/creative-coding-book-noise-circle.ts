import 'p5'
import { Color } from 'p5'

let zoff = 0
let colorA: Color, colorB: Color

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  angleMode(DEGREES)
  colorA = color('#0CCBCFAA')
  colorB = color('#FE68B5AA')
  noFill()
  background('#E7ECF2')
}

window.draw = () => {
  stroke(lerpColor(colorA, colorB, abs(sin(frameCount * 0.5))))
  beginShape()
  for (let t = 0; t < 360; t++) {
    let xoff = map(cos(t), -1, 1, 0, 1)
    let yoff = map(sin(t), -1, 1, 0, 1)
    let n = noise(xoff, yoff, zoff)
    let r = map(n, 0, 1, 0, height * 1.5)
    let x = r * cos(t) + width / 2
    let y = r * sin(t) + height / 2
    vertex(x, y)
  }
  endShape(CLOSE)

  zoff += 0.005
}
