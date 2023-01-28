import React from "react"
import Layout from "../components/Layout"
import { BiSearch, BiPlus, BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2"
import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <Layout>
      <div className="mt-10">
        <div className="flex items-center px-5 py-2 gap-3 rounded-md">
          <p className="text-2xl font-bold text-zinc-700">Billings</p>

          <div className="flex items-center gap-1 bg-zinc-100 px-5 rounded-md ml-auto">
            <BiSearch className="text-zinc-400 text-xl" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 max-w-[400px] border-0 outline-none focus:ring-0 py-3 bg-zinc-100"
            />
          </div>

          <button className="px-5 py-3 bg-black text-white rounded-md flex items-center gap-2">
            Add New
            <BiPlus className="text-lg" />
          </button>
        </div>

        <div className="mt-5">
          <table className="w-full">
            <thead>
              <tr
                className="
                  [&>*]:whitespace-nowrap [&>*]:text-left [&>*]:px-5 [&>*]:py-3
                  bg-zinc-500 text-zinc-100
                  "
              >
                <th>Billing ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Paid Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                className="
                  [&>*]:whitespace-nowrap [&>*]:text-left [&>*]:px-5 [&>*]:py-3
                  odd:bg-zinc-100
                  "
              >
                <td>1</td>
                <td>Md Shahriyar Alam</td>
                <td>mdshahriyaralam9@gmail.com</td>
                <td>01761333883</td>
                <td>100</td>
                <td className="flex items-center gap-2 text-xl">
                  <button className="px-3 py-2 bg-zinc-400 hover:bg-zinc-500 text-white rounded-md">
                    <AiOutlineEdit />
                  </button>
                  <button className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>

              <tr
                className="
                  [&>*]:whitespace-nowrap [&>*]:text-left [&>*]:px-5 [&>*]:py-3
                  odd:bg-zinc-100
                  "
              >
                <td>1</td>
                <td>Md Shahriyar Alam</td>
                <td>mdshahriyaralam9@gmail.com</td>
                <td>01761333883</td>
                <td>100</td>
                <td className="flex items-center gap-2 text-xl">
                  <button className="px-3 py-2 bg-zinc-400 hover:bg-zinc-500 text-white rounded-md">
                    <AiOutlineEdit />
                  </button>
                  <button className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>

              <tr
                className="
                  [&>*]:whitespace-nowrap [&>*]:text-left [&>*]:px-5 [&>*]:py-3
                  odd:bg-zinc-100
                  "
              >
                <td>1</td>
                <td>Md Shahriyar Alam</td>
                <td>mdshahriyaralam9@gmail.com</td>
                <td>01761333883</td>
                <td>100</td>
                <td className="flex items-center gap-2 text-xl">
                  <button className="px-3 py-2 bg-zinc-400 hover:bg-zinc-500 text-white rounded-md">
                    <AiOutlineEdit />
                  </button>
                  <button className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-10">
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="w-8 h-8 grid place-items-center text-3xl"
              >
                <HiArrowLongLeft />
              </Link>
              <Link
                to="/login"
                className="w-8 h-8 bg-zinc-700 grid place-items-center text-white"
              >
                1
              </Link>

              <Link
                to="/login"
                className="w-8 h-8 bg-zinc-400 grid place-items-center text-white"
              >
                2
              </Link>

              <Link
                to="/login"
                className="w-8 h-8 bg-zinc-400 grid place-items-center text-white"
              >
                3
              </Link>
              <Link
                to="/login"
                className="w-8 h-8 grid place-items-center text-3xl"
              >
                <HiArrowLongRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
