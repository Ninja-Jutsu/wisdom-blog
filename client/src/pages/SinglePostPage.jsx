/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams, useLoaderData } from 'react-router-dom'
import { useNavigate, Link } from 'react-router-dom'
import formatDate from '../helpers/date'
import axios from 'axios'
import { currentUserContext } from '../components/CurrentUserProvider/CurrentUserProvider'

function SinglePostPage() {
  const { user } = React.useContext(currentUserContext)
  const [value, setValue] = React.useState('')
  const { id } = useParams()
  const userId = user.user._id
  const selectedPost = useLoaderData()
  const navigate = useNavigate()
  function submitComment(e) {
    e.preventDefault()
    axios
      .post('http://localhost:5000/API/comments/create', { text: value, post: id, user: userId })
      .then((res) => {
        navigate(`/posts/${id}`)
        setValue('')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='post_container'>
      <div className='post_details'>
        <h3 className='title'>{selectedPost.post.title}</h3>
        <p>{selectedPost.post.desc}</p>
      </div>
      <div className='allComments'>
        {selectedPost.post_comments.map((comment) => {
          let createdOn = comment.createdOn.toString()
          const formattedDate = formatDate(createdOn)
          return (
            <div
              key={comment._id}
              className='individual_comment'
            >
              <p>{comment.text}</p>
              <div className='comments_details'>{formattedDate} hours ago</div>
            </div>
          )
        })}
      </div>
      <form className='comment_form'>
        {/* <label htmlFor='comment'>Comment:</label> */}
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
        <button
          type='submit'
          className='submit_btn'
          onClick={submitComment}
        >
          Add comment
        </button>
      </form>
    </div>
  )
}

export async function postLoader({ params }) {
  const { id } = params
  const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
    method: 'GET',
    credentials: 'include', // 'include' is equivalent to true
  })
  const json = await response.json()
  return json
}
export default SinglePostPage
