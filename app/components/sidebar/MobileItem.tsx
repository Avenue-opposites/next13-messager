
import clsx from 'clsx'
import Link from 'next/link'
import { DesktopItemProps } from './DesktopItem'

interface MobileFooterProps extends DesktopItemProps {}

const MobileItem: React.FC<MobileFooterProps> = ({
  label: _,
  href,
  icon: Icon,
  active,
  onClick
}) => {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={clsx(`
        group
        flex justify-center
        p-4
        text-gray-500
        hover:text-black
        hover:bg-gray-100
        gap-x-3  
        text-sm
        leading-6
        font-semibold
        w-full
      `,
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className="w-6 h-6" />
    </Link>
  )
}

export default MobileItem