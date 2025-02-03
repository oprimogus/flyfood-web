import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/sidebar/dashboard-sidebar"
import { auth } from "../auth"
import { redirect } from "next/navigation"


export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session) {
        redirect('/')
    }
    return (
        <SidebarProvider>
            <DashboardSidebar session={session} />
            <main className="flex-1 flex flex-col p-6 overflow-auto">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}