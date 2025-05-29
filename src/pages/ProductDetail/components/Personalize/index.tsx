import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '../../../../components/Divider/Divider';
import styles from './styles';
import testProps from '../../../../utils/testProps';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import EventProvider from '../../../../utils/EventProvider';

interface IPersonalizeComponent {
  fvcReferenceProduct: string;
}

export default function Personalize({ fvcReferenceProduct }: IPersonalizeComponent) {
  const navigate = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const OneSecond = 1000;
  const FiveSeconds = 5 * 1000;

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(OneSecond),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const intervalId = setInterval(animateScale, FiveSeconds);
    return () => clearInterval(intervalId);
  }, []);

  const redirectWebview = () => {
    EventProvider.logEvent('pdp_button_rainbow_fvc', {});
    navigate.navigate('FacaVc', { type: fvcReferenceProduct });
  };

  const animatedButtonStyle = {
    transform: [{ scale: scaleAnim }],
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: scaleAnim.interpolate({
      inputRange: [1, 1.08],
      outputRange: [3, 3],
    }),
    shadowOpacity: scaleAnim.interpolate({
      inputRange: [1, 1.08],
      outputRange: [0, 0.3],
    }),
    elevation: scaleAnim.interpolate({
      inputRange: [1, 1.08],
      outputRange: [0, 3],
    }),
  };

  return (
    <View>
      <Animated.View style={[styles.animatedView, animatedButtonStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={redirectWebview}
          {...testProps('com.usereserva:id/pdp_button_rainbow_fvc')}
        >
          <IconComponent icon="personalize" />
          <Text style={styles.buttonText}>PERSONALIZE DO SEU JEITO</Text>
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.externalText}>
        Agora você pode personalizar esta peça. Experimente!
      </Text>
      <Divider variant="fullWidth" my="xs" />
    </View>
  );
}
