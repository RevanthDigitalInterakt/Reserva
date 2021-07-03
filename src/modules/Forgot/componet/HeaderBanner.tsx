import React from "react"
import { Box, Button, Icon, Image, theme } from "reserva-ui"
import ProgressBar from "react-native-progress/Bar";
import { images } from '../../../assets/'
import { TopBarDefault } from "../../Menu/components/TopBarDefault"

const HeaderBanner: React.FC<{
    onClickGoBack?: () => void,
    imageHeader: any,
    loading?: boolean
}> = ({
    onClickGoBack,
    imageHeader,
    loading
}) => {
        const a = 5
        return (
            <Box>
                <Box position='absolute' top={10} left={10} zIndex={4} style={{ elevation: 3 }}>
                    <Button onPress={onClickGoBack}>

                        <Icon name='ArrowBack' size={16} color='preto' />
                    </Button>
                </Box>
                <Image source={imageHeader} width={'100%'} />
                {loading &&
                    <Box top={0} height={1} justifyContent="flex-end">
                        <ProgressBar
                            animated
                            indeterminate
                            color={theme.colors.vermelhoAlerta}
                            height={2}
                            borderWidth={0}
                            width={null}
                            borderRadius={0}
                        />
                    </Box>}
            </Box>
        )
    }

export default HeaderBanner