import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native-animatable';
import {
  Box, Button, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import { Platform } from 'react-native';
import { platformType } from '../../../../utils/platformType';
import useBagStore from '../../../../zustand/useBagStore/useBagStore';

export default function NotFoundProduct() {
  const { productNotFound, dispatch } = useBagStore();

  const refs = {
    animatedViewRef: useRef<View>(null),
  };

  const handleSetNotFoundProduct = useCallback(() => {
    dispatch({
      payload: {
        value: {
          productNotFound: '',
        },
      },
      actionType: 'SET_PRODUCT_NOT_FOUND',
    });
  }, [dispatch]);

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
          <Icon name="Close" size={15} color="preto" ml="xxxs" />
        </Button>
      </Box>
    </View>
  );
}
