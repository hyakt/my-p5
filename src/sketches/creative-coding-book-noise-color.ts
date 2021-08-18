import 'p5'

let w = 10
let h = 20
let xNum: number, yNum: number

const noiseScale = 0.1
const palette = ['#6AFBD0', '#0AA18B', '#0B6C62', '#062C2E']

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  xNum = width / w
  yNum = height / h
}

window.draw = () => {
  noStroke()
  for (let i = 0; i < xNum; i++) {
    for (let j = 0; j < yNum; j++) {
      let n = noise(i * noiseScale, j * noiseScale, frameCount * 0.01)
      // let n = random(0.5, 1)
      let c = palette[floor((n * 10) % palette.length)]
      // let c = lerpColor(color(palette[0]), color(palette[3]), n)

      fill(c)
      rect(i * w, j * h, w, h)
    }
  }
}
