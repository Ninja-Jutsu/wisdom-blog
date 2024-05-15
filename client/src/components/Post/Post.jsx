import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Post.css'
import axios from 'axios'
import { currentUserContext } from '../CurrentUserProvider/CurrentUserProvider'

import formatDate from '../../helpers/date'

function Post({ post }) {
  const { user, setUser } = React.useContext(currentUserContext)
  const [isLiked, setIsLiked] = React.useState(false)
  const [likedBy, setLikedBy] = React.useState(post.likes)

  //check if post liked by user
  let initialLikeBtnColor
  if (user !== null) {
    if (likedBy.indexOf(user.user._id) !== -1) {
      initialLikeBtnColor = '#e92323'
    } else {
      initialLikeBtnColor = '#ffffff'
    }
  }

  const [likeIcon, setLikeIcon] = React.useState(initialLikeBtnColor)
  let createdOn = post.createdOn.toString()
  //format time:
  const hoursAgo = formatDate(createdOn)
  const navigate = useNavigate()

  function handleLike() {
    let state = isLiked ? 'add' : 'delete'
    axios.defaults.withCredentials = true
    const ObjectId = post._id
    const stringifyUserId = ObjectId.toString()
    axios
      .put(`https://wisdom-server-production.up.railway.app/api/posts/likes/${state}/${stringifyUserId}`, { user: user.user._id })
      .then((response) => {
        setUser({ ...user })
        setIsLiked(!isLiked)
        if (state === 'add' && likedBy.indexOf(user.user._id) === -1) {
          const likers = [...likedBy, user.user._id]
          setLikeIcon('#e92323')
          setLikedBy(likers)
        } else if (state === 'delete' && likedBy.indexOf(user.user._id) !== -1) {
          const likers = likedBy.filter((value) => value !== user.user._id)
          setLikeIcon('#ffffff')
          setLikedBy(likers)
        }
        navigate('/')
      })
      .catch((error) => {
        console.error('Error connecting to server:', error)
        console.log('/errorFetchPage')
        // Handle errors appropriately (e.g., redirect to login if unauthorized)
      })
  }
  return (
    <section className='postCard'>
      <div className='post_header'>
        <Link
          className='postTitle arabic-text-font'
          to={`posts/${post._id}`}
        >
          {post.title}
        </Link>
        <Link
          to={`${`/profile/${post.user._id}`}`}
          className='user'
        >
          {post.user.username}
        </Link>
      </div>
      <div className='post_body'>
        <Link
          className='postDesc arabic-text-font'
          to={`/posts/${post._id}`}
        >
          {post.desc}
        </Link>
        <div className='post_body_separator'></div>
      </div>
      <div className='post_subDetails'>
        <div
          className='post_likes'
          onClick={handleLike}
        >
          {/* <svg src={`${process.env.PUBLIC_URL}/like.svg`}/> */}
          <svg
            className='like-svg'
            width='20px'
            height='20px'
            viewBox='0 0 24 24'
            stroke={likeIcon}
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M20.9752 12.1852L20.2361 12.0574L20.9752 12.1852ZM20.2696 16.265L19.5306 16.1371L20.2696 16.265ZM6.93777 20.4771L6.19056 20.5417L6.93777 20.4771ZM6.12561 11.0844L6.87282 11.0198L6.12561 11.0844ZM13.995 5.22142L14.7351 5.34269V5.34269L13.995 5.22142ZM13.3323 9.26598L14.0724 9.38725V9.38725L13.3323 9.26598ZM6.69814 9.67749L6.20855 9.10933H6.20855L6.69814 9.67749ZM8.13688 8.43769L8.62647 9.00585H8.62647L8.13688 8.43769ZM10.5181 4.78374L9.79208 4.59542L10.5181 4.78374ZM10.9938 2.94989L11.7197 3.13821V3.13821L10.9938 2.94989ZM12.6676 2.06435L12.4382 2.77841L12.4382 2.77841L12.6676 2.06435ZM12.8126 2.11093L13.042 1.39687L13.042 1.39687L12.8126 2.11093ZM9.86195 6.46262L10.5235 6.81599V6.81599L9.86195 6.46262ZM13.9047 3.24752L13.1787 3.43584V3.43584L13.9047 3.24752ZM11.6742 2.13239L11.3486 1.45675V1.45675L11.6742 2.13239ZM3.9716 21.4707L3.22439 21.5353L3.9716 21.4707ZM3 10.2342L3.74721 10.1696C3.71261 9.76945 3.36893 9.46758 2.96767 9.4849C2.5664 9.50221 2.25 9.83256 2.25 10.2342H3ZM20.2361 12.0574L19.5306 16.1371L21.0087 16.3928L21.7142 12.313L20.2361 12.0574ZM13.245 21.25H8.59635V22.75H13.245V21.25ZM7.68498 20.4125L6.87282 11.0198L5.3784 11.149L6.19056 20.5417L7.68498 20.4125ZM19.5306 16.1371C19.0238 19.0677 16.3813 21.25 13.245 21.25V22.75C17.0712 22.75 20.3708 20.081 21.0087 16.3928L19.5306 16.1371ZM13.2548 5.10015L12.5921 9.14472L14.0724 9.38725L14.7351 5.34269L13.2548 5.10015ZM7.18773 10.2456L8.62647 9.00585L7.64729 7.86954L6.20855 9.10933L7.18773 10.2456ZM11.244 4.97206L11.7197 3.13821L10.2678 2.76157L9.79208 4.59542L11.244 4.97206ZM12.4382 2.77841L12.5832 2.82498L13.042 1.39687L12.897 1.3503L12.4382 2.77841ZM10.5235 6.81599C10.8354 6.23198 11.0777 5.61339 11.244 4.97206L9.79208 4.59542C9.65573 5.12107 9.45699 5.62893 9.20042 6.10924L10.5235 6.81599ZM12.5832 2.82498C12.8896 2.92342 13.1072 3.16009 13.1787 3.43584L14.6307 3.05921C14.4252 2.26719 13.819 1.64648 13.042 1.39687L12.5832 2.82498ZM11.7197 3.13821C11.7548 3.0032 11.8523 2.87913 11.9998 2.80804L11.3486 1.45675C10.8166 1.71309 10.417 2.18627 10.2678 2.76157L11.7197 3.13821ZM11.9998 2.80804C12.1345 2.74311 12.2931 2.73181 12.4382 2.77841L12.897 1.3503C12.3873 1.18655 11.8312 1.2242 11.3486 1.45675L11.9998 2.80804ZM14.1537 10.9842H19.3348V9.4842H14.1537V10.9842ZM4.71881 21.4061L3.74721 10.1696L2.25279 10.2988L3.22439 21.5353L4.71881 21.4061ZM3.75 21.5127V10.2342H2.25V21.5127H3.75ZM3.22439 21.5353C3.2112 21.3828 3.33146 21.25 3.48671 21.25V22.75C4.21268 22.75 4.78122 22.1279 4.71881 21.4061L3.22439 21.5353ZM14.7351 5.34269C14.8596 4.58256 14.8241 3.80477 14.6307 3.0592L13.1787 3.43584C13.3197 3.97923 13.3456 4.54613 13.2548 5.10016L14.7351 5.34269ZM8.59635 21.25C8.12244 21.25 7.72601 20.887 7.68498 20.4125L6.19056 20.5417C6.29852 21.7902 7.3427 22.75 8.59635 22.75V21.25ZM8.62647 9.00585C9.30632 8.42 10.0392 7.72267 10.5235 6.81599L9.20042 6.10924C8.85404 6.75767 8.3025 7.30493 7.64729 7.86954L8.62647 9.00585ZM21.7142 12.313C21.9695 10.8365 20.8341 9.4842 19.3348 9.4842V10.9842C19.9014 10.9842 20.3332 11.4959 20.2361 12.0574L21.7142 12.313ZM3.48671 21.25C3.63292 21.25 3.75 21.3684 3.75 21.5127H2.25C2.25 22.1953 2.80289 22.75 3.48671 22.75V21.25ZM12.5921 9.14471C12.4344 10.1076 13.1766 10.9842 14.1537 10.9842V9.4842C14.1038 9.4842 14.0639 9.43901 14.0724 9.38725L12.5921 9.14471ZM6.87282 11.0198C6.8474 10.7258 6.96475 10.4378 7.18773 10.2456L6.20855 9.10933C5.62022 9.61631 5.31149 10.3753 5.3784 11.149L6.87282 11.0198Z' />
          </svg>
          <p className='numOfLikes'>{post.likes.length}</p>
        </div>
        <p className='post_date'>{hoursAgo} hours ago</p>
        <p className='post_comments'>
          <svg
            className='comment-svg'
            width='30px'
            height='30px'
            viewBox='0 0 25 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M5.5 14.2606C5.51486 16.2065 7.10302 17.7728 9.049 17.7606H9.53L10.952 19.2606C11.0963 19.4094 11.2947 19.4934 11.502 19.4934C11.7093 19.4934 11.9077 19.4094 12.052 19.2606L13.474 17.7606H13.955C15.8994 17.7706 17.4851 16.205 17.5 14.2606V10.0006C17.4851 8.05461 15.897 6.48838 13.951 6.50057H9.051C7.10424 6.48727 5.51486 8.05382 5.5 10.0006V14.2606Z'
              stroke='#000000'
              strokeWidth='0.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M7.25 6.5006C7.25 6.91481 7.58579 7.2506 8 7.2506C8.41421 7.2506 8.75 6.91481 8.75 6.5006H7.25ZM16.449 4.0006V4.75073L16.4629 4.75047L16.449 4.0006ZM18.9332 4.97613L18.4128 5.51618L18.4128 5.51618L18.9332 4.97613ZM20 7.4226H20.7501L20.7499 7.40875L20 7.4226ZM17.5 14.2506C17.0858 14.2506 16.75 14.5864 16.75 15.0006C16.75 15.4148 17.0858 15.7506 17.5 15.7506V14.2506ZM8.5 10.2506C8.08579 10.2506 7.75 10.5864 7.75 11.0006C7.75 11.4148 8.08579 11.7506 8.5 11.7506V10.2506ZM14.265 11.7506C14.6792 11.7506 15.015 11.4148 15.015 11.0006C15.015 10.5864 14.6792 10.2506 14.265 10.2506V11.7506ZM9.221 12.3586C8.80679 12.3586 8.471 12.6944 8.471 13.1086C8.471 13.5228 8.80679 13.8586 9.221 13.8586V12.3586ZM13.544 13.8586C13.9582 13.8586 14.294 13.5228 14.294 13.1086C14.294 12.6944 13.9582 12.3586 13.544 12.3586V13.8586ZM8.75 6.5006C8.75 5.81137 9.01573 5.43293 9.42787 5.18347C9.8982 4.89877 10.6233 4.7506 11.549 4.7506V3.2506C10.5147 3.2506 9.4653 3.40742 8.65113 3.90023C7.77877 4.42827 7.25 5.29983 7.25 6.5006H8.75ZM11.549 4.7506H16.449V3.2506H11.549V4.7506ZM16.4629 4.75047C17.1887 4.73702 17.8901 5.01246 18.4128 5.51618L19.4537 4.43609C18.6445 3.6563 17.5587 3.22991 16.4351 3.25073L16.4629 4.75047ZM18.4128 5.51618C18.9355 6.01991 19.2367 6.71065 19.2501 7.43645L20.7499 7.40875C20.7291 6.28518 20.2629 5.21587 19.4537 4.43609L18.4128 5.51618ZM19.25 7.4226V11.5786H20.75V7.4226H19.25ZM19.25 11.5786C19.25 12.4864 19.1243 13.1709 18.8585 13.6099C18.6354 13.9783 18.2701 14.2506 17.5 14.2506V15.7506C18.7299 15.7506 19.6146 15.2569 20.1415 14.3868C20.6257 13.5873 20.75 12.5608 20.75 11.5786H19.25ZM8.5 11.7506H14.265V10.2506H8.5V11.7506ZM9.221 13.8586H13.544V12.3586H9.221V13.8586Z'
              fill='#ffffff'
            />
          </svg>
          <span>{post.comments.length}</span>
        </p>
      </div>
    </section>
  )
}

export default Post
