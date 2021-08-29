import 'p5'
import { Graphics, Image } from 'p5'

let myPhoto: Image
let myPhotoWidth: number
let myPhotoHeight: number

function preload() {
  // myPhoto = loadImage(
  //   'https://dl.dropboxusercontent.com/s/0l5f4vdul64yfgz/image.png'
  // )
  myPhoto = loadImage(
    'https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png'
  )
}

function setup() {
  myPhoto.loadPixels()
  myPhotoWidth = myPhoto.width
  myPhotoHeight = myPhoto.height
  createCanvas(window.innerWidth, window.innerHeight)
  smooth()
  noStroke()
  // noLoop()
}

function draw() {
  fill(255)
  rect(0, 0, width, height)
  for (let x = 0; x < myPhotoWidth; x = x + 10) {
    for (let y = 0; y < myPhotoHeight; y = y + 10) {
      const pixelIndex = (x + y * myPhotoWidth) * 4
      const c = color(
        myPhoto.pixels[pixelIndex],
        myPhoto.pixels[pixelIndex + 1],
        myPhoto.pixels[pixelIndex + 2],
        myPhoto.pixels[pixelIndex + 3]
      )
      fill(c)
      const posX = map(x, 0, myPhotoWidth, 0, width)
      const posY = map(y, 0, myPhotoHeight, 0, height)

      let size = 10
      if (
        posX - size / 2 < mouseX &&
        mouseX < posX + size / 2 &&
        posY - size / 2 < mouseY &&
        mouseY < posY + size / 2
      ) {
        size = 50
      }
      circle(posX, posY, size)
    }
  }
}

window.preload = preload
window.setup = setup
window.draw = draw
