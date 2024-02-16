import React from 'react';

import { TouchableOpacity, View, Text } from 'react-native';
import { addZipCodeDeliveryStyles } from './AddZipCodeDelivery.styles';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import type { TIcons } from '../../../../base/styles';

type TAddZipCodeDelivery = {
  label: string;
  description?: string
  icon?: TIcons;
  onPress: () => void;
};

export default function AddZipCodeDelivery({
  label, description, icon = 'infoSuccess', onPress,
}: TAddZipCodeDelivery) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={addZipCodeDeliveryStyles.buttonContainer}>
        <View style={addZipCodeDeliveryStyles.labelWrap}>
          <IconComponent icon={icon} style={addZipCodeDeliveryStyles.iconRight} />
          <View>
            <Text style={addZipCodeDeliveryStyles.textTitle}>
              {label}
            </Text>
            {description && (
              <Text style={addZipCodeDeliveryStyles.textDescription}>
                {description}
              </Text>
            )}
          </View>
        </View>
        <IconComponent icon="chevronRight" />
      </View>
    </TouchableOpacity>
  );
}
