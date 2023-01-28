import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
