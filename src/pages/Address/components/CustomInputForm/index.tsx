import React from 'react';

import {
  TouchableOpacity, View, Text, ActivityIndicator,
} from 'react-native';
import IconInfoFill from '../../../../../assets/icons/IconInfoFill';
import InputForm from '../InputForm';

import type { IInputForm } from '../InputForm/interface/IInputForm';

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
    <View>
      <View style={customInputTypeStyles.container}>
        <View>
          <InputForm error={error} touched={touched} showMessageError={false} {...rest} />
        </View>
        <TouchableOpacity
          testID={testID}
          onPress={onPress}
          style={customInputTypeStyles.buttonActionSubmit}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.WHITE} />
          ) : (

            <Text style={customInputTypeStyles.textActionButtonSubmit}>{buttonLabel}</Text>
          )}
        </TouchableOpacity>
      </View>
      {error && touched && (
        <View style={customInputTypeStyles.errorContainer}>
          <IconInfoFill />
          <Text style={customInputTypeStyles.errorMessage}>{error}</Text>
        </View>
      )}
    </View>
  );
}
