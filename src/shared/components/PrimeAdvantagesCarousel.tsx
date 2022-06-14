import React, { useRef } from 'react';
import {
    Dimensions,
    TouchableHighlight,
    Animated,
    StyleSheet,
} from 'react-native';
import { Box, Image } from '@danilomsou/reserva-ui';

const DEVICE_WIDTH = Dimensions.get('window').width;

interface IPrimeAdvantagesCarousel {
    prime: any;
    onPress: () => void;
}

export const PrimeAdvantagesCarousel = ({
    prime,
    onPress
}: IPrimeAdvantagesCarousel) => {

    const primeMokado = [
        {
            image: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/4KVDPRc9AVQERWwuBSkkk/c4b786e5480eb986ff22e4e2d95d528e/banner-card-app-namorados-camisetas.jpg"
            }
        },
        {
            image: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/4KVDPRc9AVQERWwuBSkkk/c4b786e5480eb986ff22e4e2d95d528e/banner-card-app-namorados-camisetas.jpg"
            }
        },
        {
            image: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/4KVDPRc9AVQERWwuBSkkk/c4b786e5480eb986ff22e4e2d95d528e/banner-card-app-namorados-camisetas.jpg"
            }
        }
    ]
    const myCards = primeMokado
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <Box>
            <Box>
                <Animated.FlatList
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={myCards}
                    snapToOffsets={[...Array(myCards.length)].map(
                        (x, i) => i * (DEVICE_WIDTH * 0.85 - 48) + (i - 1) * 48
                    )}
                    snapToAlignment="start"
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    contentContainerStyle={{
                        paddingLeft: 4,
                        paddingRight: 4,
                    }}
                    bounces={false}
                    renderItem={({ item, index }) => (
                        <Box>
                            <Card
                                onPress={onPress}
                                image={item.image}
                                key={index}
                            />
                        </Box>
                    )}
                />

                <Box height={24} flexDirection="row" alignSelf="center">
                    <Animated.View
                        style={[
                            styles.slidingIndicatorStyle,
                            {
                                position: 'absolute',
                                transform: [
                                    {
                                        translateX: Animated.divide(
                                            scrollX,
                                            DEVICE_WIDTH * 0.88 - 48
                                        ).interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [6, 25.8],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    />
                    {myCards.map((_item, index) => {
                        return (
                            <Box
                                key={index}
                                justifyContent="center"
                                alignItems="center"
                                width={19}
                            >
                                <Box
                                    borderWidth={1}
                                    width={7}
                                    height={7}
                                    borderRadius={16}
                                    borderColor="#6F6F6F"
                                />
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

interface ICard {
    image: string;
    onPress: () => void;
}
const Card = ({
    image,
    onPress
}: ICard) => {
    return (
        <Box>
            <TouchableHighlight
                onPress={onPress}
            >
                <Image
                    autoHeight
                    width={DEVICE_WIDTH * 0.85 - 16}
                    source={{ uri: image.url }}
                />
            </TouchableHighlight>
        </Box>
    );
};

const styles = StyleSheet.create({
    slidingIndicatorStyle: {
        backgroundColor: '#6F6F6F',
        width: 7,
        height: 7,
        alignSelf: 'center',
        zIndex: 2,
        borderRadius: 16,
    },
});