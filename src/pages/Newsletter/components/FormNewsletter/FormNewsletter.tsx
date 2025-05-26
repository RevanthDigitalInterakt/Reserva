import React,
{
  type Dispatch,
  type SetStateAction,
} from 'react';
import { Formik } from 'formik';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import styles from './styles';

import { COLORS } from '../../../../base/styles';
import IconInfoFill from '../../../../../assets/icons/IconInfoFill';
import testProps from '../../../../utils/testProps';
import useHandleSendLeads from '../../hooks/useHandleSendLeads';
import { emailSchema, nameSchema, phoneNumberSchema } from '../../utils/inputValidationsNewsletter';

interface IFormNewsletter {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export function FormNewsletter({ setOpenModal }: IFormNewsletter) {
  const { handleSendLeads } = useHandleSendLeads();
  const FORM_SCHEMA = Yup.object().shape({
    name: nameSchema,
    email: emailSchema,
    phone: phoneNumberSchema,
  });

  return (
    <View
      {...testProps('form_newsletter')}
      style={styles.containerForm}
    >
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
        }}
        onSubmit={(values) => {
          handleSendLeads(values);
          setOpenModal(true);
        }}
        validationSchema={FORM_SCHEMA}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.contentForm}>
              <View
                style={
                  [styles.inputContainer, {
                    borderBottomColor: errors.name && touched.name
                      ? COLORS.INPUT_ERROR_MESSAGE : COLORS.TEXT_INPUT_CONTAINER,
                  },
                  ]
                }
              >
                <TextInput
                  style={styles.textInput}
                  placeholder="Nome"
                  placeholderTextColor={COLORS.BLACK}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  keyboardType="default"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  {...testProps('newsletter_input_name')}
                  onSubmitEditing={() => {

                  }}
                />
              </View>
              {errors.name && touched.name && (
                <View style={styles.errorContainer}>
                  <IconInfoFill />
                  <Text style={styles.errorMessage}>
                    {errors.name}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.contentForm}>
              <View
                style={
                  [styles.inputContainer, {
                    borderBottomColor: errors.email && touched.email
                      ? COLORS.INPUT_ERROR_MESSAGE : COLORS.TEXT_INPUT_CONTAINER,
                  },
                  ]
                }
              >
                <TextInput
                  style={styles.textInput}
                  placeholder="E-mail"
                  placeholderTextColor={COLORS.BLACK}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  {...testProps('newsletter_input_email')}
                  onSubmitEditing={() => { }}
                />
              </View>
              {errors.email && touched.email && (
                <View style={styles.errorContainer}>
                  <IconInfoFill />
                  <Text style={styles.errorMessage}>
                    {errors.email}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.contentForm}>
              <View
                style={
                  [styles.inputContainer, {
                    borderBottomColor: errors.phone && touched.phone
                      ? COLORS.INPUT_ERROR_MESSAGE : COLORS.TEXT_INPUT_CONTAINER,
                  },
                  ]
                }
              >
                <TextInput
                  style={styles.textInput}
                  placeholder="Telefone"
                  placeholderTextColor={COLORS.BLACK}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  keyboardType="phone-pad"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  {...testProps('newsletter_input_phone')}
                  onSubmitEditing={() => {

                  }}
                />
              </View>
              {errors.phone && touched.phone && (
                <View style={styles.errorContainer}>
                  <IconInfoFill />
                  <Text style={styles.errorMessage}>
                    {errors.phone}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              {...testProps('newsletter_button_submit')}
              onPress={() => handleSubmit()}
              style={styles.btnSubmit}
            >
              <Text style={styles.txtBtnSubmit}>quero me cadastrar</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}
