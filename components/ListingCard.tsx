import { useCountries } from "@/lib/getCountries"
import Image from "next/image"
import Link from "next/link"

type ListingCardProps = {
  imagePath: string | null
  description: string | null
  location: string | null
  price: number | null
}

const ListingCard = ({
  description,
  imagePath,
  location,
  price,
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