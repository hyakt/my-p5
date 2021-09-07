import 'p5'
import { Color, Image } from 'p5'

abstract class Fabric {
  private width: number
  private height: number
  protected texture: Image
  private fabric: Image
  private color: Color

  constructor(width: number, height: number, color: Color) {
    this.height = height
    this.width = width
    this.color = color
    this.texture = createImage(width, height)
    this.fabric = createImage(width, height)
    this.setup()
  }

  setup() {
    this.generateTexture()
    this.dye()
    this.generateFabric()
  }

  dye() {
    this.fabric.loadPixels()
    for (let i = 0; i < this.fabric.width; i++) {
      for (let j = 0; j < this.fabric.height; j++) {
        this.fabric.set(i, j, this.color)
      }
    }
    this.fabric.updatePixels()
  }

  generateFabric() {
    this.fabric.blend(
      this.texture,
      0,
      0,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height,
      MULTIPLY
    )
  }

  image() {
    return this.fabric
  }

  abstract generateTexture(): void
}

class Cotton extends Fabric {
  generateTexture() {
    this.texture.loadPixels()
    for (let i = 0; i < this.texture.width; i++) {
      for (let j = 0; j < this.texture.height; j++) {
        this.texture.set(i, j, color(random([200, 255])))
      }
    }
    this.texture.updatePixels()
  }
}

class Linen extends Fabric {
  generateTexture() {
    this.texture.loadPixels()
    for (let i = 0; i < this.texture.width; i++) {
      for (let j = 0; j < this.texture.height; j++) {
        let pixcel = color(200)
        if (i % 2 === 0 && j % 2 === 0) {
          pixcel = color(255)
        }
        this.texture.set(i, j, pixcel)
      }
    }
    this.texture.updatePixels()
  }
}

class Polyester extends Fabric {
  generateTexture() {
    this.texture.loadPixels()
    for (let i = 0; i < this.texture.width; i++) {
      for (let j = 0; j < this.texture.height; j++) {
        let pixcel = color(200)
        if (i % 2 === 0) {
          pixcel = color(255)
        }
        this.texture.set(i, j, pixcel)
      }
    }
    this.texture.updatePixels()
  }
}

let linen: Fabric

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  const Clazz = random([Cotton, Linen, Polyester])

  linen = new Clazz(
    100,
    100,
    color(random(0, 255), random(0, 255), random(0, 255))
  )
  noLoop()
}

function draw() {
  image(linen.image(), 0, 0)
}

window.setup = setup
window.draw = draw
