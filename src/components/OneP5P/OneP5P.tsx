import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageComponent from '../ImageComponent/ImageComponent';
import images from '../../base/styles/icons';
import { FONTS } from '../../base/styles/fonts';
import { COLORS } from '../../base/styles/colors';
import { scale } from '../../utils/scale';

interface I1P5PProps {
  comingFrom: string;
  itemQuantity?: number;
}

function OneP5P({ comingFrom, itemQuantity }: I1P5PProps) {
  const { navigate } = useNavigation();

  const mealsAmount = itemQuantity ? itemQuantity * 5 : 0;
  const isComingFromPdp = useMemo(() => comingFrom === 'PDP', [comingFrom]);

  if (comingFrom === 'home') {
    return (
      <View style={{ alignItems: 'center', paddingHorizontal: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ImageComponent
            style={{ width: 125, height: 125 }}
            source={images.green1p5p}
          />
          <View style={{ flex: 1, maxWidth: '70%' }}>
            <Text style={{ fontSize: 12, fontFamily: FONTS.RESERVA_SANS_REGULAR, textAlign: 'center' }}>
              A cada peça vendida 5 pratos são complementados através da ONG Mesa Brasil.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            padding: 15,
            borderRadius: 8,
            marginTop: -30,
          }}
          onPress={() => navigate('PageOneP5P', { comeFrom: 'Home' })}
        >
          <Text style={{ fontSize: 14, fontFamily: FONTS.RESERVA_SANS_BOLD, textAlign: 'center' }}>Saiba mais sobre o projeto</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: 'center',
        marginBottom: -30,
        marginTop: isComingFromPdp ? -20 : 24,
        height: 50,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <ImageComponent
          style={{ width: 100, height: 100 }}
          source={images.black1p5p}
        />
        <View
          style={{
            alignSelf: 'center',
            width: 1,
            height: 30,
            backgroundColor: COLORS.LIGHT_GRAY,
            marginHorizontal: 15,
          }}
        />
        <View style={{ flex: 1, maxWidth: '70%' }}>
          {comingFrom === 'PDP' ? (
            <Text style={{ fontSize: scale(8.5), fontFamily: FONTS.RESERVA_SANS_REGULAR, textAlign: 'center' }}>
              Ao comprar essa peça você está doando 5 pratos de comida
              para quem tem fome. Saiba mais no menu do app.
            </Text>
          )
            : (
              <Text style={{ fontSize: 12, fontFamily: FONTS.RESERVA_SANS_REGULAR, textAlign: 'center' }}>
                Na sua compra você acaba de doar
                {' '}
                {mealsAmount}
                {' '}
                pratos de comida para quem mais precisa. Muito obrigado.
              </Text>
            )}
        </View>
      </View>
    </View>
  );
}

export default OneP5P;
