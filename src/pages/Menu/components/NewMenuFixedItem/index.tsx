import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import testProps from '../../../../utils/testProps';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import type { TIcons } from '../../../../base/styles';
import styles from './styles';

interface INewFixedMenuItemProps {
  iconName: TIcons;
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  testID: string;
}

function NewFixedMenuItem({
  iconName,
  title,
  onPress,
  disabled,
  testID,
}: INewFixedMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      {...testProps(testID)}
    >
      <View style={styles.container}>
        <IconComponent
          style={styles.icon}
          icon={iconName}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default NewFixedMenuItem;
