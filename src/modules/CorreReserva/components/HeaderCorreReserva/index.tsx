import React from "react"
import { Dimensions } from "react-native"
import { View } from "react-native-animatable"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Box, Icon, Image } from "reserva-ui"

export interface HeaderCorreReservaProps {
  isFullPage?: boolean,
  onClickBackButton: () => void
}

const DEVICE_HEIGHT = Dimensions.get('window').height

export const HeaderCorreReserva: React.FC<HeaderCorreReservaProps> = ({ isFullPage, onClickBackButton }) => {
  return (
    <View style={{
      width: '100%',
    }}>
      <Box
        marginTop={42}
        flexDirection='row'
        justifyContent='space-between'
      >
        <Box
          paddingLeft={17}
          justifyContent='center'
          flexGrow={1}
        >
          <TouchableOpacity
            onPress={onClickBackButton}
          >
            <Icon size={25} name='ArrowBack' color='white' />
          </TouchableOpacity>
        </Box>
        <Box
          alignItems='center'
          flexGrow={1}
        >
          <Image width={134} height={34.2} source={{ uri: 'https://cdn.discordapp.com/attachments/488087473348542486/908436065969393704/unknown.png' }} />
        </Box>
        <Box
          alignItems='center'
          flexGrow={1}
        >
          <Image width={29} height={34.2} source={{ uri: 'https://media.discordapp.net/attachments/488087473348542486/908436092301225994/unknown.png' }} />
        </Box>
      </Box>
    </View>
  )
}