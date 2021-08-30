/// <reference types="p5/global" />

declare const drawingContext

interface Window {
  preload: () => void
  setup: () => void
  draw: () => void
}
