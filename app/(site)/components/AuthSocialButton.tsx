import { IconType } from 'react-icons'

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick
}) => {
  return (
    <button 
      className="
        inline-flex justify-center
        w-full
        rounded-md
        bg-white
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1 ring-gray-300
        focus:outline-offset-0
        hover:bg-primary
        hover:text-white
        transition-colors
      "
      type="button"
      onClick={onClick}
    >
      <Icon />
    </button>

  )
}

export default AuthSocialButton