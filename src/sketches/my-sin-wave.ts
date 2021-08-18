import 'p5'

window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
}

window.draw = () => {
  background(247)
  let num = width
  translate(0, height / 2)

  for (let i = 0; i < num; i++) {
    let R = height / 2
    stroke('#0ff')
    let y = R * cos((TWO_PI * i) / num)
    point(i, y)
  }

  for (let i = 0; i < num; i++) {
    let R = height / 2
    stroke('#f0f')
    let y = R * sin((TWO_PI * i) / num)
    point(i, y)
  }
}
