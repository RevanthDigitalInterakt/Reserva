import { StyleSheet } from 'react-native';

export const ListVerticalProductsStyles = () => {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

  });

  const productDetails = (thumbColors: boolean) => {
    const stylesCustom = StyleSheet.create({
      productDetails: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: thumbColors ? 375 : 353,
        marginVertical: 32,
      },
    });

    return stylesCustom.productDetails;
  };

  return {
    ...styles,
    productDetails,
  };
};
