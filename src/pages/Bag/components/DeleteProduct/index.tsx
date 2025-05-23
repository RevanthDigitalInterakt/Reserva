import React, { useCallback } from 'react';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { Alert } from '../../../../components/Alert/Alert';
import ReactMoE,{MoEProperties} from 'react-native-moengage';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { toProperCase } from '../../../../utils/properCase';

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

    const discount=(((deleteProductModal?.deleteInfo?.product.price) || 0)/100) - ((deleteProductModal.deleteInfo.product?.sellingPrice || 0)/100);
    console.debug("print discount",discount);
    const discount_decimal = Math.round(discount * 100) / 100;

    
      const rawCategoryTree: string[] =deleteProductModal?.deleteInfo?.product.productCategories  || [];

        const productCategory = rawCategoryTree.map((name, index) => ({
          id: (index + 1).toString(),
          name: name,
        }));

    const moeProps = new MoEProperties();
    console.debug("In Delete Cart Item");
    moeProps.addAttribute('skuId', deleteProductModal.deleteInfo.product?.id);
    console.debug(deleteProductModal.deleteInfo.product?.id)
 //   moeProps.addAttribute('price', deleteProductModal.deleteInfo.product?.sellingPrice || 0);
    console.debug(deleteProductModal.deleteInfo.product?.sellingPrice || 0);
    moeProps.addAttribute('price',  ((deleteProductModal?.deleteInfo?.product.price || 0) /100));
    console.debug('price',(deleteProductModal?.deleteInfo?.product.price || 0) /100);
    moeProps.addAttribute('discount',discount_decimal);
    moeProps.addAttribute('category',JSON.stringify(productCategory));
  //  console.debug("product category detail",);
    moeProps.addAttribute('brand', deleteProductModal?.deleteInfo?.product.productCategories[0] || '');
    moeProps.addAttribute('productSize',size.toUpperCase());
    moeProps.addAttribute('productColor',toProperCase(color));
    moeProps.addAttribute('quantity', deleteProductModal?.deleteInfo?.product.quantity || '');
    moeProps.addAttribute('name', deleteProductModal?.deleteInfo?.product.name || '');
    moeProps.addAttribute('productId', deleteProductModal?.deleteInfo?.product.productId || '');

   // console.debug( "prod ref id",deleteProductModal?.deleteInfo?.product.productRefId);
    
  // moeProps.addAttribute('productRefId', deleteProductModal?.deleteInfo?.product.productRefId ||'');

    //moeProps.addAttribute('referenceId');

    //moeProps.addAttribute('detailUrl');
    
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