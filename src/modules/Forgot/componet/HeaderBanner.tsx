import React from "react"
import { Box, Button, Icon, Image } from "reserva-ui"

import { images } from '../../../assets/'
import { TopBarDefault } from "../../Menu/components/TopBarDefault"

const HeaderBanner: React.FC<{ onClickGoBack?: () => void, imageHeader: any }> = ({ onClickGoBack, imageHeader }) => {
    const a = 5
    return (
        <Box>
            <Box position='absolute' top={10} left={10} zIndex={4} style={{ elevation: 3 }}>
                <Button onPress={onClickGoBack}>

                    <Icon name='ArrowBack' size={16} color='preto' />
                </Button>
            </Box>
            <Image source={imageHeader} width={'100%'} />
        </Box>
    )
}

export default HeaderBanner