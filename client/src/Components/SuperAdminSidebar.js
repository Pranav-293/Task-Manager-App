import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Super Admin Page's Sidebar component
 * @returns {Component} - Sidebar with links to admins and organizations page
 */
function SuperAdminSidebar() {
  return (
    <div className='Sidebar'>
      <div className="Admin"><NavLink  to="./admins">Admins</NavLink></div>
      <div className="Org"><NavLink to="./organizations">Organizations</NavLink></div>
    </div>
  )
}

export default SuperAdminSidebar
