"use server"

import prisma from "@/prisma/db"
import { redirect } from "next/navigation"

export const createAirbnbHome = async ({ userId }: { userId: string }) => {
  const data = await prisma.home.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (!data) {
    const data = await prisma.home.create({
      data: {
        userId,
      },
    })

    return redirect(`/create/${data.id}/structure`)
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`)
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`)
  }
}

export const createCategoryPage = async (formData: FormData) => {
  const catergoryName = formData.get("categoryName") as string
  const homeId = formData.get("homeId") as string
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: catergoryName,
      addedCategory: true,
    },
  })

  return redirect(`/create/${homeId}/description`)
}

export const createDescription = async (formData: FormData) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const price = formData.get("price")
  const imageFile = formData.get("image") as File
  const homeId = formData.get("homeId") as string

  const guestNumber = formData.get("guest") as string
  const roomNumber = formData.get("room") as string
  const bathroomNumber = formData.get("bathroom") as string

  // const data = await prisma.home.update({
  //   where: {
  //     id: homeId,
  //   },
  //   data: {
  //     title: title,
  //     description: description,
  //     price: Number(price),
  //     bedrooms: roomNumber,
  //     bathrooms: bathroomNumber,
  //     guests: guestNumber,
  //     photo: imageData?.path,
  //     addedDescription: true,
  //   },
  // })

  return redirect(`/create/${homeId}/address`)
}
