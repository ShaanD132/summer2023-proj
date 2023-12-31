import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function StoreLayout({
  children, params
}: {
  children: React.ReactNode;
  params: {}
}) {

  const {userId} = auth();

  if (!userId) {
    redirect("/sign-in")
  }

  return(
    <>
      {children}
    </>
  )
}