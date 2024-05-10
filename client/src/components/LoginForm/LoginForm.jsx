/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import { currentUserContext } from '../CurrentUserProvider/CurrentUserProvider'

axios.defaults.withCredentials = true //allow exchange with backend

const MAX_AGE = 3 * 24 * 60 * 60

function LoginForm() {
  const {setUser} = React.useContext(currentUserContext)
  const [err, setErr] = React.useState('')
  const navigate = useNavigate()
  const initialValues = {
    email: '',
    password: '',
  }
  function onSubmit(data) {
    axios
      .post('http://localhost:5000/api/auth/login', data)
      .then((response) => {
        const userData = response.data
        console.log(userData)
        setUser(userData)
        Cookies.set('loggedIn', true)
        navigate('/')
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error)
        console.log('/errorFetchPage')
        // Handle errors appropriately (e.g., redirect to login if unauthorized)
      })
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please insert a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(5, ' Password must be at least 5 charts long')
      .required('Password is required'),
  })
  return (
    <div className='Formik'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label htmlFor='email'>Email: </label>
          <ErrorMessage
            name='email'
            component='span'
          />
          <Field
            id='email'
            name='email'
            placeholder='Email...'
          />
          <label htmlFor='password'>Password: </label>
          <ErrorMessage
            name='password'
            component='span'
          />
          <Field
            autoComplete='off'
            id='password'
            name='password'
            placeholder='password...'
          />
          <button type='submit'>Login</button>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm
