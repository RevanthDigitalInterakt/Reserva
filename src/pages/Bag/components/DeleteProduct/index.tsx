import React, { useCallback } from 'react';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { Alert } from '../../../../components/Alert/Alert';
import ReactMoE,{MoEProperties} from 'react-native-moengage';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';

export default function DeleteProductModal() {
  const { deleteProductModal, loadingModal, actions } = useBagStore([
    'actions',
    'loadingModal',
    'deleteProductModal',
  ]);
 const { productDetail} = useProductDetailStore(['productDetail']);
 
  const handleDeleteProduct = useCallback(async () => {
    if (!deleteProductModal.deleteInfo) return;

    EventProvider.logEvent('remove_from_cart', {
      item_id: deleteProductModal.deleteInfo.product?.id,
      item_categories: 'product',
      item_brand: defaultBrand.reserva,
    });
  
    const color= deleteProductModal?.deleteInfo?.product.itemColor;
    const size=deleteProductModal?.deleteInfo?.product.itemSize;
    
    const moeProps = new MoEProperties();
    console.debug("In Delete Cart Item");
    moeProps.addAttribute('skuId', deleteProductModal.deleteInfo.product?.id);
    console.debug(deleteProductModal.deleteInfo.product?.id)
    moeProps.addAttribute('price', deleteProductModal.deleteInfo.product?.sellingPrice.lowPrice || 0);
    console.debug(deleteProductModal.deleteInfo.product?.sellingPrice.lowPrice);
    moeProps.addAttribute('category', productDetail?.categoryTree || []);
    console.debug("product detail",deleteProductModal?.deleteInfo?.product.productCategories || []);
    moeProps.addAttribute('brand', deleteProductModal?.deleteInfo?.product.productCategories[0] || '');
    moeProps.addAttribute('variant', color+"-"+size);
    moeProps.addAttribute('quantity', deleteProductModal?.deleteInfo?.product.quantity || '');
    moeProps.addAttribute('name', deleteProductModal?.deleteInfo?.product.name || '');
    
    
    ReactMoE.trackEvent('RemoveFromCart', moeProps);

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