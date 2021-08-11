import React from "react";
import { ViewComponent, KeyboardTypeOptions } from "react-native";
import { TextField, Box, } from "reserva-ui";
import { useFormikContext } from "formik";
import {
    TextInputMaskTypeProp,
    TextInputMaskOptionProp,
} from "react-native-masked-text";

interface IFormikTextInput {
    label?: string;
    secureTextEntry?: boolean;
    placeholder?: string;
    maskType?: TextInputMaskTypeProp;
    maskOptions?: TextInputMaskOptionProp;
    height?: number;
    field: string;
    iconRight?: ViewComponent;
    textAlignVertical?: "auto" | "top" | "bottom" | "center" | undefined;
    keyboardType?: KeyboardTypeOptions;
}
export const FormikTextInput = ({
    label,
    textAlignVertical,
    secureTextEntry,
    placeholder,
    maskType,
    maskOptions,
    height,
    field,
    iconRight,
    keyboardType
}: IFormikTextInput) => {
    const {
        values,
        handleChange,
        touched,
        errors,
    } = useFormikContext<any>();
    return (
        <>
            <TextField
                label={label}
                textAlignVertical={textAlignVertical}
                fontFamily="nunitoRegular"
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                height={height}
                keyboardType={keyboardType}
                maskType={maskType}
                maskOptions={maskOptions}
                onChangeText={handleChange(field)}
                placeholder={placeholder}
                iconRight={iconRight}
                value={values[field]}
                touched={touched[field]}
                error={errors[field] && touched[field] ? `${errors[field]}` : null}
            />
        </>
    );
};
