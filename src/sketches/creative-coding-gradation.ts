import 'p5'

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()
  fill(0)

  let gradientFill = drawingContext.createLinearGradient(
    width * 0.5,
    height * 0.0,
    width * 0.5,
    height * 1.0
  )

  gradientFill.addColorStop(0, color('#FFFFFF'))
  gradientFill.addColorStop(0.5, color('#0BA1CC'))
  gradientFill.addColorStop(1, color('#011B42'))
  drawingContext.fillStyle = gradientFill
  rect(0, 0, width, height)
}

window.draw = () => {
  circle(100, 100, 100)
}
