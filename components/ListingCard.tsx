import { addToFavorite, removeFavorite } from "@/app/actions"
import {
  AddToFavoriteButton,
  DeleteFromFavoriteButton,
} from "@/components/SubmitButtons"
import { useCountries } from "@/lib/getCountries"
import Image from "next/image"
import Link from "next/link"

type ListingCardProps = {
  homeId: string | undefined
  imagePath: string | null | undefined
  description: string | null | undefined
  location: string | null | undefined
  price: number | null | undefined
  userId: string | undefined
  isFavorite: boolean
  pathname: string
}

export const ListingCard = ({
  homeId,
  description,
  imagePath,
  location,
  price,
  userId,
  isFavorite,
  pathname,
}: ListingCardProps) => {
  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(location as string)

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Link href={`/home/${homeId}`}>
          <Image
            className="h-full rounded-md object-cover"
            src={imagePath as string}
            alt={""}
            fill
          />
        </Link>

        {userId && (
          <div className="absolute right-2 top-2 z-10">
            {isFavorite ? (
              <form action={removeFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="text-base font-medium">
          {country?.label} / {country?.region}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
        <p className="pt-1.5 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> per night
        </p>
      </Link>
    </div>
  )
}
