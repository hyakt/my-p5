import 'p5'

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  noLoop()
}

window.draw = () => {
  background('#E7ECF2')
  noFill()
  beginShape()
  for (let x = 0; x <= width; x++) {
    let y = map(noise(x * 0.0015), 0, 1, 0, height)
    vertex(x, y)
  }
  endShape()
}
