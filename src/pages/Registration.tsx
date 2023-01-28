import React from "react"
import { useForm } from "react-hook-form"
import Layout from "../components/Layout"

type RegistrationInput = {
  email: string
  password: string
}

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput>()
  
  const handleRegister = (values: RegistrationInput) => {
    console.log(values)
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-20">
        <h2 className="text-indigo-500 text-7xl font-bold text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(handleRegister)} className="mt-10">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required",
                  },
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "please enter a valid email",
                  },
                })}
              />
              <span className="text-sm text-red-500">
                {errors.email?.message}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-lg font-semibold">
                Password
              </label>
              <input
                type="text"
                placeholder="Email"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "password must be minimum 6 character",
                  },
                  maxLength: {
                    value: 32,
                    message: "password can't be more than 32 character",
                  },
                })}
              />
              <span className="text-sm text-red-500">
                {errors.password?.message}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white w-full mt-5 text-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Registration
