import { AdminNavbar } from "@/components/admin-navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const {userId} = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  if (userId !== "user_2UCVGbjTJN0VPcYp7dRuiGAZ1Mb") {
    redirect("/")
  }


  return(
    <>
      <AdminNavbar />
      {children}
    </>
  )
}