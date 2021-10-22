import {
  Box,
  Button,
  ProductHorizontalListCard,
  ProductHorizontalListCardProps,
  theme,
  Typography,
} from "reserva-ui";
import Modal from "react-native-modal";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

import LottieView from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";
import { animations } from "../../../assets";
import { ThemeConsumer } from "styled-components/native";
import { useEffect } from "react";
import { Dimensions, Platform, SafeAreaView, StatusBar } from "react-native";
import { position } from "styled-system";
import DeviceInfo, { hasNotch } from "react-native-device-info";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const haveNotch = DeviceInfo.hasNotch();

export interface ModalBagProps {
  isVisible: boolean;
  onBackdropPress: () => void;
}

export const ModalBag = ({ isVisible, onBackdropPress }: ModalBagProps) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [animation, setAnimation] = useState<AnimatedLottieView | null>(null);
  const [products, setProducts] = React.useState<any>([]);
  const [count, setCount] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    if (animation && isVisible) {
      animation?.play();
    }
  }, [animation, isVisible]);

  return (
    <Box>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setAnimationFinished(false);
          onBackdropPress();
        }}
        backdropColor={
          !animationFinished && isVisible ? theme.colors.preto : "transparent"
        }
        animationInTiming={300}
        animationIn="fadeIn"
        animationOut="fadeIn"
      >
        {!animationFinished && (
          <LottieView
            style={{ flex: 1 }}
            onAnimationFinish={() => {
              setAnimationFinished(true);
            }}
            ref={(animation) => {
              setAnimation(animation);
            }}
            loop={false}
            source={animations.bag}
          />
          // ) : (
          // <Box flex={1} alignSelf={animationFinished ? "center" : "flex-end"}>
          //   <Box
          //     width={321}
          //     top={
          //       haveNotch && Platform.OS == "ios"
          //         ? Number(StatusBar.currentHeight) + 77
          //         : Platform.OS == "android"
          //         ? Number(StatusBar.currentHeight)
          //         : Number(StatusBar.currentHeight) + 51
          //     }
          //     py="xxxs"
          //     pl="xxxs"
          //     right={-25}
          //     height={351}
          //     backgroundColor="white"
          //     style={{ elevation: Platform.OS == "android" ? 5 : 0 }}
          //     boxShadow={Platform.OS == "android" ? null : "topBarShadow"}
          //   >
          //     <Animatable.View animation="fadeIn" style={{ height: "100%" }}>
          //       <Box marginBottom="micro">
          //         <Typography fontFamily="reservaSerifRegular" fontSize="20px">
          //           Sacola ({count})
          //         </Typography>
          //       </Box>
          //       <ScrollView>
          //         {products?.map((product, key) => (
          //           <Box mt={key > 0 ? "micro" : null} key={key}>
          //             <ProductHorizontalListCard
          //               currency={"R$"}
          //               discountTag={product.discountTag > 0 ? product.discountTag : undefined }
          //               itemColor={product.color || ''}
          //               ItemSize={product.size || ''}
          //               productTitle={product.title}
          //               installmentsNumber={product.installmentNumber}
          //               installmentsPrice={product.installmentPrice}
          //               price={product.fullPrice}
          //               priceWithDiscount={product.discountPrice}
          //               count={product.quantity}
          //               onClickClose={() => {}}
          //               imageSource={product.imagesUrls?.length && product.imagesUrls[0] || ''}
          //              />
          //           </Box>
          //         ))}
          //       </ScrollView>
          //       <Button
          //         onPress={() => {
          //           setAnimationFinished(false);
          //           onBackdropPress();
          //           navigation.navigate("DeliveryScreen");
          //         }}
          //         title="FECHAR PEDIDO"
          //         variant="primarioEstreito"
          //         inline
          //         mx="md"
          //         mt="xxxs"
          //       />
          //     </Animatable.View>
          //   </Box>
          // </Box>
        )}
      </Modal>
    </Box>
  );
};
