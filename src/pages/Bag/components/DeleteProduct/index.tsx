import React, { useCallback } from 'react';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { Alert } from '../../../../components/Alert/Alert';

export default function DeleteProductModal() {
  const { deleteProductModal, loadingModal, actions } = useBagStore([
    'actions',
    'loadingModal',
    'deleteProductModal',
  ]);

  const handleDeleteProduct = useCallback(async () => {
    if (!deleteProductModal.deleteInfo) return;

    EventProvider.logEvent('remove_from_cart', {
      item_id: deleteProductModal.deleteInfo.product?.id,
      item_categories: 'product',
      item_brand: defaultBrand.reserva,
    });

    await actions.UPDATE_PRODUCT_COUNT(
      deleteProductModal.deleteInfo.index,
      deleteProductModal.deleteInfo.product,
      0,
    );

    actions.CLOSE_MODAL_DELETE_PRODUCT();
  }, [deleteProductModal, actions]);

  return (
    <Alert
      isVisible={deleteProductModal.show}
      title="Excluir produto"
      subtitle="Tem certeza que deseja excluir o produto salvo em sua sacola?"
      confirmText="SIM"
      cancelText="NÃO"
      disabled={loadingModal}
      onConfirm={handleDeleteProduct}
      onCancel={actions.CLOSE_MODAL_DELETE_PRODUCT}
      onClose={actions.CLOSE_MODAL_DELETE_PRODUCT}
    />
  );
}
