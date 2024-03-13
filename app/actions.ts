"use server"

import prisma from "@/prisma/db"
import { descriptionFormSchema } from "@/schemas"
import { redirect } from "next/navigation"
import { z } from "zod"

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
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/address`)
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.home.create({
      data: {
        userId,
      },
    })

    return redirect(`/create/${data.id}/structure`)
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

export const createDescription = async (
  values: z.infer<typeof descriptionFormSchema>,
  homeId: string,
  guestNumber: number,
  roomNumber: number,
  bathroomNumber: number,
  imgUrl: string,
) => {
  const validatedFields = descriptionFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }

  const { title, description, price } = validatedFields.data

  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: price,
      photo: imgUrl,
      guests: guestNumber,
      bedrooms: roomNumber,
      bathrooms: bathroomNumber,
      addedDescription: true,
    },
  })

  return redirect(`/create/${homeId}/address`)
}

export const createLocation = async (formData: FormData) => {
  const homeId = formData.get("homeId") as string
  const countryValue = formData.get("countryValue") as string

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      country: countryValue,
      addedLocation: true,
    },
  })

  return redirect("/")
}
