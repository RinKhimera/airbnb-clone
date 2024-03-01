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
