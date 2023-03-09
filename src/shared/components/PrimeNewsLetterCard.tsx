import {
  Box,
  Typography,
  TextField,
  Button,
} from '@usereservaapp/reserva-ui';
import { useFormik } from 'formik';
import { Platform } from 'react-native';
import React, { useCallback } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import * as Sentry from '@sentry/react-native';
import { Colors } from '../../Base/Colors';
import { platformType } from '../../utils/platformType';

const formInitialState = { email: '', name: '', phone: '' };

export interface PrimeNewsLetterCardProps {
  title?: string;
  buttonTitle?: string;
  action: string;
  onClose?: () => void;
}

export const PrimeNewsLetterCard: React.FC<PrimeNewsLetterCardProps> = ({
  buttonTitle,
  title,
  action,
  onClose,
}) => {
  const [isSuccess, setIsSuccess] = React.useState(false);

  const sendLeads = useCallback(async (email: string, name: string, phone: string) => {
    const response = await axios.post(
      'https://www.usereserva.com/api/dataentities/LF/documents',
      {
        action,
        email,
        name,
        phone: phone.replace(/[^0-9]/g, ''),
      },
    );

    setIsSuccess(response.status === 201);

    return response;
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string(),
    phone: yup.string(),
    email: yup
      .string()
      .required('Informe um e-mail')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
        message: 'Informe um e-mail valido',
      }),
  });

  const formik = useFormik({
    initialValues: formInitialState,
    validationSchema,
    onSubmit: (values) => {
      sendLeads(values.email, values.name, values.phone)
        .then((r) => {
          if (r.status === 201) {
            formik.resetForm({ values: formInitialState });
          }
        })
        .catch((err) => {
          Sentry.withScope((scope) => {
            scope.setExtra('values', values);
            Sentry.captureException(err);
          });
        });
    },
  });

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
      <Box marginBottom={isSuccess ? 30 : 42} marginTop={20} marginX={27}>
        <Box alignItems="center" flexDirection="row" justifyContent="space-between">
          <Box flex={1}>
            <Typography
              fontSize={26}
              fontFamily="reservaSerifBlack"
              lineHeight={29}
              testID="com.usereserva:id/primenewslettermodal_title"
            >
              {title || 'Fique por dentro dos nossos lançamentos'}
            </Typography>
          </Box>

          {!!onClose && (
            <Button
              onPress={onClose}
              variant="icone"
              icon={<Icon size={12} name="Close" />}
              testID="com.usereserva:id/primenewslettermodal_button_close"
            />
          )}
        </Box>

        <Box marginTop={16}>
          <TextField
            style={{
              backgroundColor: Colors.INPUT_BACKGROUND,
              borderColor: Colors.INPUT_BORDER,
              color: Colors.INPUT_TEXT,
              borderWidth: 1,
              height: 40,
            }}
            value={formik.values.name}
            placeholder="NOME"
            height={40}
            onChangeText={(value) => formik.setFieldValue('name', value)}
            touched={formik.touched.name}
            error={formik.errors.name}
            accessibilityLabel="primenewslettermodal_input_name"
          />
        </Box>

        <Box marginTop={16}>
          <TextField
            style={{
              backgroundColor: Colors.INPUT_BACKGROUND,
              borderColor: Colors.INPUT_BORDER,
              color: Colors.INPUT_TEXT,
              borderWidth: 1,
              height: 40,
            }}
            value={formik.values.phone}
            maskType="cel-phone"
            placeholder="CELULAR"
            height={40}
            onChangeText={(value) => formik.setFieldValue('phone', value)}
            touched={formik.touched.phone}
            error={formik.errors.phone}
            accessibilityLabel="primenewslettermodal_input_phone"
          />
        </Box>

        <Box marginTop={16}>
          <TextField
            style={{
              backgroundColor: Colors.INPUT_BACKGROUND,
              borderColor: Colors.INPUT_BORDER,
              color: Colors.INPUT_TEXT,
              borderWidth: 1,
              height: 40,
            }}
            value={formik.values.email}
            touched={formik.touched.email}
            placeholder="E-MAIL"
            height={40}
            onChangeText={(value) => formik.setFieldValue('email', value)}
            error={formik.errors.email}
            accessibilityLabel="primenewslettermodal_input_email"
          />
        </Box>

        <Box>
          <Button
            inline
            height={40}
            marginTop={16}
            marginBottom={26}
            variant="primarioEstreito"
            title={buttonTitle || 'ASSINAR NEWSLETTER'}
            onPress={() => formik.submitForm()}
            testID="com.usereserva:id/primenewslettermodal_button_submit"
          />
        </Box>

        {isSuccess && (
          <Box mt={32}>
            <Typography
              fontFamily="nunitoSemiBold"
              fontSize={14}
              color="#2DB808"
            >
              Inscrição concluída com sucesso!
            </Typography>

            <Typography fontFamily="nunitoRegular" color="#3A3A3A">
              Agora é só aguardar o nosso contato.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PrimeNewsLetterCard;
