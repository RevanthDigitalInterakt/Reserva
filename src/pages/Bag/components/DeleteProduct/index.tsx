import React, { useCallback } from 'react';
import { Alert } from '@usereservaapp/reserva-ui';
import useBagStore from '../../../../zustand/useBagStore/useBagStore';
import EventProvider from '../../../../utils/EventProvider';

export default function DeleteProductModal() {
  const { deleteProductModal, showLoadingModal, dispatch } = useBagStore();

  const handleCloseModal = useCallback(() => {
    dispatch({
      actionType: 'HANDLE_CLOSE_MODAL_DELETE_PRODUCT',
      payload: { value: {} },
    });
  }, [dispatch]);

  const handleDeleteProduct = useCallback(async () => {
    if (!deleteProductModal.deleteInfo) return;

    await dispatch({
      actionType: 'SET_TOP_BAR_LOADING',
      payload: {
        value: { topBarLoading: true },
      },
    });

    EventProvider.logEvent('remove_from_cart', {
      item_id: deleteProductModal.deleteInfo.product?.id,
      item_categories: 'product',
    });

    await dispatch({
      actionType: 'HANDLE_UPDATE_PRODUCT_COUNT',
      payload: {
        value: {
          index: deleteProductModal.deleteInfo.index,
          item: deleteProductModal.deleteInfo.product,
          countUpdated: 0,
          isDeleted: true,
        },
      },
    });

    handleCloseModal();
  }, [deleteProductModal, dispatch, handleCloseModal]);

  return (
    // @ts-ignore
    // @Todo Remover todas props obrigatorias do component Alert
    <Alert
      isVisible={deleteProductModal.show}
      title="Excluir produto"
      subtitle="Tem certeza que deseja excluir o produto salvo em sua sacola?"
      confirmText="SIM"
      cancelText="NÃO"
      disabled={showLoadingModal}
      onConfirm={handleDeleteProduct}
      onCancel={handleCloseModal}
      onClose={handleCloseModal}
    />
  );
}
