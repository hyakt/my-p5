import 'p5'

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
}

window.draw = () => {
  background(247)
  let d = 30
  const num = 10

  noStroke()
  fill(0)
  rect(0, 0, width / 2, height)

  push()
  translate(width / 2, height / 2)

  for (let i = 0; i < num; i++) {
    let R = 150
    let x = R * cos((TWO_PI * i) / num)
    let y = R * sin((TWO_PI * i) / num)

    if (x > 0) {
      fill(0)
    } else {
      fill(247)
    }
    circle(x, y, d)
  }

  pop()
}
