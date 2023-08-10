import type { IAddressData } from '../../../interface/IAddressData';

export interface IListAddressItem {
  item: IAddressData;
  animationListController(listItemId: string): void;
  onNavigate(): void;
  onShowModalConfirmDelete(value: string): void;
}
