import React, { useRef, useState } from "react"
import { Pressable, TextInput } from "react-native"
import { Value } from "react-native-reanimated"
import { Box, Typography } from "reserva-ui"

export interface CodeInputProps {
    //codeMaxSize?: number,
    showError: boolean,
    errorMessage?: string
    code: string,
    onChageCode: (code: string) => void
}

const CodeInput: React.FC<CodeInputProps> = ({ code, onChageCode, showError = true, errorMessage = 'Digite um código válido' }) => {
    //const [accessCode, setAccessCode] = useState('')
    const codeMaxSize = 6
    const codeDigitsArray = new Array(codeMaxSize).fill(0)
    const refTextInput = useRef<TextInput>(null)



    const handleOnPress = () => {
        refTextInput?.current?.focus()
    }
    return (
        <Box>
            <Pressable onPress={handleOnPress}>
                <Box flexDirection='row' justifyContent='space-between'>
                    {codeDigitsArray.map((val, idx) => (
                        <Box
                            key={idx}
                            borderWidth='hairline'
                            borderColor={showError ? 'vermelhoAlerta' : 'transparente'}
                            alignItems='center'
                            justifyContent='center'
                            borderRadius='nano'
                            width={50}
                            height={50}
                            backgroundColor='backgoundInput'>
                            <Typography fontFamily='nunitoBold' fontSize={15}>
                                {code[idx] ? code[idx] : ' '}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Pressable>

            {showError &&
                <Box mt='quarck'>
                    <Typography fontFamily='nunitoRegular' fontSize={13} color='vermelhoAlerta'>{errorMessage}</Typography>
                </Box>
            }
            <TextInput
                ref={refTextInput}
                value={code}
                onChangeText={(code) => onChageCode(code)}
                keyboardType='number-pad'
                returnKeyType='done'
                textContentType='oneTimeCode'
                maxLength={codeMaxSize}
                style={{
                    position: 'absolute',
                    height: 0,
                    width: 0,
                    opacity: 0,
                }} />
        </Box>
    )
}

export default CodeInput