export interface IParamsCarrouselMedias {
  width?: number
  height?: number
  images: string[]
  videoThumbnail?: string
  imageIndexActual?: (indexImage: number) => number
  onGoNext?: (next: { image: string; index: number }) => void
  onGoBack?: (back: { image: string; index: number }) => void
}
