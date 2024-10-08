import { ListingCard } from "@/components/ListingCard"
import { MapFilterItems } from "@/components/MapFilterItems"
import { NoItems } from "@/components/NoItems"
import { SkeletonCard } from "@/components/SkeletonCard"
import prisma from "@/prisma/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { unstable_noStore as noStore } from "next/cache"
import { Suspense } from "react"

const getData = async ({
  searchParams,
  userId,
}: {
  userId: string | undefined
  searchParams?: {
    filter?: string
    country?: string
    guest?: string
    room?: string
    bathroom?: string
  }
}) => {
  // Used to declaratively opt out of static rendering and indicate this particular component should not be cached.
  noStore()

  const convertStringToNumber = (stringNumber: string | undefined) => {
    // If the searchParams is undefined, return undefined
    if (stringNumber === undefined) {
      return undefined
    }

    // Otherwise, parse the string to a number
    return parseInt(stringNumber)
  }

  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: convertStringToNumber(searchParams?.guest) ?? undefined,
      bedrooms: convertStringToNumber(searchParams?.room) ?? undefined,
      bathrooms: convertStringToNumber(searchParams?.bathroom) ?? undefined,
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
      User: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  // console.log(convertStringToNumber(searchParams?.guest as string))
  return data
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string
    country?: string
    guest?: string
    room?: string
    bathroom?: string
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
    country?: string
    guest?: string
    room?: string
    bathroom?: string
  }
}) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const data = await getData({ searchParams: searchParams, userId: user?.id })

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          title="Sorry, no listings found for this category!"
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
              userId={item.User?.id}
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
