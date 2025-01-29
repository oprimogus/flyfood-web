import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/sidebar/dashboard-sidebar"
import { auth } from "../auth"
import { redirect } from "next/navigation"


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session) {
        redirect('/')
    }
    return (
        <SidebarProvider>
            <DashboardSidebar session={session} />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}