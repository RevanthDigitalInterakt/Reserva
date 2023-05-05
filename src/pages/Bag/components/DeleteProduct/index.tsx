/* eslint-disable */

import React, { useCallback } from 'react';
import { Alert } from '@usereservaapp/reserva-ui';
import useBagStore from '../../../../zustand/useBagStore/useBagStore';

export default function DeleteProductModal() {
  const { deleteProductModal, showLoadingModal, dispatch } = useBagStore();

  const handleCloseModal = useCallback(() => {
    dispatch({
      actionType: 'HANDLE_CLOSE_MODAL_DELETE_PRODUCT',
      payload: { value: {} },
    });
  }, [dispatch]);

  const handleDeleteProduct = useCallback(() => {
    if (!deleteProductModal.deleteInfo) return;

    dispatch({
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
