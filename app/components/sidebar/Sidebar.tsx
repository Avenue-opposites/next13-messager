import getCurrentUser from '~/app/actions/getCurrentUser'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'

export default async function Sidebar({ 
  children 
}:{ 
  children: React.ReactNode 
}){
  const user = await getCurrentUser()

  return (
    <div className="h-full">
      <DesktopSidebar user={user!} />
      <MobileFooter user={user!} />
      <main className="lg:pl-20 h-screen">
        {children}
      </main>
    </div>
  )
}
