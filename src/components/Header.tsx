import { useEffect } from "react"
import { useJwt } from "react-jwt"
import { NavLink, useNavigate, useLocation } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("power_hack_accessToken") as string)

  const logout = () => {
    localStorage.removeItem("power_hack_accessToken")
    navigate("/login")
  }

  useEffect(() => {
    if (!decodedToken && isExpired) {
      if (location.pathname === "/dashboard") {
        navigate("/login")
      }
    }
  }, [decodedToken, isExpired])

  return (
    <div className="bg-zinc-900 text-zinc-300">
      <div className="container mx-auto p-5 flex items-center">
        <h3 className="text-2xl font-bold">Power Hack</h3>
        {!decodedToken ? (
          <div className="ml-auto">
            <div className="flex items-center gap-5 text-xl">
              <NavLink to="/login" className={({ isActive }) => isActive ? 'text-indigo-400 underline underline-offset-2' : ''}>Login</NavLink>
              <NavLink to="/registration" className={({ isActive }) => isActive ? 'text-indigo-400 underline underline-offset-2' : ''}>Registration</NavLink>
            </div>
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-3">
            <button onClick={logout} className="px-3 py-2 bg-red-500 text-white rounded-md text-sm">Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
