import { useState, useEffect } from "react"
import { useQuery, useQueryClient } from "react-query"
import { API_BASE } from "../config"
import { BillingInput } from "../components/BillingModal"
import { useLocation } from "react-router-dom"
import { BillingData } from "../pages/Dashboard"

type Billing = {
  success: boolean
  billings?: Array<BillingData>
  message?: string
  pageCount: number
  totalPaid: number
}

export const useBillings = () => {
  const location = useLocation()
  const [page, setPage] = useState(1)

  const fetchBillings = () => {
    return fetch(`${API_BASE}/billing-list?page=${page}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "power_hack_accessToken"
        )}`,
      },
    }).then((response) => response.json())
  }

  const queryClient = useQueryClient()
  const { data, isLoading, isError, refetch } = useQuery<Billing>(
    ["billings", page],
    fetchBillings
  )

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const pageNum = Number(params.get("page")) || 1
    setPage(pageNum)
  }, [location, setPage])

  return { data, isLoading, isError, refetch, queryClient }
}
