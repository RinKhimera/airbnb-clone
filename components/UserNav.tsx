import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DefaultUserLogo from "@/public/default-user.jpeg"
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { MenuIcon } from "lucide-react"
import Image from "next/image"

const UserNav = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const getInitials = (
    firstName: string | null,
    lastName: string | null,
  ): string => {
    if (firstName === null && lastName === null) return "XO"

    const firstInitial = firstName?.charAt(0).toUpperCase()
    const lastInitial = lastName?.charAt(0).toUpperCase()
    return `${firstInitial}${lastInitial}`
  }

  console.log(user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-x-3 rounded-full border px-2 py-2 lg:px-4">
          <MenuIcon className="size-6 lg:size-5" />

          {user ? (
            <Avatar className="hidden lg:block">
              <AvatarImage src={user.picture} alt="User Image" />
              <AvatarFallback>
                {getInitials(user.given_name, user.family_name)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Image
              src={DefaultUserLogo}
              alt="Default User Profile"
              className="hidden size-8 rounded-full lg:block"
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <DropdownMenuItem>
              <LogoutLink className="w-full">Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className="w-full">Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className="w-full">Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
