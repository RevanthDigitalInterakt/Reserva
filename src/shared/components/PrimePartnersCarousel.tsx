import React, { useRef } from 'react';
import {
    Dimensions,
    TouchableHighlight,
    Animated,
    StyleSheet,
    ImageBackground
} from 'react-native';
import { Box, Image, Typography } from '@usereservaapp/reserva-ui';

const DEVICE_WIDTH = Dimensions.get('window').width;

interface IPrimePartnersCarousel {
    prime: any;
    onPress: () => void;
}

export const PrimePartnersCarousel = ({
    prime,
    onPress
}: IPrimePartnersCarousel) => {

    const primeMokado = [
        {
            image: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg"
            },
            logoMarca: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg"
            },
            subtitle: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publis. placeholder text commonly used.',
        },
        {
            image: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg"
            },
            logoMarca: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg"
            },
            subtitle: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publis. placeholder text commonly used.',
        },
        {
            image: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg"
            },
            logoMarca: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg"
            },
            subtitle: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publis. placeholder text commonly used.',
        },

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
                        (x, i) => i * (DEVICE_WIDTH * 0.85 - 28) + (i - 1) * 28
                    )}
                    snapToAlignment="start"
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    bounces={false}
                    renderItem={({ item, index }) => (
                        <Box>
                            <Card
                                onPress={onPress}
                                data={item}
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
                                            DEVICE_WIDTH * 0.85 - 28
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
    data: {
        image: any;
        logoMarca: any;
        subtitle?: string;
    };
    onPress: () => void;
}
const Card = ({
    data,
    onPress
}: ICard) => {
    return (
        <Box>
            <TouchableHighlight
                onPress={onPress}
                style={{
                    marginLeft: 14,
                    marginRight: 14,
                }}
            >
                <ImageBackground
                    style={{ width: DEVICE_WIDTH * 0.85 - 28, minHeight: 412, }}
                    source={{ uri: data.image.url }}
                >
                    <Box
                        marginLeft={30}
                        marginRight={44}
                        minHeight={412}
                        justifyContent='flex-end'
                        mb={18}
                    >
                        <Box mb='micro'>
                            <Image
                                width={100}
                                height={20}
                                source={{ uri: data.logoMarca.url }}
                            />
                        </Box>
                        <Typography
                            fontFamily='reservaSansLight'
                            fontSize={16}
                            color='white'
                        >
                            {data.subtitle}
                        </Typography>

                    </Box>
                </ImageBackground>
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