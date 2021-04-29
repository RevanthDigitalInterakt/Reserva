import React, { useState } from "react";
import { Dimensions, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView } from "react-native";
import { Box, Button, Icon, ProductHorizontalListCard, Typography, Image } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { images } from "../../../assets";

const screenWidth = Dimensions.get('window').width;

export const WishListCategory: React.FC<{}> = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <ScrollView>
        <TopBarBackButton showShadow={true} />
        <Box paddingX="micro" marginTop="xs" >
          <Box marginTop="xxxs">
            <Typography fontSize={20} fontFamily="reservaSerifRegular">
              Lista de desejos
            </Typography>
          </Box>
          <Box marginTop="xxxs" flexDirection="row">
            <Button
              width={153}
              color="preto"
              height={32}
              marginRight="xxs"
              onPress={() => navigation.navigate("WishList")}
              borderColor="preto"
              borderWidth={1}
              title="Todos os items"
            /> 
            <Button
              width={153}
              height={32}
              color="white"
              fontSize={12}
              bg="neutroFrio2"
              title="Minhas categorias"
            /> 
          </Box>
        </Box>
        <Box 
          paddingX="xxs" 
          paddingY="xxs"
          bg="backgroundMenuOpened" 
          width="100%" 
          height="100%"
          flexDirection="column"
          marginTop="xxs"
        >
          <Box
            paddingX="xxxs" 
            paddingY="xxxs"
            style={{ elevation: 5 }}
            bg="white"
          >
          <Box flexDirection="row" justifyContent="space-between">
            <Typography fontFamily="reservaSerifRegular" fontSize={16}>
              Camisas
            </Typography>
            <Icon color="preto" name="ChevronRight" size={16} />
          </Box>
          <Box flexDirection="row">
            <Typography fontFamily="nunitoRegular" fontSize={12}>
              itens(5)
            </Typography>
          </Box>
          <Box flexDirection="row" marginTop="xxxs">
            <Box marginRight="micro">
              <Image 
                source={images.shirt1}
                height={97}
                width={(screenWidth - 116) / 4 }
              />
            </Box>
            <Box marginRight="micro">
              <Image 
                source={images.shirt1}
                height={97}
                width={(screenWidth - 116) / 4 }
              />
            </Box>
            <Box marginRight="micro">
              <Image 
                source={images.shirt1}
                height={97}
                width={(screenWidth - 116) / 4 }
              />
            </Box>
            <Box marginRight="micro">
              <Image 
                source={images.shirt1}
                height={97}
                width={(screenWidth - 116) / 4 }
              />
            </Box>
          </Box>
        </Box>
        <Box
            paddingX="xxxs" 
            paddingY="xxxs"
            marginTop="xxs"
            style={{ elevation: 5 }}
            bg="white"
          >
          <Box flexDirection="row" justifyContent="space-between">
            <Typography fontFamily="reservaSerifRegular" fontSize={16}>
              Sapatos
            </Typography>
            <Icon color="preto" name="ChevronRight" size={16} />
          </Box>
          <Box flexDirection="row">
            <Typography fontFamily="nunitoRegular" fontSize={12}>
              itens(2)
            </Typography>
          </Box>
          <Box flexDirection="row" marginTop="xxxs">
            <Box marginRight="micro">
              <Image 
                source={images.shirt1}
                height={97}
                width={(screenWidth - 116) / 4 }
              />
            </Box>
            <Box marginRight="micro">
              <Image 
                source={images.shirt2}
                height={97}
                width={(screenWidth - 116) / 4 }
              />
            </Box>
          </Box>
        </Box>
        <Box
          paddingX="xxxs" 
          paddingY="xxxs"
          marginTop="xxs"
          style={{ elevation: 5 }}
          bg="white"
        >
          <Box flexDirection="row" justifyContent="space-between">
            <Typography fontFamily="reservaSerifRegular" fontSize={16}>
              Camisas
            </Typography>
            <Icon color="preto" name="ChevronRight" size={16} />
          </Box>
          <Box flexDirection="row">
            <Typography fontFamily="nunitoRegular" fontSize={12}>
              itens(5)
            </Typography>
          </Box>
          <Box flexDirection="row" marginTop="xxxs"><Box marginRight="micro">
              <Image 
                source={images.shirt1}
                height={97}
                width={(screenWidth - 116) / 4 }
              />
            </Box>
            <Box marginRight="micro">
              <Image 
                source={images.shirt1}
                height={97}
                width={(screenWidth - 116) / 4 }
              />
            </Box>
            <Box marginRight="micro">
              <Image 
                source={images.shirt1}
                height={97}
                width={(screenWidth - 116) / 4 }
              />
            </Box>
            <Box marginRight="micro">
              <Image 
                source={images.shirt1}
                height={97}
                width={(screenWidth - 116) / 4 }
              />
            </Box>
          </Box>
        </Box>
      </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
