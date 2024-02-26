import UserNav from "@/components/UserNav"
import DesktopLogo from "@/public/airbnb-desktop.png"
import MobileLogo from "@/public/airbnb-mobile.webp"
import Image from "next/image"
import Link from "next/link"

const SiteHeader = () => {
  return (
    <div className="w-full border-b">
      <div className="mx-auto flex items-center justify-between px-5 py-5 lg:px-10">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="hidden w-32 lg:block"
          />

          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="w-12 lg:hidden"
          />
        </Link>

        <div className="rounded-full border px-5 py-2">
          <h1>Hello from the search</h1>
        </div>

        <UserNav />
      </div>
    </div>
  )
}

export default SiteHeader
