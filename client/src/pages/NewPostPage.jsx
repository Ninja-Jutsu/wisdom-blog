import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'
axios.defaults.withCredentials = true //allow exchange with backend

export default function NewPostPage() {
  const { user } = React.useContext(currentUserContext)
  let userId
  if (user !== null) {
    userId = user.user._id.toString()
  }
  const navigate = useNavigate()
  const initialValues = {
    title: '',
    desc: '',
    user: userId,
  }
  function onSubmit(data) {
    axios
      .post('https://wisdom-server-production.up.railway.app/api/posts/create', data)
      .then((response) => {
        navigate('/')
      })
      .catch((error) => {
        console.error('Error connecting to server:', error)
        console.log('/errorFetchPage')
        // Handle errors appropriately (e.g., redirect to login if unauthorized)
      })
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(5, ' Title must be at least 5 charts long'),
    desc: Yup.string().required('Description is required'),
    user: Yup.string(),
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
            <legend>Personalia:</legend>
            <div className='fieldContainer'>
              <label htmlFor='title'>Title: </label>
              <ErrorMessage
                name='title'
                component='span'
              />
              <Field
                // autoComplete='off'
                id='title'
                name='title'
                type='text'
                placeholder='Title...'
              />
            </div>
            <div className='fieldContainer'>
              <label htmlFor='desc'>Description: </label>
              <ErrorMessage
                name='desc'
                component='span'
              />
              <Field
                // autoComplete='off'
                rows='10'
                cols='30'
                component="textarea" 
                id='desc'
                name='desc'
                placeholder='Description...'
              />
            </div>
            <Field
              id='user'
              name='user'
              style={{ display: 'none' }}
            />
            <button className = "submit_btn" type='submit'>Create Post</button>
          </fieldset>
        </Form>
      </Formik>
    </div>
  )
}
