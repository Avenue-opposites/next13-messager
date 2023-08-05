'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, WheelEventHandler } from 'react'
import { IoClose } from 'react-icons/io5'

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  image: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen = false,
  onClose,
  image
}) => {
  let scale = 1
  const handleWheel: WheelEventHandler = (event) => {
    const { deltaY, target, clientX, clientY } = event
    const value = +(deltaY / 1000).toFixed(2)
    const { top, left, width, height } = (target as Element).getBoundingClientRect()
    const x = clientX - left
    const y = clientY - top
    
    if (deltaY > 0) {
      (target as HTMLImageElement).style.transform = `scale(${scale})`
    }

    if (deltaY < 0) {
      (target as HTMLImageElement).style.transform = `scale(${scale})`
    }
    (target as HTMLImageElement).style.transformOrigin = `${(x / width * 100).toFixed(2)}% ${(y / height * 100).toFixed(2)}%`
    const newValue = +(scale + value).toFixed(2)
    scale = newValue > 1 ? newValue : 1;
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        className="relative z-50"
        onClose={onClose}
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <div
            className="
            fixed inset-0 bg-gray-900 
            bg-opacity-75 transition-opacity
            flex justify-center items-center
          "
          >
            <button
              className="hidden absolute z-10 right-5 top-5 sm:block"
              type="button"
            >
              <span className="sr-only">Close</span>
              <IoClose size={40} color="white" />
            </button>
            <Dialog.Panel
              onWheelCapture={handleWheel}
              src={image}
              alt="image"
              className="m-8 object-cover w-2/3 h-[auto]" as="img"
            />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

export default ImageModal;