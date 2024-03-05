import { CreationSubmit } from "@/components/SubmitButtons"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

const CreationBottomBar = () => {
  return (
    <div className="fixed bottom-0 z-10 h-24 w-full border-t bg-white">
      <div className="mx-auto flex h-full items-center justify-between px-5 lg:px-10">
        <Link
          href={"/"}
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          Cancel
        </Link>
        <CreationSubmit />
      </div>
    </div>
  )
}

export default CreationBottomBar
