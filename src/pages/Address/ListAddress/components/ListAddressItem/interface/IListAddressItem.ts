import type { IAddressData } from '../../../interface/IAddressData';

export interface IListAddressItem {
  item: IAddressData;
  animationListController(listItemId: string): void;
  onNavigate(id: string): void;
  onShowModalConfirmDelete(value: string): void;
  mainAddress: string | null | undefined;
}
