import { Box, Typography, TextField, Button, OutlineInput } from "@danilomsou/reserva-ui"
import { useFormik } from "formik"
import React from "react"
import Modal from "react-native-modal"
import * as yup from 'yup'

interface NewsLetterForm {
  name: string,
  phone: string,
  email: string
}

interface NewsLetterModalProps {
  isVisible: false,
  onSubmit: (values: NewsLetterForm) => void,
  onClose: () => void
}
export const NewsLetterModal: React.FC<NewsLetterModalProps> = ({ isVisible, onSubmit, onClose }) => {

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

  return <Modal
    isVisible={isVisible}
    onBackdropPress={onClose}
    style={{ justifyContent: 'center', alignItems: 'center' }} >
    <Box
      backgroundColor='white'
      width={300}
      borderRadius={16}
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
  </Modal >
}
