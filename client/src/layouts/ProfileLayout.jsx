import { Outlet } from 'react-router-dom'
export default function ProfileLayout() {
  return (
    <div>
      <h2 id='main-header'>User Details</h2>
      <Outlet />
    </div>
  )
}