import React from 'react'
import { Dimensions, FlatList } from 'react-native'
import { View } from "react-native-animatable"
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Box, Typography, Image, Button } from 'reserva-ui'
import { CarrouselCard } from 'src/graphql/homePage/HomeQuery'
import { marginLeft } from 'styled-system'

interface CardsCarrouselProps {
    cards: any[]
}

export const CardsCarrousel: React.FC<CardsCarrouselProps> = ({ cards }) => {

    console.log('cards', cards)
    const myCards: CardProps[] = [
        {
            image: {
                url: 'https://images.ctfassets.net/6jsfqc13oxv4/5nfwryIUnC9SIE7JgDR4ir/000fae8650281bd44814db7f73051225/calc__as__1_.jpeg',
                size: 1,
                width: 200,
                height: 200,
                title: 'aaaaa',
                fileName: 'aaaa'
            },
            name: 'Camiseta Estampada de Bob I',
            description: 'um otima camiseta ',//asdoansfjnoasjndfoasjndfoasn as aisdnb aisjn dais jndai sjnd iasjn ias jnai sjndai sjdn iasjn iasj niasj ndai jsnd iasjn diajs ndi jsndi ajsnd isqjn diaj sndia jsad isjnd aisjn aisjdndjfnaso djnao jnaso djfna osjdn aojs nao jn ojansd ofjn ojn oasnd foan jns oasjnd oajns ',
            reference: '',
            referenceLabel: 'Cofira o porduto!',
        },
        {
            image: {
                url: 'https://images.ctfassets.net/6jsfqc13oxv4/4I8z9FewuPHocvQAjpnnWo/3974c92cdef628b4f9bd9afcb1af1906/polos__1_.jpeg',
                size: 1,
                width: 200,
                height: 200,
                title: 'aaaaa',
                fileName: 'aaaa'
            },
            name: 'Camiseta Estampada de Bob II',
            description: 'um otima camiseta',
            reference: '',
            referenceLabel: 'Cofira o porduto!',
        },
        {
            image: {
                url: 'https://images.ctfassets.net/6jsfqc13oxv4/6VELhA65LjYAucPGWbZkkI/40ce72a85630e9bd7963c26dc007fb5c/camisas.jpg',
                size: 1,
                width: 200,
                height: 200,
                title: 'aaaaa',
                fileName: 'aaaa'
            },
            name: 'Camiseta Estampada de Bob III',
            description: 'um otima camiseta',
            reference: '',
            referenceLabel: 'Cofira o porduto!',
        },
        {
            image: {
                url: 'https://images.ctfassets.net/6jsfqc13oxv4/1oDURfQOjMbcdEh8tnZkqR/93d70a17683a536fb37cfcc866c0d5d6/calc__ados__1_.jpeg',
                size: 1,
                width: 200,
                height: 200,
                title: 'aaaaa',
                fileName: 'aaaa'
            },
            name: 'Camiseta Estampada de Bob III',
            description: 'um otima camiseta',
            reference: '',
            referenceLabel: 'Cofira o porduto!',
        },
    ]
    return <Box>
        <Box mt={200}>
            <Box
                paddingLeft={15}
            >

                <Typography
                    fontFamily='nunitoBold'
                    fontSize={16}
                >
                    É Tendência
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
        marginVertical={15}
        marginRight={15}
        justifyContent='space-between'
    >
        <Box>
            {/* <Box style={{ overflow: 'hidden' }}>
                <Box
                    style={{
                        paddingBottom: 5,
                        paddingRight: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 1,
                            height: 2,
                        },
                        shadowOpacity: 0.33,
                        shadowRadius: 2.62,

                        elevation: 4,
                    }}
                > */}
            <Button>
                <Image
                    resizeMode="cover"
                    height={(width * image.height) / image.width}
                    autoHeight
                    width={width}
                    source={image}
                    borderRadius={15}

                />
            </Button>
            {/* </Box>
            </Box> */}
            <Box style={{ maxWidth: width }} marginLeft={10} marginTop='quarck' marginBottom={5}>

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