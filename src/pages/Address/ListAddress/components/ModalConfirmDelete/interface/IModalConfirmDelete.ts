export interface IModalConfirmDelete {
  showModal: boolean;
  onCloseModal(): void;
  onDeleteAddress(id: string): void;
  addressID: string;
}
