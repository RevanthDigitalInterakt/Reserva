import React, { useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import IconComponent from '../IconComponent/IconComponent';
import { toggleAnimation } from '../../routes/animations/toggleAnimation';
import { styles } from './styles';
import testProps from '../../utils/testProps';
import { Typography } from '../Typography/Typography';

interface IDropDownItem {
  title: string;
  body: string | React.ReactNode;
  justifyText?: boolean;
}

function DropdownItem({ body, title, justifyText = false }: IDropDownItem) {
  const [showContent, setShowContent] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const handleDropDownPress = () => {
    const animationConfig = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };

    Animated.timing(animationController, animationConfig).start();
    LayoutAnimation.configureNext(toggleAnimation());
    setShowContent(!showContent);
  };

  const chevronTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <>
      <TouchableOpacity
        onPress={handleDropDownPress}
        {...testProps('com.usereserva:id/dropdown_item_presseble_title')}
      >
        <View style={styles.titleContainer}>
          <Typography fontFamily="reservaSansRegular" fontWeight="bold" fontSize={16}>
            {title}
          </Typography>
          <Animated.View style={{ transform: [{ rotateZ: chevronTransform }] }}>
            <IconComponent icon="chevronRight" />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {showContent && (
        <View
          style={styles.contentContainer}
          {...testProps('com.usereserva:id/dropdown_item_content')}
        >
          <Text style={[styles.body, { textAlign: justifyText ? 'justify' : 'left' }]}>
            {body}
          </Text>
        </View>
      )}
    </>
  );
}

export default DropdownItem;
