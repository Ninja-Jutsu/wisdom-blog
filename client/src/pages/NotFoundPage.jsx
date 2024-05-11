import React from 'react'
import { Link } from 'react-router-dom'
function NotFoundPage() {
  return <div>No Such Page
    <Link to='/'>Homepage</Link>
  </div>
}

export default NotFoundPage
