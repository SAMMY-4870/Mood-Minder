import { Sidebar } from '@/components/Sidebar'
import { ChatDock } from '@/components/ChatDock'

export default function AuthedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <div className="p-6">
          {children}
        </div>
      </div>
      <ChatDock />
    </div>
  )
}

