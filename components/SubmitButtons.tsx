"use client"

import { deleteHome } from "@/app/actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Heart, Loader2, Trash2 } from "lucide-react"
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

export const ReservationSubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Processing...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Make a Reservation!
        </Button>
      )}
    </>
  )
}

export const DeleteHomeButton = ({
  homeId,
  pathname,
}: {
  homeId: string
  pathname: string
}) => {
  const handleDeleteClick = () => {
    deleteHome({ homeId, pathname })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-primary-foreground"
          variant={"outline"}
          size={"icon"}
          type="submit"
        >
          <Trash2 className="size-4 bg-primary-foreground" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            home.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteClick}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
