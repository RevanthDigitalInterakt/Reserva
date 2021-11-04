import React from 'react'
import { Dimensions, FlatList } from 'react-native'
import { View } from "react-native-animatable"
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Box, Typography, Image, Button } from 'reserva-ui'
import { Carrousel, CarrouselCard } from 'src/graphql/homePage/HomeQuery'
import { marginLeft } from 'styled-system'

interface CardsCarrouselProps {
    carrousel: Carrousel
}

export const CardsCarrousel: React.FC<CardsCarrouselProps> = ({ carrousel }) => {

    console.log('carrousel', carrousel)
    const myCards = carrousel.itemsCollection.items
    return <Box mt={15}>
        <Box>
            <Box paddingLeft={15}>
                <Typography
                    fontFamily='nunitoBold'
                    fontSize={16}
                >
                    {carrousel.title}
                </Typography>
            </Box>
            <FlatList
                style={{ paddingLeft: 15 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={myCards}
                renderItem={
                    ({ item, index }) =>
                        <Card
                            image={item.image}
                            name={item.name}
                            description={item.description}
                            reference={item.reference}
                            referenceLabel={item.referenceLabel}
                            key={index}
                        />
                }
            />
        </Box>
    </Box>
}

interface CardProps extends CarrouselCard {
    referenceLabel: string
}

const width = Dimensions.get('window').width * .75

const Card: React.FC<CardProps> = ({ image, referenceLabel, reference, description, name }) => {
    return <Box
        marginTop={5}
        marginBottom={15}
        marginRight={15}
        justifyContent='space-between'
    >
        <Box>
            <Button>
                <Image
                    autoHeight
                    width={width}
                    source={{ uri: image.url }}
                />
            </Button>
            <Box
                style={{ maxWidth: width }}
                marginLeft={10}
                marginTop='quarck'
                marginBottom={5}
            >
                <Typography
                    fontFamily='reservaSansBold'
                    fontSize={16}
                >
                    {name.toUpperCase()}
                </Typography>
                <Typography
                    style={{
                        marginLeft: 10,
                        height: (12 + 4) * 3
                    }}
                    numberOfLines={3}
                    fontFamily='reservaSansRegular'
                    fontSize={12}
                    color='neutroFrio2'
                >
                    {description}
                </Typography>

            </Box>
        </Box>
        <TouchableHighlight style={{ bottom: 0, marginLeft: 10 }}>
            <Typography fontSize={14} fontFamily='nunitoBold'>
                {referenceLabel}
            </Typography>
        </TouchableHighlight>
    </Box>
}