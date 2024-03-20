import { ListingCard } from "@/components/ListingCard"
import { NoItems } from "@/components/NoItems"
import prisma from "@/prisma/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const getData = async (userId: string) => {
  const data = await prisma.reservation.findMany({
    where: {
      userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          description: true,
          price: true,
          photo: true,
          country: true,
          Favorite: {
            where: {
              userId,
            },
          },
        },
      },
    },
  })

  return data
}

const ReservationPage = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) return redirect("/")

  const data = await getData(user.id)

  return (
    <section className="container mx-auto mt-10 px-5 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="No reservations added!"
          description="Please book a reservation to see it right here..."
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              homeId={item.Home?.id}
              description={item.Home?.description}
              imagePath={item.Home?.photo}
              location={item.Home?.country}
              price={item.Home?.price}
              userId={user.id}
              pathname={"/reservations"}
              isFavorite={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ReservationPage
