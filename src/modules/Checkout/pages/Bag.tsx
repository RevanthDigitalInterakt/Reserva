import * as React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
    Typography,
    Box,
    ProgressBar,
    ProductWishlistCard,
    Divider,
    Button,
    Icon,
    Toggle
} from 'reserva-ui';

import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

export const BagScreen = () => {
    // const navigation = useNavigation();
    return (
        <SafeAreaView
            flex={1}
            style={{ justifyContent: "space-between" }}
            backgroundColor="white"
        >
            <ScrollView>
                <TopBarBackButton showShadow />
                <Box
                    // bg="blue"
                    paddingX="micro"
                    paddingTop="xxs"
                >

                    <Box variant={"container"} >
                        <Box>
                            <ProgressBar
                                label={"Faltam apenas R$29,90 para ganhar frete grátis"}
                                colorLabel={"fullBlack"}
                                colorBar={"neutroFrio1"}
                                colorProgress={"neutroFrio2"}
                                value={80}
                                max={100}
                                showPercent={false}
                                barHeight={5}
                            />
                        </Box>
                    </Box>

                    <Box
                        bg="pink"
                        marginTop="xxs"
                        marginBottom="xxxs"
                    >
                        <Typography variant={"tituloSessoes"}>Sacola (2)</Typography>
                    </Box>

                    <Box bg="blue">
                        {/* <ProductWishlistCard
                            discountTag={18}
                            itemColor='Branca'
                            // ItemSize="41"
                            productTitle='CAMISETA BÁSICA RESERVA'
                            installmentsNumber={3}
                            installmentsPrice={99.9}
                            price={345.0}
                            priceWithDiscount={297.0}
                            count={1}
                            onClickAddCount={count => { console.log('teste') }}
                            onClickSubCount={count => { console.log('teste') }}
                            onClickClose={() => { }}
                            imageSource='https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png'
                        /> */}
                    </Box>
                    <Divider variant={"fullWidth"} />
                    <Box
                        flexDirection="row"
                        marginY="xxs"
                    >
                        <Icon name={"Presente"} size={20} />
                        <Typography variant="subtituloSessoes">Embalagem para presente</Typography>
                        <Toggle value={false} color={"neutroFrio2"} label="teste" thumbColor={"#ccc"}></Toggle>
                    </Box>
                    <Divider variant={"fullWidth"} />

                </Box>

            </ScrollView>

        </SafeAreaView>

    );
};

