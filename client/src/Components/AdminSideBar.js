import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Sidebar Component
 * @returns Sidebar Component which contains links to users and tasks page
 */
function AdminSideBar() {
    return (
        <div className='Sidebar'>
          <div className="Admin"><NavLink  to="./users">Users</NavLink></div>
          <div className="Org"><NavLink to="./tasks">Tasks</NavLink></div>
        </div>
      )
}

export default AdminSideBar
