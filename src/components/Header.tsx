import React from "react"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <div className="bg-zinc-900 text-zinc-300">
      <div className="container mx-auto p-5 flex items-center">
        <h3 className="text-2xl font-bold">Power Hack</h3>
        <div className="ml-auto">
          <div className="flex items-center gap-5 text-xl">
            <NavLink to="/login" className={({ isActive }) => isActive ? 'text-indigo-400 underline underline-offset-2' : ''}>Login</NavLink>
            <NavLink to="/registration" className={({ isActive }) => isActive ? 'text-indigo-400 underline underline-offset-2' : ''}>Registration</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
