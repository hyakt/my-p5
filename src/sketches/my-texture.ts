import 'p5'
import { Graphics, Image } from 'p5'

let overAllTexture: Graphics
let myPhoto: Image

function setup() {
  createCanvas(400, 400)
  myPhoto = loadImage(
    'https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png'
  )
  smooth()
}

function draw() {
  myPhoto.loadPixels()

  // background(200)
  // fill(10)
  // rect(0, 0, width, height)
  // fill(0, 100, 200)
  // circle(100, 100, 100)
  // push()
  // overAllTexture = createGraphics(width, height)
  // overAllTexture.loadPixels()
  // for (var i = 0; i < width + 50; i++) {
  //   for (var o = 0; o < height + 50; o++) {
  //     overAllTexture.set(
  //       i,
  //       o,
  //       color(100, noise(i / 3, o / 3, (i * o) / 50) * random([0, 50, 100]))
  //     )
  //   }
  // }
  // overAllTexture.updatePixels()
  // blendMode(MULTIPLY)
  // image(overAllTexture, 0, 0)
  // pop()
}

window.setup = setup
window.draw = draw
