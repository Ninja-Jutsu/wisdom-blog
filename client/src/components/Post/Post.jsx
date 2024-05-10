import React from 'react'
import { Link } from 'react-router-dom'
import './Post.css'
// import AddToCartInput from '../AddToCartInput/AddToCartInput.jsx'

function Post({ post }) {
  //format time:
  let createdOn = post.createdOn.toString()
  const date = new Date(createdOn)
  const now = Date.now()
  const diffInMilliseconds = now - date.getTime()
  const hoursAgo = Math.floor(diffInMilliseconds / (1000 * 3600))

  console.log(`${hoursAgo} hours ago`)
  return (
    <section className='postCard'>
      <div className='postTitle'>
        <Link to={`posts/${post._id}`}>{post.title}</Link>
      </div>
      <div className='postDesc'>
        <Link to={`/posts/${post._id}`}> {post.desc}</Link>
      </div>
      <div className='subDetails'>
        <p className='date'>{hoursAgo} hours ago</p>
        <Link
          to={`${`/profile/${post.user._id}`}`}
          className='user'
        >
          {post.user.username}
        </Link>
      </div>
    </section>
  )
}

export default Post
