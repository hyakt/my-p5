/// <reference types="p5/global" />

declare const drawingContext

function erase(): void

interface Window {
  preload: () => void
  setup: () => void
  draw: () => void
}
