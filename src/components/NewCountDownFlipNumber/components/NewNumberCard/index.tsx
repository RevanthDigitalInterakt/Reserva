import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import testProps from '../../../../utils/testProps';
import { NewFlipCard } from '../NewFlipCard';
import styles from './styles';
import MatrixHelper from '../../../../utils/MatrixHelper';
import { Card } from './components/Card';

const { width } = Dimensions.get('window');
const size = width / 8;

interface NumberCardProps {
  number: string;
  previousNumber: string;
  perspective: number;
  clockBackgroundColor?: string;
  colorDivider?: string;
}
export function NewNumberCard({
  number,
  perspective = 250,
  previousNumber,
  clockBackgroundColor,
  colorDivider,
}: NumberCardProps) {
  const [rotateFront] = useState(new Animated.Value(0));
  const [rotateBack] = useState(new Animated.Value(-180));
  const frontRef = useRef(null);
  const backRef = useRef(null);

  const transformRef = (
    ref: {
      setNativeProps: (arg0: {
        style: { transform: { matrix: any }[] };
      }) => void;
    } | null,
    deg: number,
    y: number,
  ) => {
    const matrix = MatrixHelper.createIdentityMatrix();
    MatrixHelper.translateMatrix(matrix, { x: 0, y, z: 0 });
    MatrixHelper.perspectiveMatrix(matrix, perspective);
    MatrixHelper.rotateXMatrix(matrix, deg);
    MatrixHelper.untranslateMatrix(matrix, { x: 0, y, z: 0 });
    if (ref) {
      ref.setNativeProps({
        style: { transform: [{ matrix }] },
      });
    }
  };

  const animateTrick = () => {
    rotateFront.setValue(0);
    rotateBack.setValue(-180);
    Animated.parallel([
      Animated.timing(rotateFront, {
        toValue: 180,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(rotateBack, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    rotateFront.addListener(({ value }) => {
      transformRef(frontRef.current, value, size * 0.23);
    });

    rotateBack.addListener(({ value }) => {
      transformRef(backRef.current, value, -size * 0.23);
    });
    return () => {
      rotateFront.removeAllListeners();
      rotateBack.removeAllListeners();
    };
  }, [rotateFront, rotateBack, frontRef, backRef, size]);

  useEffect(() => {
    animateTrick();
  }, [previousNumber]);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: clockBackgroundColor || styles.container.backgroundColor,
      }}
      {...testProps('com.usereserva:id/number_card_container')}
    >
      <Card
        testID="com.usereserva:id/number_card_type_upper_card"
        type="upper"
        number={previousNumber}
        colorDivider={colorDivider}
      />
      <Card
        testID="com.usereserva:id/number_card_type_lower_card"
        type="lower"
        number={number}
        colorDivider={colorDivider}
      />
      <NewFlipCard
        testID="com.usereserva:id/number_card_type_front_flip_card"
        ref={frontRef}
        type="front"
        number={number}
        colorDivider={colorDivider}
        clockBackgroundColor={clockBackgroundColor}
      />
      <NewFlipCard
        testID="com.usereserva:id/number_card__type_back_flip_card"
        ref={backRef}
        type="back"
        number={previousNumber}
        colorDivider={colorDivider}
        clockBackgroundColor={clockBackgroundColor}
      />
    </View>
  );
}
