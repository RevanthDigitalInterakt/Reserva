export interface ProductDetailCardProps {
  currency?: string
  images: string[]
  discountTag?: number
  saleOff?: string
  title: string
  giftCardFirstPriceOption?: string
  installmentsNumber: number
  installmentsPrice: number
  price: number
  priceWithDiscount?: number
  imagesWidth?: number
  imagesHeight?: number
  isFavorited?: boolean
  showZoomButton?: boolean
  loadingFavorite?: boolean
  onClickFavorite?: (favoriteState: boolean) => void
  onClickShare?: () => void
  onGoNextImage?: (next: { image: string; index: number }) => void
  onGoBackImage?: (back: { image: string; index: number }) => void
  setModalZoom?(): void
  imageIndexActual?: (indexImage: number) => number
  avaibleUnits?: number;
  testID?: string;
  videoThumbnail?: string;
  fvcProductReference?: string;
}
