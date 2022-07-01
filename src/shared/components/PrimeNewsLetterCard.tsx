import { Box, Typography, TextField, Button, OutlineInput } from "@danilomsou/reserva-ui"
import { useFormik } from "formik"
import { Platform } from 'react-native'
import React from "react"
import * as yup from 'yup'

interface NewsLetterForm {
  name: string,
  phone: string,
  email: string
}

interface PrimeNewsLetterCardProps {
  onSubmit: (values: NewsLetterForm) => void,
}
export const PrimeNewsLetterCard: React.FC<PrimeNewsLetterCardProps> = ({ onSubmit }) => {

  const validationSchema = yup.object().shape({
    name: yup.string(),
    phone: yup.string(),
    email: yup.string().required('Informe um e-mail').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, { message: 'Informe um e-mail valido' }),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: ''
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
    }
  })

  return (
    <Box
      mt={12}
      backgroundColor='white'
      minHeight={325}
      borderRadius={16}
      marginX='micro'
      style={{ elevation: Platform.OS == 'android' ? 10 : 0 }}
      boxShadow={Platform.OS == 'android' ? null : 'bottomBarShadow'}
    >
      <Box
        marginBottom={27}
        marginTop={20}
        marginX={27}
      >

        <Typography
          fontSize={26}
          fontFamily='reservaSerifBlack'
          lineHeight={29}
        >
          Fique por dentro dos nossos lançamentos
        </Typography>
        <Box
          marginTop={16}
        >
          <TextField
            style={{
              backgroundColor: '#fff',
              borderColor: '#BCBCBC',
              borderWidth: 1,
              height: 40,
              color: '#3A3A3A'
            }}
            placeholder='NOME'
            height={40}
            onChangeText={(value) => formik.setFieldValue('name', value)}
            touched={formik.touched.name}
            error={formik.errors.name}
          />
        </Box>
        <Box
          marginTop={16}
        >
          <TextField
            style={{
              backgroundColor: '#fff',
              borderColor: '#BCBCBC',
              borderWidth: 1,
              height: 40,
              color: '#3A3A3A'
            }}
            maskType='cel-phone'
            placeholder='CELULAR'
            height={40}
            onChangeText={(value) => formik.setFieldValue('phone', value)}
            touched={formik.touched.phone}
            error={formik.errors.phone}
          />
        </Box>
        <Box
          marginTop={16}
        >
          <TextField
            style={{
              backgroundColor: '#fff',
              borderColor: '#BCBCBC',
              borderWidth: 1,
              height: 40,
              color: '#3A3A3A'
            }}
            touched={formik.touched.email}
            placeholder='E-MAIL'
            height={40}
            onChangeText={(value) => formik.setFieldValue('email', value)}
            error={formik.errors.email}
          />
        </Box>
        <Button
          inline
          height={40}
          marginTop={16}
          marginBottom={26}
          variant="primarioEstreito"
          title='ASSINAR NEWSLETTER'
          onPress={() => formik.submitForm()}
        />
      </Box>

    </Box>
  );
}
