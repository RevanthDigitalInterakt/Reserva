import {
  Box,
  Typography,
  TextField,
  Button,
  Icon,
} from '@usereservaapp/reserva-ui';
import { useFormik } from 'formik';
import { Keyboard, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import ConfettiCannon from 'react-native-confetti-cannon';
import { theme } from '@usereservaapp/reserva-ui/src/themes';
import useMasterdataProvider, { IResponseSubmit } from '../../../hooks/useMasterdataProvider';
import { MasterDataSendDataDto } from '../../../types/dtos/masterdata-send-data.dto';
import { Colors } from '../../../Colors/Colors';
import useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';
import { platformType } from '../../../utils/platformType';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Informe um nome'),
  phone: yup
    .string()
    .required('Informe um celular')
    .matches(/^(\+?55\s?)?(\(\d{2}\)|\d{2})[\s-]?\d{5}-?\d{4}$/gi, {
      message: 'Informe um número de celular válido',
    }),
  email: yup
    .string()
    .required('Informe um e-mail')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
      message: 'Informe um e-mail valido',
    }),
});

const inputStyle = {
  backgroundColor: Colors.INPUT_BACKGROUND,
  borderColor: Colors.INPUT_BORDER,
  color: Colors.INPUT_TEXT,
  borderWidth: 1,
  height: 40,
};

export interface IFormModel { email: string; name: string; phone: string; }

const formInitialState: IFormModel = { email: '', name: '', phone: '' };

export interface ModalChristmasCouponFormProps {
  title: string;
  subtitle: { content: string; fontFamily?: string }[];
  buttonTitle: string;
  fineline: string;
  onClose: () => void;
  orderId: string;
}

function ModalChristmasCouponForm({
  buttonTitle,
  title,
  subtitle,
  fineline,
  onClose,
  orderId,
}: ModalChristmasCouponFormProps) {
  const { setItem } = useAsyncStorageProvider();
  const { onSendData } = useMasterdataProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<IResponseSubmit>();

  const onSubmit = useCallback(async (values: IFormModel) => {
    if (loading) return;

    setLoading(true);

    Keyboard.dismiss();

    const dto = new MasterDataSendDataDto(
      values.email,
      values.name,
      values.phone,
      orderId,
    );

    setFeedback(await onSendData(dto));
    setLoading(false);
  }, [orderId, loading]);

  const formik = useFormik({
    initialValues: formInitialState,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (feedback?.success) {
      setItem('@RNOrder:ChristmasCouponModalOrderId', '');
      formik.resetForm({ values: formInitialState });

      setTimeout(() => {
        onClose();
      }, 6000);
    }
  }, [feedback, onClose]);

  return (
    <Box
      mt={12}
      backgroundColor="white"
      minHeight={325}
      borderRadius={16}
      marginX="micro"
      style={{ elevation: Platform.OS === platformType.ANDROID ? 10 : 0 }}
      boxShadow={Platform.OS === platformType.ANDROID ? null : 'bottomBarShadow'}
    >
      <Box marginBottom={feedback?.success ? 30 : 42} marginTop={20} marginX={27}>
        <Box alignItems="center" flexDirection="row" justifyContent="space-between" marginBottom={5}>
          <Box flex={1}>
            <Typography
              fontSize={24}
              fontFamily="reservaSerifBlack"
              lineHeight={29}
              testID="com.usereserva:id/christmascouponform_title"
            >
              {title}
            </Typography>
          </Box>

          <Button
            onPress={onClose}
            variant="icone"
            icon={<Icon size={12} name="Close" />}
            testID="com.usereserva:id/christmascouponform_button_close"
          />
        </Box>

        <Box marginBottom={5}>
          <Typography
            fontSize={14}
            fontFamily="nunitoRegular"
            lineHeight={22}
            testID="com.usereserva:id/christmascouponform_subtitle"
          >
            {subtitle.map((item) => (
              <React.Fragment key={`text-${item.content}`}>
                <Typography fontFamily={(item.fontFamily || 'nunitoRegular') as keyof typeof theme.fonts}>
                  {item.content}
                </Typography>
              </React.Fragment>
            ))}
          </Typography>
        </Box>

        <Typography
          fontSize={12}
          fontFamily="nunitoBold"
          lineHeight={22}
          testID="com.usereserva:id/christmascouponform_fineline"
        >
          {fineline}
        </Typography>

        <Box marginTop={10}>
          <TextField
            style={inputStyle}
            value={formik.values.name}
            placeholder="NOME"
            height={40}
            onChangeText={(value) => formik.setFieldValue('name', value)}
            touched={formik.touched.name}
            error={formik.errors.name}
            accessibilityLabel="christmascouponform_input_name"
          />
        </Box>

        <Box marginTop={16}>
          <TextField
            style={inputStyle}
            value={formik.values.phone}
            maskType="cel-phone"
            placeholder="WHATSAPP"
            height={40}
            onChangeText={(value) => formik.setFieldValue('phone', value)}
            touched={formik.touched.phone}
            error={formik.errors.phone}
            accessibilityLabel="christmascouponform_input_phone"
          />
        </Box>

        <Box marginTop={16}>
          <TextField
            style={inputStyle}
            value={formik.values.email}
            touched={formik.touched.email}
            placeholder="E-MAIL"
            keyboardType="email-address"
            height={40}
            onChangeText={(value) => formik.setFieldValue('email', value)}
            error={formik.errors.email}
            accessibilityLabel="christmascouponform_input_email"
          />
        </Box>

        <Box>
          <Button
            inline
            height={40}
            marginTop={16}
            marginBottom={26}
            variant="primarioEstreito"
            loading={loading}
            title={buttonTitle || 'ASSINAR NEWSLETTER'}
            onPress={() => formik.submitForm()}
            testID="com.usereserva:id/christmascouponform_button_submit"
          />
        </Box>

        {!!feedback && (
          <Box mt={32}>
            <Typography
              fontFamily="nunitoSemiBold"
              fontSize={14}
              color={feedback.success ? 'verdeSucesso' : 'vermelhoAlerta'}
            >
              {feedback.title}
            </Typography>

            {!!feedback.message && (
              <Typography fontFamily="nunitoRegular" color="#3A3A3A">{feedback.message}</Typography>
            )}
          </Box>
        )}
      </Box>

      {!!feedback?.success && (
        <ConfettiCannon
          autoStart
          fadeOut
          count={150}
          origin={{ x: -10, y: 0 }}
        />
      )}
    </Box>
  );
}

export default ModalChristmasCouponForm;
