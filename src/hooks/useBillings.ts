import { useQuery, useQueryClient } from "react-query"
import { API_BASE } from "../config"
import { BillingInput } from "../components/BillingModal"

const fetchBillings = () => {
    return fetch(`${API_BASE}/billing-list`, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("power_hack_accessToken")}`
        }
    }).then(response => response.json())
}

type BillingData= {
    success: boolean
    billings?: Array<BillingInput>
    message?: string
}

export const useBillings = () => {
    const queryClient = useQueryClient()
    const { data, isLoading, isError, refetch } = useQuery<BillingData>('billings', fetchBillings)

    return { data, isLoading, isError, refetch, queryClient }
}