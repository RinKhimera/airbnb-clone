"use server"

import prisma from "@/prisma/db"
import { descriptionFormSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export const createAirbnbHome = async ({ userId }: { userId: string }) => {
  // Find the latest home entry for the user
  const latestHome = await prisma.home.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // If no previous home entry exists, create a new one
  if (!latestHome) {
    const newHome = await prisma.home.create({
      data: {
        userId,
      },
    })

    return redirect(`/create/${newHome.id}/structure`)
  }

  // Check the completeness of the latest home entry
  const { addedCategory, addedDescription, addedLocation } = latestHome

  if (!addedCategory || !addedDescription || !addedLocation) {
    // If any of the required fields are missing, redirect to the appropriate step
    if (!addedCategory && !addedDescription && !addedLocation) {
      // If no step is completed yet, redirect to structure
      return redirect(`/create/${latestHome.id}/structure`)
    } else if (addedCategory && !addedDescription) {
      // If category is added but description is missing, redirect to description
      return redirect(`/create/${latestHome.id}/description`)
    } else if (addedCategory && addedDescription && !addedLocation) {
      // If category and description are added but location is missing, redirect to address
      return redirect(`/create/${latestHome.id}/address`)
    }
  }

  // If all steps are completed, create a new home entry and redirect to structure
  const newHome = await prisma.home.create({
    data: {
      userId,
    },
  })

  return redirect(`/create/${newHome.id}/structure`)
}

export const createCategoryPage = async (formData: FormData) => {
  const catergoryName = formData.get("categoryName") as string
  const homeId = formData.get("homeId") as string

  await prisma.home.update({
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

  await prisma.home.update({
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

export const addToFavorite = async (formData: FormData) => {
  const homeId = formData.get("homeId") as string
  const userId = formData.get("userId") as string
  const pathname = formData.get("pathname") as string

  await prisma.favorite.create({
    data: {
      userId,
      homeId,
    },
  })

  revalidatePath(pathname)
}

export const removeFavorite = async (formData: FormData) => {
  const homeId = formData.get("homeId") as string
  const userId = formData.get("userId") as string
  const pathname = formData.get("pathname") as string

  await prisma.favorite.delete({
    where: {
      userId_homeId: {
        userId: userId,
        homeId: homeId,
      },
    },
  })

  revalidatePath(pathname)
}
