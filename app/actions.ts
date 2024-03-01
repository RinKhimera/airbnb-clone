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
  }
}
