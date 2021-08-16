/// <reference types="p5/global" />
import 'p5'

// @ts-expect-error
window.setup = () => {
  createCanvas(window.innerWidth, window.innerHeight)
}

// @ts-expect-error
window.draw = () => {
  circle(100, 100, 100)
}
