import type { ProductGiftCardOptionOutput } from '../../../../../../base/graphql/generated';

export interface GiftCardListProps {
  list: ProductGiftCardOptionOutput[]
  onSelect: (option: ProductGiftCardOptionOutput) => void;
}

export interface GiftCardOptionProps {
  onSelect: (option: ProductGiftCardOptionOutput) => void;
  option: ProductGiftCardOptionOutput;
}
