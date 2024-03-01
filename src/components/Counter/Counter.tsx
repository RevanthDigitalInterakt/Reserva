import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../Button';
import { counterStyles } from './Counter.styles';

interface CounterProps {
  count: number
  disabledAdd?: boolean
  disabledSub?: boolean
  onClickAdd?: (count: number) => void
  onClickSub?: (count: number) => void
  testID?: string
}

export function Counter({
  count, disabledAdd, disabledSub, onClickAdd, onClickSub, testID,
}: CounterProps) {
  return (
    <View>
      <View style={counterStyles.container}>
        <Button
          testID={`${testID}_sub`}
          height="100%"
          hitSlop={{
            top: 30, left: 30, bottom: 30, right: 10,
          }}
          inline
          disabled={!!disabledAdd}
          onPress={() => {
            if (onClickSub) {
              onClickSub(count - 1);
            }
          }}
        >
          <View style={counterStyles.buttonContainer}>
            <Text style={counterStyles.buttonText}>
              -
            </Text>
          </View>
        </Button>
        <View>
          <Text>
            {count}
          </Text>
        </View>

        <Button
          testID={`${testID}_add`}
          height="100%"
          hitSlop={{
            top: 30, left: 10, bottom: 30, right: 30,
          }}
          inline
          disabled={!!disabledSub}
          onPress={() => {
            if (onClickAdd) {
              onClickAdd(count + 1);
            }
          }}
        >
          <View style={counterStyles.buttonContainer}>
            <Text style={counterStyles.buttonText}>
              +
            </Text>
          </View>
        </Button>
      </View>
    </View>
  );
}
