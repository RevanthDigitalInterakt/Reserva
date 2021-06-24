import React from "react";
import { ViewComponent } from "react-native";
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
}
export const FormikTextInput = ({
    label,
    secureTextEntry,
    placeholder,
    maskType,
    maskOptions,
    height,
    field,
    iconRight,
}: IFormikTextInput) => {
    const {
        values,
        handleChange,
        setFieldTouched,
        touched,
        errors,
    } = useFormikContext<any>();
    return (
        <>
            <TextField
                label={label}
                fontFamily="nunitoRegular"
                secureTextEntry={secureTextEntry}
                height={height}
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
