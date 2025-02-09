"use client"
import AddProperty from "@/components/admin/AddProperty"
import { AppSidebar } from "@/components/admin/app-sidebar"
import EditProperty from "@/components/admin/EditProperty"
import UserPermission from "@/components/admin/UserPermission"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState } from "react"

export default function Page() {
    const [activeSelection, setActiveSelection] = useState("userPermission")
    const users = [
        { id: "1", fullName: "John Doe", email: "john.doe@example.com", role: "user" },
        { id: "2", fullName: "Jane Smith", email: "jane.smith@example.com", role: "admin" },
        // Add more users as needed
      ]
  return (
    <SidebarProvider>
      <AppSidebar setActiveSelection={setActiveSelection} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Admin Panel
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{activeSelection === "userPermission" ? "User Permissions" : "Property Data Control"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {activeSelection === "userPermission" && <UserPermission />}
        {activeSelection === "editProperty" && <AddProperty />}
        {activeSelection === "editProperty" && <EditProperty />}
      </SidebarInset>
    </SidebarProvider>
  )
}
