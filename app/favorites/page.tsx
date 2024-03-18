import ListingCard from "@/components/ListingCard"
import NoItems from "@/components/NoItems"
import prisma from "@/prisma/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const getData = async (userId: string) => {
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          description: true,
          price: true,
          photo: true,
          Favorite: true,
          country: true,
        },
      },
    },
  })

  return data
}

const FavoritePage = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) return redirect("/")

  const data = await getData(user.id)

  return (
    <section className="container mx-auto mt-10 py-5 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      {data.length === 0 ? (
        <NoItems />
      ) : (
        <div>
          {data.map((item) => (
            <ListingCard
              key={item.Home.id}
              homeId={item.Home.id}
              description={item.Home.description}
              imagePath={item.Home.photo}
              location={item.Home.country}
              price={item.Home.price}
              userId={user.id}
              isFavorite={true}
              pathname={"/favorites"}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default FavoritePage
