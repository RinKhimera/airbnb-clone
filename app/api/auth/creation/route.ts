import prisma from "@/prisma/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { unstable_noStore as noStore } from "next/cache"
import { NextResponse } from "next/server"

export const GET = async () => {
  noStore()

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong. Please try again")
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  })

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email as string,
        firstName: user.given_name as string,
        lastName: user.family_name as string,
        profileImage: user.picture,
      },
    })
  }

  return NextResponse.redirect("http://localhost:3000/")
}
