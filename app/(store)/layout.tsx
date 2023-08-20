import { Navbar } from "@/components/navbar";

export default function StoreLayout({
  children, params
}: {
  children: React.ReactNode;
  params: {}
}) {
  return(
    <>
      <Navbar />
      {children}
    </>
  )
}