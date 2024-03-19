"use client"

import { Button } from "@/components/ui/button"
import { Heart, Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

export const CreationSubmit = ({ descPending }: { descPending?: boolean }) => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending || descPending ? (
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

export const AddToFavoriteButton = () => {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button
          className="bg-primary-foreground"
          variant={"outline"}
          size={"icon"}
          type="submit"
          disabled
        >
          <Loader2 className="size-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          className="bg-primary-foreground"
          variant={"outline"}
          size={"icon"}
          type="submit"
        >
          <Heart className="size-4" />
        </Button>
      )}
    </>
  )
}

export const DeleteFromFavoriteButton = () => {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button
          className="bg-primary-foreground"
          variant={"outline"}
          size={"icon"}
          type="submit"
          disabled
        >
          <Loader2 className="size-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          className="bg-primary-foreground"
          variant={"outline"}
          size={"icon"}
          type="submit"
        >
          <Heart className="size-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  )
}
