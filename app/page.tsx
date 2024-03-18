import ListingCard from "@/components/ListingCard"
import MapFilterItems from "@/components/MapFilterItems"
import NoItems from "@/components/NoItems"
import SkeletonCard from "@/components/SkeletonCard"
import prisma from "@/prisma/db"
import { Suspense } from "react"

const getData = async ({
  searchParams,
}: {
  searchParams?: {
    filter?: string
  }
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
  const data = await getData({ searchParams: searchParams })

  return (
    <>
      {data.length === 0 ? (
        <NoItems />
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo}
              description={item.description}
              location={item.country}
              price={item.price}
            />
          ))}
        </div>
      )}
    </>
  )
}

const SkeletonLoading = () => {
  return (
    <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
