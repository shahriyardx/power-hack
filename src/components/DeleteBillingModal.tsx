import { Transition, Dialog } from "@headlessui/react"
import { Dispatch, Fragment, SetStateAction, useEffect } from "react"
import { useMutation } from "react-query"
import { API_BASE } from "../config"
import { toast } from "react-hot-toast"
import { BiLoaderAlt } from "react-icons/bi"

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  _id: string
  refetch: () => void
}

const DeleteBillingModal = ({ isOpen, setIsOpen, refetch, _id }: Props) => {
  const closeModal = () => {
    setIsOpen(false)
  }

  const deleteBilling = (billingId: string) => {
    const url = `${API_BASE}/delete-billing/${billingId}`
    console.log(url)

    return fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "power_hack_accessToken"
        )}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete billing")
      }

      return response.json()
    })
  }
  const { mutate, isLoading } = useMutation(deleteBilling)

  const deleteHandler = () => {
    mutate(_id, {
      onSuccess: () => {
        refetch()
      },
      onError: (error: any) => {
        toast.error(error.message as string)
      },
      onSettled: () => {
        setIsOpen(false)
      },
    })
  }

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
                  Delete billing {_id}?
                </Dialog.Title>
                <div className="mt-2">
                  <p>This action can't be undone. Proceed?</p>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={deleteHandler}
                      disabled={isLoading}
                      className="
                        inline-flex items-center gap-2 justify-center rounded-md border border-transparent 
                        bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed
                      "
                    >
                      {isLoading && <BiLoaderAlt className="animate-spin" />}
                      Delete
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="
                        inline-flex justify-center rounded-md border border-transparent 
                        bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2
                      "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DeleteBillingModal
