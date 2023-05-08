import React from 'react'
import { NavLink } from 'react-router-dom'

function SuperAdminSidebar() {
  return (
    <div className='Sidebar'>
      <div className="Admin"><NavLink  to="./admins">Admins</NavLink></div>
      <div className="Org"><NavLink to="./organizations">Organizations</NavLink></div>
    </div>
  )
}

export default SuperAdminSidebar
