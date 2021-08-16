/// <reference types="p5/global" />
import 'p5'

// @ts-expect-error
window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
}

// @ts-expect-error
window.draw = () => {
  background(247)
  let d = 10
  const num = 360

  push()
  translate(width / 2, height / 2)

  noStroke()
  rotate(sin(millis() / 1000))
  for (let j = 0; j < 5; j++) {
    fill(50 * j, 100, 200)

    for (let i = 0; i < num; i++) {
      let R = 40 + 25 * j + 30 * abs(sin(radians(i * 3)))
      let x = R * cos((TWO_PI * i) / num)
      let y = R * sin((TWO_PI * i) / num)

      circle(x, y, d)
    }
  }

  pop()
}
