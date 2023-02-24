import React from 'react';
import {
  Image, ImageBackground, Modal, Text, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '@usereservaapp/reserva-ui/src/components/Typography';

interface IBannerMktplace {
  texto: string
  logo: string
  bannerMobile: string
  linkApp: string
  open: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const BannerMktplace = ({
  texto, logo, bannerMobile, open, setOpenModal, linkApp,
}: IBannerMktplace) => {
  const t = texto.split('**');
  const navigation = useNavigation();

  function navigateToLp(reference: string) {
    navigation.navigate('ProductCatalog', {
      referenceId: reference,
    });
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={open}
      onRequestClose={() => setOpenModal(false)}
      onDismiss={() => setOpenModal(false)}
    >
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onTouchStart={() => { setOpenModal(false); }}
      >
        <View
          style={{
            backgroundColor: '#FFF',
            width: '90.7%',
            borderRadius: 5,
          }}
          onTouchStart={(e) => { e.stopPropagation(); }}
        >
          <View style={{
            width: '100%',
            height: 189,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
          >
            <ImageBackground
              source={{ uri: `https://lojausereserva.vteximg.com.br/arquivos/${bannerMobile}` }}
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}
            >
              <View
                onTouchStart={() => { setOpenModal(false); }}
                style={{
                  padding: 16,
                }}
              >
                <Image
                  source={{ uri: 'https://lojausereserva.vteximg.com.br/arquivos/icon-close.png' }}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
          <View style={{
            width: 108,
            height: 108,
            backgroundColor: '#F1F1F1',
            borderRadius: 108 / 2,
            borderWidth: 10,
            borderColor: '#FFF',
            marginTop: -54,
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Image
              source={{ uri: `https://lojausereserva.vteximg.com.br/arquivos/${logo}` }}
              style={{
                width: 68,
                height: 68,
              }}
            />
          </View>

          <Typography
            fontSize={14}
            textAlign="center"
            fontFamily="reservaSansRegular"
            style={{
              padding: 22,
              lineHeight: 20,
            }}
          >
            {t.map((i) => {
              if (t.indexOf(i) > 0 && t.indexOf(i) % 2 !== 0) {
                return (<Typography fontFamily="reservaSansBold">{i}</Typography>);
              } return (i);
            })}
          </Typography>

          <Text
            onPress={() => { navigateToLp(linkApp); }}
            style={{
              textDecorationLine: 'underline',
              fontSize: 12,
              fontWeight: 'bold',
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            Ver mais dessa marca

          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default BannerMktplace;
