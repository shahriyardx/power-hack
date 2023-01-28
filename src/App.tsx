import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/registration" element={<Registration />} />
    </Routes>
  </BrowserRouter>
}

export default App
