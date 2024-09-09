import React, { useEffect, useRef } from 'react';
import {
  View, Text,
  Animated,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '../../../../components/Divider/Divider';
import styles from './styles';
import testProps from '../../../../utils/testProps';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import EventProvider from '../../../../utils/EventProvider';

interface IPersonalizeComponent { fvcReferenceProduct: string }

export default function Personalize({ fvcReferenceProduct }: IPersonalizeComponent) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const navigate = useNavigation();

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4],
    outputRange: ['red', 'pink', 'yellow', 'green', 'blue', 'green', 'yellow', 'pink'],
  });

  const redirectWebview = () => {
    EventProvider.logEvent('pdp_button_rainbow_fvc', {});
    navigate.navigate('FacaVc', { type: fvcReferenceProduct });
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => redirectWebview()}
        {...testProps('com.usereserva:id/pdp_button_rainbow_fvc')}
      >
        <Animated.View style={[StyleSheet.absoluteFill, styles.animatedView, { borderColor }]} />
        <IconComponent icon="personalize" />
        <Text style={styles.buttonText}>PERSONALIZE DO SEU JEITO</Text>
      </TouchableOpacity>
      <Text style={styles.externalText}>
        Agora você pode personalizar esta peça com um texto ou uma imagem. Experimente!
      </Text>
      <Divider variant="fullWidth" my="xs" />
    </View>
  );
}
