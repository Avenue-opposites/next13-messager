import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '~/app/components/Modal'
import { FiAlertTriangle } from 'react-icons/fi'
import useConversation from '~/app/hooks/useConversation'
import { Dialog } from '@headlessui/react'
import Button from '~/app/components/Button'

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen = false,
  onClose
}) => {
  const router = useRouter()
  const { conversationId } = useConversation()
  const [isLoading, setIsLoading] = useState(false)
  const onDelete = useCallback(() => {
    setIsLoading(true)
    axios.delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose()
        router.push('/conversations')
        router.refresh()
      })
      .catch(() => toast.error("发生了错误，删除失败！"))
      .finally(() => setIsLoading(false))
  }, [router, conversationId, onClose])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="
            mx-auto flex w-12 h-12 flex-shrink-0
            items-center rounded-full justify-center
            bg-red-100 sm:mx-0 sm:w-10 sm:h-10
          "
        >
          <FiAlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div
          className="
              mt-3 text-center sm:ml-4 sm:mt-0
              sm:text-left
            "
        >
          <Dialog.Title
            className="
                text-base font-semibold leading-6
                text-gray-900
              "
            as="h2"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you went to delete this conversation? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-row-reverse gap-2">
        <Button
          variant="danger"
          disabled={isLoading}
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;