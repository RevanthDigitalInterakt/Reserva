import React from "react"
import { useState } from "react"
import { Dimensions } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Box, Button, Icon, neutroFrio2, theme, Typography } from "reserva-ui"

interface UnderlineInputProps {
    placeholder?: string,
    errorMsg?: string,
    showError?: boolean,
    isSecureText?: boolean
    width?: number
    iconSize?: number
    onChangeText: (value: string) => void
}

const screenWidth = Dimensions.get('window').width

const UnderlineInput: React.FC<UnderlineInputProps> = ({ placeholder, onChangeText, errorMsg, showError, isSecureText, width, iconSize }) => {
    width = width == undefined ? width = screenWidth - (20 * 2) : width
    iconSize = iconSize == undefined ? iconSize = 16 : iconSize
    const [revelPassword, setRevelPassword] = useState(false)
    return (
        <Box
            width={width}
        >
            <Box
                flexDirection='row'
                borderBottomWidth='hairline'
                borderBottomColor={showError ? 'vermelhoAlerta' : 'neutroFrio2'}
                justifyContent='space-between'
                style={{ overflow: 'hidden' }}
            >
                <Box flexGrow={4}>
                    <TextInput
                        secureTextEntry={isSecureText && revelPassword}
                        placeholder={placeholder}
                        onChangeText={(value) =>  onChangeText(value)}
                        style={{
                            padding: 0,
                            margin: 0,
                            maxWidth: isSecureText ? width - (iconSize + 4) : width
                        }}
                        autoCorrect={isSecureText ? false : true}
                    />
                </Box>
                {isSecureText &&
                    <Box justifyContent='center' >
                        <Button onPress={() => { setRevelPassword(!revelPassword) }}>
                            <Icon name={!revelPassword ? 'EyeOpen' : 'EyeOff'} size={iconSize} />
                        </Button>
                    </Box>}
            </Box>
            {
                showError &&
                <Typography color='vermelhoAlerta' fontFamily='nunitoRegular' fontSize={13}  >
                    {errorMsg}
                </Typography>
            }
        </Box>


    )
}
export default UnderlineInput