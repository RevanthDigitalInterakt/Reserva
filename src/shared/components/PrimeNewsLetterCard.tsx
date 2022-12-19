import {
  Box,
  Typography,
  TextField,
  Button,
  OutlineInput,
} from '@usereservaapp/reserva-ui';
import { useFormik } from 'formik';
import { Platform } from 'react-native';
import React from 'react';
import * as yup from 'yup';
import axios from 'axios';

interface NewsLetterForm {
  name: string;
  phone: string;
  email: string;
}

interface PrimeNewsLetterCardProps {
  title?: string;
  buttonTitle?: string;
  action: string;
}
export const PrimeNewsLetterCard: React.FC<PrimeNewsLetterCardProps> = ({
  buttonTitle,
  title,
  action,
}) => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const sendLeads = async (email: string, name: string, phone: string) => {
    const response = await axios.post(
      'https://www.usereserva.com/api/dataentities/LF/documents',
      {
        action,
        email,
        name,
        phone: phone.replace(/[^0-9]/g, ''),
      }
    );

    if (response.status === 201) {
      setIsSuccess(true);
    }

    return response;
  };

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
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      sendLeads(values.email, values.name, values.phone).then((r) => {
        if (r.status === 201)
          formik.resetForm({
            values: {
              email: '',
              name: '',
              phone: '',
            },
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
      style={{ elevation: Platform.OS == 'android' ? 10 : 0 }}
      boxShadow={Platform.OS == 'android' ? null : 'bottomBarShadow'}
    >
      <Box marginBottom={isSuccess ? 30 : 42} marginTop={20} marginX={27}>
        <Typography
          fontSize={26}
          fontFamily="reservaSerifBlack"
          lineHeight={29}
        >
          {title ? title : 'Fique por dentro dos nossos lançamentos'}
        </Typography>
        <Box marginTop={16}>
          <TextField
            style={{
              backgroundColor: '#fff',
              borderColor: '#BCBCBC',
              borderWidth: 1,
              height: 40,
              color: '#3A3A3A',
            }}
            value={formik.values.name}
            placeholder="NOME"
            height={40}
            onChangeText={(value) => formik.setFieldValue('name', value)}
            touched={formik.touched.name}
            error={formik.errors.name}
          />
        </Box>
        <Box marginTop={16}>
          <TextField
            style={{
              backgroundColor: '#fff',
              borderColor: '#BCBCBC',
              borderWidth: 1,
              height: 40,
              color: '#3A3A3A',
            }}
            value={formik.values.phone}
            maskType="cel-phone"
            placeholder="CELULAR"
            height={40}
            onChangeText={(value) => formik.setFieldValue('phone', value)}
            touched={formik.touched.phone}
            error={formik.errors.phone}
          />
        </Box>
        <Box marginTop={16}>
          <TextField
            style={{
              backgroundColor: '#fff',
              borderColor: '#BCBCBC',
              borderWidth: 1,
              height: 40,
              color: '#3A3A3A',
            }}
            value={formik.values.email}
            touched={formik.touched.email}
            placeholder="E-MAIL"
            height={40}
            onChangeText={(value) => formik.setFieldValue('email', value)}
            error={formik.errors.email}
          />
        </Box>
        <Box>
          <Button
            inline
            height={40}
            marginTop={16}
            marginBottom={26}
            variant="primarioEstreito"
            title={buttonTitle ? buttonTitle : 'ASSINAR NEWSLETTER'}
            onPress={() => formik.submitForm()}
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
