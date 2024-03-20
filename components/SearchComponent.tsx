"use client"

import { HomeMap } from "@/components/HomeMap"
import { CreationSubmit } from "@/components/SubmitButtons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCountries } from "@/lib/getCountries"
import { SearchIcon } from "lucide-react"
import { useState } from "react"
import { Counter } from "./Counter"
import { Card, CardHeader } from "./ui/card"

export const SearchComponent = () => {
  const [step, setStep] = useState(1)
  const [locationValue, setLocationValue] = useState("")
  const [guestNumber, setGuestNumber] = useState(1)
  const [roomNumber, setRoomNumber] = useState(1)
  const [bathroomNumber, setBathroomNumber] = useState(1)

  const { getAllCountries } = useCountries()

  const SubmitLocation = () => {
    if (step === 1) {
      return <Button onClick={() => setStep(step + 1)}>Next</Button>
    } else if (step === 2) {
      return <CreationSubmit />
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center rounded-full border px-5 py-2">
          <div className="flex h-full divide-x font-semibold">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Add Guests</p>
          </div>

          <SearchIcon className="size-8 rounded-full bg-primary p-1 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="flex flex-col gap-4">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>
                  Where do you want to find your Home?
                </DialogDescription>
              </DialogHeader>

              <Select
                onValueChange={(value) => setLocationValue(value)}
                value={locationValue}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Country"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {getAllCountries().map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.flag} {item.label} {item.region}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select details you need</DialogTitle>
                <DialogDescription>What do you need?</DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-medium underline">Guests</h3>
                      <p className="text-sm text-muted-foreground">
                        How many guests do you want?
                      </p>
                    </div>

                    <Counter
                      name="guest"
                      amount={guestNumber}
                      setAmount={setGuestNumber}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-medium underline">Rooms</h3>
                      <p className="text-sm text-muted-foreground">
                        How many rooms do you have?
                      </p>
                    </div>

                    <Counter
                      name="room"
                      amount={roomNumber}
                      setAmount={setRoomNumber}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-medium underline">Bathrooms</h3>
                      <p className="text-sm text-muted-foreground">
                        How many bathrooms do you have?
                      </p>
                    </div>

                    <Counter
                      name="bathroom"
                      amount={bathroomNumber}
                      setAmount={setBathroomNumber}
                    />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SubmitLocation />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
