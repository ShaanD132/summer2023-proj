import { MainNav } from "@/components/main-nav"
import { Heading } from "@/components/ui/heading"

export const Navbar = () => {
  return(
    <div className = "border-b">
      <div className = "flex h-16 items-center px-4">
        <div className = "ml-2">
          <Heading
          title = "Marelia"
          description=""
          />
        </div>

        <MainNav className = "mx-6"/>
      </div>
    </div>
  )
}