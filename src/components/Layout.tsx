import React from "react"
import Header from "./Header"

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />

      <main className="container mx-auto px-5">{children}</main>
    </div>
  )
}

export default Layout
