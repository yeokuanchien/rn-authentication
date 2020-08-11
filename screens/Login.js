import React, { useState, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { Button, rightIcon } from 'react-native-elements'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'

import { Ionicons } from '@expo/vector-icons'

import { Formik } from 'formik'
import * as Yup from 'yup'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] =useState({
    passwordVisibility: true,
    rightIcon: 'ios-eye'
  })

  const handleEmailChange = email => {
    setEmail(email)
  }

  const handlePasswordChange = password => {
    setPassword(password)
  }

  const onLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        navigation.navigate('App')
      }
    } catch (error) {
      alert(error)
    }
  }

  const handlePasswordVisibility = () => {
    setState(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }

  const goToSignup = () => navigation.navigate('Signup')

  const handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {
      setTimeout(() => {
        navigation.navigate('App')
      }, 3000)
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email('Enter a valid email')
      .required('Please enter a registered email'),
    password: Yup.string()
      .label('Password')
      .required()
      .min(4, 'Password must have at least 4 characters ')
  })

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => { handleSubmit(values) }}
        validationSchema={validationSchema}>
        {formikProps => {
          return (
            <Fragment>
              <FormInput
                name='email'
                value={formikProps.values.email}
                placeholder='Enter email'
                autoCapitalize='none'
                onChangeText={formikProps.handleChange('email')}
                iconName='ios-mail'
                iconColor='#2C384A'
                onBlur={formikProps.handleBlur('email')}
              />
              <ErrorMessage errorValue={formikProps.touched.email
                && formikProps.errors.email} />
              <FormInput
                name='password'
                value={formikProps.values.password}
                placeholder='Enter password'
                secureTextEntry={state.passwordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={handlePasswordVisibility}>
                    <Ionicons name={state.rightIcon} size={28} color='grey' />
                  </TouchableOpacity>
                }
                onChangeText={formikProps.handleChange('password')}
                iconName='ios-lock'
                iconColor='#2C384A'
                onBlur={formikProps.handleBlur('password')}
              />
              <ErrorMessage errorValue={formikProps.touched.password
                && formikProps.errors.password} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={formikProps.handleSubmit}
                  title='LOGIN'
                  buttonColor='#039BE5'
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
                  loading = { formikProps.isSubmitting }
                />
              </View>
            </Fragment>
          )
        }}
      </Formik>

      <Button
        title="Don't have an account? Sign Up"
        onPress={goToSignup}
        titleStyle={{
          color: '#F57C00'
        }}
        type='clear'
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 25
  }
})