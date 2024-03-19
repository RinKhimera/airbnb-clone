import ListingCard from "@/components/ListingCard"
import NoItems from "@/components/NoItems"
import prisma from "@/prisma/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const getData = async (userId: string) => {
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      description: true,
      price: true,
      country: true,
      photo: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return data
}

const MyHomes = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) return redirect("/")

  const data = await getData(user.id)

  return (
    <section className="container mx-auto mt-10 px-5 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

      {data.length === 0 ? (
        <NoItems
          title="No Homes listed!"
          description="Please list a Home to see them right here..."
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              homeId={item.id}
              description={item.description}
              imagePath={item.photo}
              location={item.country}
              price={item.price}
              userId={user.id}
              isFavorite={item.Favorite.length > 0 ? true : false}
              pathname={"/my-homes"}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default MyHomes
