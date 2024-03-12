"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

type CounterProps = {
  amount: number
  setAmount: React.Dispatch<React.SetStateAction<number>>
}

export const Counter = ({ amount, setAmount }: CounterProps) => {
  const increaseCount = () => {
    if (amount < 10) {
      setAmount(amount + 1)
    }
  }

  const decreaseCount = () => {
    if (amount > 0) {
      setAmount(amount - 1)
    }
  }

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" value={amount} />
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
