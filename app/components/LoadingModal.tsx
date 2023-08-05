'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingModal = () => {
  return (
    <Transition.Root show as={Fragment}>
      <Dialog className="relative z-50" onClose={() => { }}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel>
              <ClipLoader size={40} color="#087ea4" />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default LoadingModal;