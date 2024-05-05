/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true; // SOLVED IN HOURS

const MAX_AGE = 3 * 24 * 60 * 60

function LoginForm() {
  const [err, setErr] = React.useState('')
  const navigate = useNavigate()
  const initialValues = {
    email: '',
    password: '',
  }
  function onSubmit(data) {
    let sentData = data
    async function fetchLogin() {
      try {
        const instance = axios.create({
          withCredentials: true, // Enable cookie transmission
          baseURL: 'http://localhost:5000/api/auth', // Replace with your API base URL
        })

        const response = await instance.post('/login', sentData)
        Cookies.set('jwt2', sentData.token)
        const userData = response.data

        console.log('User profile:', userData)
      } catch (error) {
        console.error('Error fetching user profile:', error)
        // Handle errors appropriately (e.g., redirect to login if unauthorized)
      }
    }
    fetchLogin()
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
    <div className='createPostPage'>
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
            autoComplete='off'
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