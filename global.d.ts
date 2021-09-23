/// <reference types="p5/global" />

declare const drawingContext

function erase(): void
function noErase(): void

interface Window {
  preload: () => void
  setup: () => void
  draw: () => void
}
