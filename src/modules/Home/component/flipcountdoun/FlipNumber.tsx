import React from 'react';
import { View, StyleSheet } from 'react-native';

import NumberCard from './NumberCard';

interface IFlipNumber {
    number: any;
    unit: 'hours' | 'minutes' | 'seconds';
    size: number;
    perspective: number;
}
function FlipNumber({
    number, unit, size, perspective,
}: IFlipNumber) {
    number = parseInt(number);
    let previousNumber;
    previousNumber = number - 1;
    if (unit !== 'hours') {
        previousNumber = previousNumber === -1 ? 0 : previousNumber;
    } else {
        previousNumber = previousNumber === -1 ? 0 : previousNumber;
    }
    number = number < 10 ? `0${number}` : number;
    previousNumber = previousNumber < 10 ? `0${previousNumber}` : previousNumber;

    const numberSplit = number.toString();
    const previousNumberSplit = previousNumber.toString();
    return (
        <View style={style.wrapper}>
            <NumberCard
                number={numberSplit}
                previousNumber={previousNumberSplit}
                size={size}
                perspective={perspective}
            />
        </View>
    );
}

export default FlipNumber;

const style = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
});
