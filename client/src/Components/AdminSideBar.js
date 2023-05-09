import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminSideBar() {
    return (
        <div className='Sidebar'>
          <div className="Admin"><NavLink  to="./users">Users</NavLink></div>
          <div className="Org"><NavLink to="./tasks">Tasks</NavLink></div>
        </div>
      )
}

export default AdminSideBar
