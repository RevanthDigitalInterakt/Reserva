export interface ImageSliderProps {
  images: string[]
  onGoNext?: (next: { image: string; index: number }) => void
  onGoBack?: (back: { image: string; index: number }) => void
  width?: number
  height?: number
  imageIndexActual?: (indexImage: number) => number
}
