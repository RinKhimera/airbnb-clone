"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

export const CreationSubmit = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled size={"lg"}>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" size={"lg"}>
          Next
        </Button>
      )}
    </>
  )
}
