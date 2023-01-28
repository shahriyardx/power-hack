import React from "react"
import Layout from "../components/Layout"

const Registration = () => {
  return (
    <Layout>
      <div className="max-w-lg mx-auto py-20">
        <h2 className="text-indigo-500 text-7xl font-bold text-center">Sign Up</h2>

        <form className="mt-10">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input type="text" placeholder="Email" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-lg font-semibold">
                Password
              </label>
              <input type="email" placeholder="Email" />
            </div>
          </div>

          <button className="px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white w-full mt-5 text-lg">
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Registration
