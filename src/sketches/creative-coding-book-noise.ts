import 'p5'
import { Color } from 'p5'

let colors: string[] = []

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  colors = [
    'rgba(3, 138, 191, 0.1)',
    'rgba(4, 177, 216, 0.1)',
    'rgba(242, 156, 106, 0.2)',
    'rgba(191, 105, 74, 0.2)',
    'rgba(140, 57, 50, 0.2)',
  ]
  noLoop()
}

window.draw = () => {
  background('#E7ECF2')
  noFill()
  strokeWeight(2)

  let seed = random(1000)

  for (let j = 0; j < 10; j++) {
    noiseSeed(j * 1000 + seed)
    let noiseScale = random(0.00075, 0.002)
    let linesNum = random(100) < 50 ? 10 : 40

    for (let i = 0; i < linesNum; i++) {
      const mycolor = random(colors)
      stroke(mycolor)

      beginShape()
      for (let x = 0; x <= width; x++) {
        let y = map(noise(x * noiseScale, i * 0.01), 0, 1, 0, height)
        vertex(x, y)
      }
      endShape()
    }
  }
}
