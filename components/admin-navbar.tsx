import { Heading } from "@/components/ui/heading"
import { AdminNav } from "@/components/admin-nav"
import { UserButton, auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ModeToggle } from "@/components/theme-toggle"

export const AdminNavbar = () => {

  const {userId} = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return(
    <div className = "border-b">
      <div className = "flex h-16 items-center px-4">
        <div className = "ml-2">
          <Heading
          title = "Marelia-Admin"
          description=""
          />
        </div>

        <AdminNav className = "mx-6"/>

        <div className = "ml-auto flex items-center space-x-4">
          <div className="mx-3">
            <ModeToggle />
          </div>

          <div className="mx-3">
            <UserButton afterSignOutUrl="/"/>
          </div>
        </div>
      </div>
    </div>
  )
}