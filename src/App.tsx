import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  </BrowserRouter>
}

export default App
