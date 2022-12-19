import React from 'react';
import { Animated, View, Text, StyleSheet, Platform } from 'react-native';
import { theme } from "@usereservaapp/reserva-ui";

interface IFlipCard {
    setRef: any;
    type: 'front' | 'back';
    size: number;
    number: any;
    clockBackgroundColor: string;
    colorDivider: string;
}

function FlipCard({
    setRef,
    type,
    size,
    number,
    clockBackgroundColor,
    colorDivider
}: IFlipCard) {
    return (
        <Animated.View
            ref={setRef}
            style={[style.flipCard,
            {
                backgroundColor: clockBackgroundColor,
                borderColor: colorDivider,
                borderBottomColor: colorDivider
            },
            type === 'front'
                ? {
                    top: 0,
                    borderTopLeftRadius: size / 10,
                    borderTopRightRadius: size / 10,
                    borderBottomWidth: 0.5,
                }
                : {
                    top: '50%',
                    borderBottomLeftRadius: size / 10,
                    borderBottomRightRadius: size / 10,
                    borderTopWidth: 0.5,
                },
            ]}
        >
            <View style={[style.overflowContainer, { width: size, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[style.number, {
                    transform: [type === 'front' ? { translateY: size * 0.23 } : { translateY: -size * 0.23 }],
                    fontSize: size / 1.8,
                    lineHeight: Platform.OS === 'android' ? size / 1.85 : size / 1.65,
                    fontFamily: theme.fonts.reservaSansBold,
                }]}
                >
                    {number}
                </Text>
            </View>
        </Animated.View>
    );
}

export default FlipCard;

const style = StyleSheet.create({
    overflowContainer: {
        overflow: 'hidden',
    },
    number: {
        color: '#FFF',
    },
    flipCard: {
        paddingLeft: 4,
        paddingRight: 4,
        position: 'absolute',
        left: 0,
        height: '50%',
        width: '100%',
        backgroundColor: '#1A1A1A',
        borderColor: '#1f1f1f',
        backfaceVisibility: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
