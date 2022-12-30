import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform
} from 'react-native';
import { theme } from "@usereservaapp/reserva-ui";
interface ICard {
    type: 'upper' | 'lower';
    size: number;
    number: any;
    colorDivider: string;
}
function Card({
    type, size, number, colorDivider
}: ICard) {
    return (
        <View style={[style.card, { borderColor: colorDivider, borderBottomColor: colorDivider }, type === 'upper' ? { borderBottomWidth: 0.5 } : { borderTopWidth: 0.5 }]}>
            <Text style={[style.number, {
                transform: [type === 'upper' ? { translateY: size * 0.23 } : { translateY: -size * 0.23 }],
                fontSize: size / 1.8,
                lineHeight: Platform.OS === 'android' ? size / 1.85 : size / 1.65,
                fontFamily: theme.fonts.reservaSansBold,
            }]}
            >
                {number}
            </Text>
        </View>
    );
}

export default Card;
const style = StyleSheet.create({
    card: {
        margin: 0,
        padding: 0,
        flex: 0.5,
        paddingLeft: 4,
        paddingRight: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1f1f1f',
        borderBottomColor: '#1f1f1f',
        overflow: 'hidden',
    },
    number: {
        color: '#FFF',
    }
});

