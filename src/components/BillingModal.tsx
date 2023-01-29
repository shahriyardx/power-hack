import { Transition, Dialog } from "@headlessui/react"
import { Dispatch, Fragment, SetStateAction, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRef } from "react"
import { useMutation } from "react-query"
import { API_BASE } from "../config"
import { toast } from "react-hot-toast"

export type BillingInput = {
  _id?: string
  fullName: string
  email: string
  phone: string
  payableAmount: number
}

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  billingData?: BillingInput
  refetch: () => void
  setTempBillings: Dispatch<SetStateAction<Array<BillingInput>>>
}

const BillingModal = ({
  isOpen,
  setIsOpen,
  billingData,
  refetch,
  setTempBillings,
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingInput>()

  const closeModal = () => {
    setIsOpen(false)
  }

  const addOrUpdateTodo = (values: BillingInput) => {
    const url = `${API_BASE}/${
      values._id ? `update-billing/${values._id}` : "add-billing"
    }`
    const method = values._id ? "PUT" : "POST"

    return fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "power_hack_accessToken"
        )}`,
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to insert data into database. Please try again")
      }

      return response.json()
    })
  }
  const { mutate } = useMutation(addOrUpdateTodo)

  const submitHandler = (values: BillingInput) => {
    const payload = { ...values, payableAmount: Number(values.payableAmount) }
    const identifier = Math.random().toString()

    if (!billingData) {
      setTempBillings((prev) => [...prev, { ...payload, _id: identifier }])
    }

    setIsOpen(false)

    mutate(payload, {
      onSuccess: () => {
        refetch()
      },
      onError: (error: any) => {
        toast.error(error.message as string)
      },
      onSettled: () => {
        reset()
        setTempBillings((prev) =>
          prev.filter((billing) => billing._id !== identifier)
        )
      },
    })
  }

  useEffect(() => {
    if (billingData) {
      reset(billingData)
    }
  }, [billingData, reset])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {billingData ? "Update Billing" : "Add Billing"}
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit(submitHandler)}
                    className="flex flex-col gap-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="text-xs"
                          {...register("fullName", {
                            required: {
                              value: true,
                              message: "full name is required",
                            },
                          })}
                        />
                        <span className="text-xs text-red-500">
                          {errors.fullName?.message}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="text"
                          placeholder="Phone"
                          className="text-xs"
                          {...register("phone", {
                            required: {
                              value: true,
                              message: "phone is required",
                            },
                            minLength: {
                              value: 11,
                              message: "phone number must be 11 character",
                            },
                            maxLength: {
                              value: 11,
                              message: "phone number must be 11 character",
                            },
                          })}
                        />
                        <span className="text-xs text-red-500">
                          {errors.phone?.message}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        placeholder="Email"
                        className="text-xs"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "email is required",
                          },
                          pattern: {
                            value:
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "please enter a valid email",
                          },
                        })}
                      />
                      <span className="text-xs text-red-500">
                        {errors.email?.message}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="amount">Payable Amount</label>
                      <input
                        type="number"
                        placeholder="Payable Amount"
                        className="text-xs"
                        {...register("payableAmount", {
                          required: {
                            value: true,
                            message: "payable amount is required",
                          },
                          min: {
                            value: 1,
                            message: "amount is too low",
                          },
                        })}
                      />
                      <span className="text-xs text-red-500">
                        {errors.payableAmount?.message}
                      </span>
                    </div>

                    <div className="mt-4">
                      {billingData ? (
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Update Billing
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        >
                          Create Billing
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default BillingModal
