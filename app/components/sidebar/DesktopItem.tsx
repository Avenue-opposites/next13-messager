import clsx from 'clsx'
import Link from 'next/link'
import { IconType } from 'react-icons'

export interface DesktopItemProps {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick
}) => {
  return (
    <li onClick={onClick}>
      <Link 
        className={clsx(`
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
        text-gray-500
        hover:text-black
        hover:bg-gray-100`,
          active && 'bg-gray-100 text-black'
        )}
        href={href}
      >
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem