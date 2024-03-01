"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { categoryItems } from "@/lib/categoryItems"
import Image from "next/image"
import { useState } from "react"

const SelectedCategory = () => {
  const [SelectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  )

  return (
    <div className="mx-auto mb-36 mt-10 grid w-3/5 grid-cols-4 gap-8">
      <input type="hidden" name="categoryName" value={SelectedCategory} />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={SelectedCategory === item.name ? "border-primary" : ""}
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={32}
                width={32}
                className="size-8"
              />

              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default SelectedCategory
