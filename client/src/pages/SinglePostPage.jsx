/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams, useLoaderData } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom'

function SinglePostPage() {
  const [value, setValue] = React.useState('')
  const { id } = useParams()
  const selectedPost = useLoaderData()

  return (
    <div>
      <h1 className='title'>{selectedPost.post.title}</h1>
      <form>
        <label htmlFor='comment'>Comment:</label>
        <input
          id='comment'
          name='comment'
          type='text'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          placeholder='add comment...'
        />
      </form>
    </div>
  )
}

export async function postLoader({ params }) {
  const { id } = params
  console.log('loader')
  const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
    method: 'GET',
    credentials: 'include', // 'include' is equivalent to true
  })
  const json = await response.json()
  console.log('loader: ' + json)
  return json
}
export default SinglePostPage
