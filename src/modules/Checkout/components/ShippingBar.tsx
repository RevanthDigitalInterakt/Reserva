import React, { useEffect, useState } from "react"
import { Box, Typography, ProgressBar, verdeSucesso } from "reserva-ui"
import { PriceCustom } from "../components/PriceCustom";

export interface ShippingBarProps {
    sumPriceShipping: number;
    isFreeShipping: number;
    loading: boolean;
}

export const ShippingBar = ({ sumPriceShipping, isFreeShipping, loading }: ShippingBarProps) => {
    const [priceShippingFree, setPriceShippingFree] = useState(299.00); //Set value for shipping free
    const [trueFreeShipping, setTrueFreeShipping] = useState(false);
    const [loadingBar, setLoadingBar] = useState(loading);
    const [sumPrice, setSumPrice] = useState(0);

    const isShippingFree = () => {
        setLoadingBar(true)
        console.log("sumPrice", sumPriceShipping)
        if (sumPriceShipping <= priceShippingFree) {
            setTrueFreeShipping(false);
            setSumPrice(priceShippingFree - sumPriceShipping);
        } else {
            setTrueFreeShipping(true)
            setSumPrice(priceShippingFree)
        }
    }

    useEffect(() => {
        isShippingFree();
        console.log("SUMPRICE", sumPrice)
    }, [loadingBar])


    return (
        <>
            {console.log("SUMPRICE", sumPrice)}
            {console.log("isFree", isFreeShipping)}

            {loadingBar &&
                <Box mt="micro">
                    {!trueFreeShipping ?
                        <Box flexDirection="row">
                            <Typography>Faltam apenas </Typography>
                            <PriceCustom
                                fontFamily={"nunitoBold"}
                                sizeInterger={3}
                                sizeDecimal={1}
                                num={sumPrice}
                            />
                            <Typography> para ganhar </Typography>
                            <Typography color="vermelhoRSV" fontWeight="bold">frete grátis</Typography>
                        </Box>
                        : <Box flexDirection="row">
                            <Typography color={"verdeSucesso"}>Você ganhou </Typography>
                            <Typography color="verdeSucesso" fontWeight="bold">frete grátis!</Typography>
                        </Box>
                    }
                    <Box mt="nano">
                        <ProgressBar
                            colorBar="neutroFrio1"
                            colorProgress="verdeSucesso"
                            bg="white"
                            value={sumPrice}
                            max={priceShippingFree}
                            barHeight={5}
                            colorLabel="neutroFrio2"
                            showPercent={false}
                        />
                    </Box>
                </Box>
            }
        </>
    );
}