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

function SignupForm() {
  const { setUser } = React.useContext(currentUserContext)
  const [err, setErr] = React.useState('')

  const navigate = useNavigate()
  const initialValues = {
    username: '',
    email: '',
    password: '',
  }
  function onSubmit(data) {
    axios
      .post('https://wisdom-server-production.up.railway.app/api/auth/signup', data)
      .then((response) => {
        const userData = response.data
        setUser(userData)
        Cookies.set('loggedIn', true)
        navigate('/')
      })
      .catch((error) => {
        setErr(error.response.data.err)
      })
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5, ' Username must be at least 5 charts long'),
    email: Yup.string().email('Please insert a valid email').required('Email is required'),
    password: Yup.string().min(5, ' Password must be at least 5 charts long').required('Password is required'),
  })
  return (
    <div className='Formik'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <fieldset>
            <div className='fieldContainer'>
              <label htmlFor='username'>Username: </label>
              <ErrorMessage
                name='username'
                component='span'
              />
              <Field
                autoComplete='off'
                id='username'
                type='text'
                name='username'
                placeholder='username...'
              />
            </div>
            <div className='fieldContainer'>
              <label htmlFor='email'>Email: </label>
              <ErrorMessage
                name='email'
                component='span'
              />
              <Field
                autoComplete='off'
                id='email'
                type='email'
                name='email'
                placeholder='Email...'
              />
            </div>
            <div className='fieldContainer'>
              <label htmlFor='password'>Password: </label>
              <ErrorMessage
                name='password'
                component='span'
              />
              <Field
                type='password'
                autoComplete='off'
                id='password'
                name='password'
                placeholder='password...'
              />
              <span>{err}</span>
            </div>
            <button
              className='submit_btn'
              type='submit'
            >
              Create Account
            </button>
          </fieldset>
        </Form>
      </Formik>
    </div>
  )
}

export default SignupForm
