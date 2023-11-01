import React, { useCallback, useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';

import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import { platformType } from '../../../../utils/platformType';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';

export default function NotFoundProduct() {
  const { productNotFound, actions } = useBagStore(['productNotFound', 'actions']);

  const refs = {
    animatedViewRef: useRef<View>(null),
  };

  const handleSetNotFoundProduct = useCallback(() => {
    actions.CLEAR_PRODUCT_NOT_FOUND();
  }, [actions]);

  useEffect(() => {
    if (refs.animatedViewRef.current) {
      if (refs.animatedViewRef.current.slideInDown) {
        refs.animatedViewRef.current.slideInDown();
      }
    }
  }, [refs.animatedViewRef]);

  return (
    <View
      ref={refs.animatedViewRef}
      testID="com.usereserva:id/NotFoundProduct_container"
      animation="slideInDown"
      useNativeDriver
      style={{
        elevation: 10,
        position: 'absolute',
        right: 0,
        left: 0,
        zIndex: 2,
      }}
    >
      <Box
        minHeight={60}
        bg="white"
        paddingLeft="xxxs"
        py="micro"
        flexDirection="row"
        alignItems="center"
        paddingRight="xxxs"
        boxShadow={Platform.OS === platformType.IOS ? 'topBarShadow' : null}
        style={{ elevation: 10 }}
      >
        <Box flex={1}>
          <Typography
            fontFamily="nunitoRegular"
            fontSize={13}
            color="preto"
          >
            {`${productNotFound}`}
          </Typography>
        </Box>
        <Button testID="com.usereserva:id/NotFoundProduct_setProduct" flex={1} onPress={handleSetNotFoundProduct}>
          <IconLegacy name="Close" size={15} color="preto" ml="xxxs" />
        </Button>
      </Box>
    </View>
  );
}
