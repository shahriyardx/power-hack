import { useState } from "react"
import Layout from "../components/Layout"
import { BiSearch, BiPlus, BiLoaderAlt } from "react-icons/bi"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2"
import { Link, useLocation } from "react-router-dom"
import { useBillings } from "../hooks/useBillings"
import BillingModal, { BillingInput } from "../components/BillingModal"
import DeleteBillingModal from "../components/DeleteBillingModal"

export type BillingData = BillingInput & {
  loading: boolean
}

const Dashboard = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const perPage = 10
  const page = Number(params.get("page")) || 1
  const { data, refetch } = useBillings()

  const [searchQuery, setSearchQuery] = useState<string>("")

  const [tempBillings, setTempBillings] = useState<Array<BillingData>>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [editingBilling, setEditingBilling] = useState<BillingData>()

  const [isDelOpen, setIsDelOpen] = useState<boolean>(false)
  const [delId, setDelId] = useState<string>()

  const allBillings = tempBillings.concat(data?.billings || [])
  const tempPageCount = Math.ceil(allBillings.length / perPage)
  const pageCount = Math.max(tempPageCount, data?.pageCount || 0)

  const paginatedBillings = allBillings.slice(0, perPage)
  const filteredBillings = paginatedBillings.filter(
    (billng) =>
      billng.fullName.includes(searchQuery) ||
      billng.email.includes(searchQuery) ||
      billng.phone.includes(searchQuery)
  )
  
  return (
    <Layout>
      <div className="mt-10">
        <div className="grid grid-cols-1 sm:flex items-center gap-3 rounded-md">
          <p className="text-2xl font-bold text-zinc-700">Billings</p>

          <div className="flex gap-3 sm:ml-auto">
            <div className="flex items-center gap-1 bg-zinc-100 px-5 rounded-md flex-1">
              <BiSearch className="text-zinc-400 text-xl" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 w-full sm:max-w-[400px] border-0 outline-none focus:ring-0 py-3 bg-zinc-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.trim())}
              />
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="px-5 py-3 bg-black text-white rounded-md flex items-center gap-2"
            >
              Add New
              <BiPlus className="text-lg" />
            </button>
          </div>
        </div>

        <div className="mt-5 max-w-full overflow-x-auto">
          <table className="w-full border-2 border-zinc-200">
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
              {filteredBillings.map((billing) => {
                return (
                  <tr
                    key={billing._id}
                    className="
                      [&>*]:whitespace-nowrap [&>*]:text-left [&>*]:px-5 [&>*]:py-3
                      odd:bg-zinc-100
                      "
                  >
                    <td>
                      {billing.loading ? (
                        <BiLoaderAlt className="animate-spin" />
                      ) : (
                        billing._id
                      )}
                    </td>
                    <td>{billing.fullName}</td>
                    <td>{billing.email}</td>
                    <td>{billing.phone}</td>
                    <td>{billing.payableAmount}</td>
                    <td className="flex items-center gap-2 text-xl">
                      <button
                        disabled={billing.loading}
                        onClick={() => {
                          setEditingBilling(billing)
                          setIsOpen(true)
                        }}
                        className="px-3 py-2 bg-zinc-400 hover:bg-zinc-500 text-white rounded-md disabled:cursor-not-allowed"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        disabled={billing.loading}
                        onClick={() => {
                          setDelId(billing._id)
                          setIsDelOpen(true)
                        }}
                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md disabled:cursor-not-allowed"
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-center gap-3">
            <Link
              to={`/dashboard?page=${Math.max(1, page - 1)}`}
              className="w-8 h-8 grid place-items-center text-3xl"
            >
              <HiArrowLongLeft />
            </Link>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((i) => {
              return (
                <Link
                  key={i}
                  to={`/dashboard?page=${i}`}
                  className={`w-8 h-8 ${
                    page == i ? "bg-zinc-700" : "bg-zinc-400"
                  } grid place-items-center text-white`}
                >
                  {i}
                </Link>
              )
            })}

            <Link
              to={`/dashboard?page=${Math.min(pageCount, page + 1)}`}
              className="w-8 h-8 grid place-items-center text-3xl"
            >
              <HiArrowLongRight />
            </Link>
          </div>
        </div>
      </div>

      <BillingModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refetch={refetch}
        setTempBillings={setTempBillings}
        billingData={editingBilling}
      />
      {delId && (
        <DeleteBillingModal
          _id={delId}
          isOpen={isDelOpen}
          setIsOpen={setIsDelOpen}
          refetch={refetch}
        />
      )}
    </Layout>
  )
}

export default Dashboard
