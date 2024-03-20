import { createReservation } from "@/app/actions"
import { CategoryShowcase } from "@/components/CategoryShowcase"
import { HomeMap } from "@/components/HomeMap"
import { SelectCalendar } from "@/components/SelectCalendar"
import { ReservationSubmitButton } from "@/components/SubmitButtons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCountries } from "@/lib/getCountries"
import prisma from "@/prisma/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { unstable_noStore as noStore } from "next/cache"
import Image from "next/image"
import Link from "next/link"

const getData = async (homeId: string) => {
  noStore()

  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      categoryName: true,
      title: true,
      description: true,
      price: true,
      photo: true,
      country: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      User: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
      Reservation: {
        where: {
          homeId,
        },
      },
    },
  })

  return data
}

const HomeDetails = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const data = await getData(params.id)
  const { getCountryByValue } = useCountries()
  const country = getCountryByValue(data?.country as string)

  return (
    <div className="mx-auto mb-12 mt-10 w-[75%]">
      <h1 className="mb-5 text-2xl font-medium">{data?.title}</h1>

      <div className="relative h-[550px]">
        <Image
          className="h-full w-full rounded-lg object-cover"
          src={data?.photo as string}
          alt={"Home image"}
          fill
        />
      </div>

      <div className="mt-8 flex justify-between gap-x-24">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>

          <div className="flex gap-x-2 tracking-tight text-muted-foreground">
            <p>{data?.guests} Guests</p> · <p>{data?.bedrooms} Bedrooms</p> ·{" "}
            <p>{data?.bathrooms} Bathrooms</p>
          </div>

          <div className="mt-6 flex items-center">
            <Avatar className="hidden lg:block">
              <AvatarImage
                src={data?.User?.profileImage as string | undefined}
                alt="User image"
              />
              <AvatarFallback>XO</AvatarFallback>
            </Avatar>

            <div className="ml-4 flex flex-col">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since 2024</p>
            </div>
          </div>

          <Separator className="my-7" />

          <CategoryShowcase categoryName={data?.categoryName as string} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />

          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a Reservation!</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default HomeDetails
