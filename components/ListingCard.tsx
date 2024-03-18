import { addToFavorite, removeFavorite } from "@/app/actions"
import {
  AddToFavoriteButton,
  DeleteFromFavoriteButton,
} from "@/components/SubmitButtons"
import { useCountries } from "@/lib/getCountries"
import Image from "next/image"
import Link from "next/link"

type ListingCardProps = {
  homeId: string
  imagePath: string | null
  description: string | null
  location: string | null
  price: number | null
  userId: string | undefined
  isFavorite: boolean
  pathname: string
}

const ListingCard = ({
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
        <Image
          className="h-full rounded-md object-cover"
          src={imagePath as string}
          alt={""}
          fill
        />

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

      <Link href={"/"} className="mt-2">
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

export default ListingCard
