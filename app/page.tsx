import { ListingCard } from "@/components/ListingCard"
import { MapFilterItems } from "@/components/MapFilterItems"
import { NoItems } from "@/components/NoItems"
import { SkeletonCard } from "@/components/SkeletonCard"
import prisma from "@/prisma/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Suspense } from "react"

const getData = async ({
  searchParams,
  userId,
}: {
  searchParams?: {
    filter?: string
  }
  userId: string | undefined
}) => {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      id: true,
      photo: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  })

  return data
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string
  }
}) {
  return (
    <main className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </main>
  )
}

const ShowItems = async ({
  searchParams,
}: {
  searchParams?: {
    filter?: string
  }
}) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const data = await getData({ searchParams: searchParams, userId: user?.id })

  // console.log(data)

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          title="Sorry, no listings found for ths category!"
          description="Please check another category or create your own listing!"
        />
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              homeId={item.id}
              imagePath={item.photo}
              description={item.description}
              location={item.country}
              price={item.price}
              userId={user?.id}
              isFavorite={item.Favorite.length > 0 ? true : false}
              pathname="/"
            />
          ))}
        </div>
      )}
    </>
  )
}

const SkeletonLoading = () => {
  // Define the number of skeleton cards you want to render
  const numSkeletonCards = 8

  // Create an array of length numSkeletonCards filled with null values
  const skeletonCards = Array.from({ length: numSkeletonCards }, (_, index) => (
    <SkeletonCard key={index} />
  ))

  return (
    <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {skeletonCards}
    </div>
  )
}
