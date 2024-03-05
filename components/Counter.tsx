"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

export const Counter = ({ name }: { name: string }) => {
  const [amount, setAmount] = useState(0)

  const increaseCount = () => {
    setAmount(amount + 1)
  }

  const decreaseCount = () => {
    if (amount > 0) {
      setAmount(amount - 1)
    }
  }

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={amount} />
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={decreaseCount}
      >
        <Minus className="size-4 text-primary" />
      </Button>

      <p className="text-lg font-medium">{amount}</p>

      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={increaseCount}
      >
        <Plus className="size-4 text-primary" />
      </Button>
    </div>
  )
}
