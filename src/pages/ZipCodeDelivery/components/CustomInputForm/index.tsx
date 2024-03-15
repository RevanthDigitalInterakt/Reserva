import React from 'react';

import {
  TouchableOpacity, View, Text, ActivityIndicator,
} from 'react-native';
import InputForm from '../../../../components/InputForm';

import type { IInputForm } from '../../../../components/InputForm/interface/IInputForm';

import { customInputTypeStyles } from './styles/CustomInputForm.styles';
import { COLORS } from '../../../../base/styles';

type ICustomInputTypeProps = IInputForm & {
  onPress: () => void
  testID: string
  buttonLabel: string,
  loading: boolean
};

export default function CustomInputForm({
  onPress,
  testID,
  buttonLabel,
  error,
  touched,
  loading,
  ...rest
}: ICustomInputTypeProps): JSX.Element {
  return (
    <View style={{ flexDirection: 'row' }}>

      <View style={{ flex: 1, height: 70 }}>
        <InputForm error={error} touched={touched} {...rest} />

      </View>

      <View>
        <TouchableOpacity
          testID={testID}
          activeOpacity={0.9}
          onPress={onPress}
          style={customInputTypeStyles.buttonActionSubmit}
        >
          <View>
            {loading ? (
              <View>
                <ActivityIndicator style={{ height: 18 }} color={COLORS.WHITE} />
              </View>
            ) : (

              <Text style={customInputTypeStyles.textActionButtonSubmit}>{buttonLabel}</Text>
            )}
          </View>

        </TouchableOpacity>
      </View>

    </View>
  );
}
