import ListingCard from "@/components/ListingCard"
import MapFilterItems from "@/components/MapFilterItems"
import prisma from "@/prisma/db"
import Image from "next/image"

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
      <ShowItems />
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
  )
}
