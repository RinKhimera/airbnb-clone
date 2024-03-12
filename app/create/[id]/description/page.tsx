"use client"

import { createDescription } from "@/app/actions"
import { Counter } from "@/components/Counter"
import CreationBottomBar from "@/components/CreationBottomBar"
import { Card, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { descriptionFormSchema } from "@/schemas"
import { UploadButton } from "@/utils/uploadthing"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const DescriptionPage = ({ params }: { params: { id: string } }) => {
  const [guestNumber, setGuestNumber] = useState(0)
  const [roomNumber, setRoomNumber] = useState(0)
  const [bathroomNumber, setBathroomNumber] = useState(0)
  const [imgUrl, setimgUrl] = useState("")
  const [imgName, setImgName] = useState("")

  const form = useForm<z.infer<typeof descriptionFormSchema>>({
    resolver: zodResolver(descriptionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof descriptionFormSchema>) => {
    console.log(
      params.id,
      values,
      guestNumber,
      roomNumber,
      bathroomNumber,
      imgUrl,
    )

    try {
      await createDescription(
        values,
        params.id,
        guestNumber,
        roomNumber,
        bathroomNumber,
        imgUrl,
      )

      console.log("Success !!")
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can!
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto mb-36 mt-10 flex w-3/5 flex-col gap-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Short and simple..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your home..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price per Night in USD"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-y-2">
              <Label>Image</Label>
              <UploadButton
                className="-mb-7 items-start ut-button:w-full ut-button:justify-start ut-button:border ut-button:bg-transparent ut-button:pl-3 ut-button:text-sm ut-button:text-black ut-button:ut-uploading:bg-blue-200 ut-button:ut-uploading:text-white"
                // appearance={{
                //   button:
                //     "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
                // }}
                content={{
                  button({ ready, isUploading }) {
                    if (!ready) return "Getting ready..."

                    if (isUploading)
                      return (
                        <div className="z-10 flex items-center justify-center font-medium">
                          <Loader2 className="mr-2 size-6 animate-spin" />
                          Uploading in progress
                        </div>
                      )
                    return (
                      <div className="flex gap-x-2">
                        <p className="font-medium">Choose an image</p>
                        {imgName || "No file chosen"}
                      </div>
                    )
                  },
                  allowedContent({ ready, fileTypes, isUploading }) {
                    // if (!ready) return "Checking what you allow"
                    // if (isUploading) return "Seems like stuff is uploading"
                    return ""
                  },
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res)
                  setimgUrl(res[0].url)
                  setImgName(res[0].name)
                  // alert("Upload Completed")
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`)
                }}
              />
            </div>

            <Card>
              <CardHeader className="flex flex-col gap-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-medium underline">Guests</h3>
                    <p className="text-sm text-muted-foreground">
                      How many guests do you want?
                    </p>
                  </div>

                  <Counter amount={guestNumber} setAmount={setGuestNumber} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-medium underline">Rooms</h3>
                    <p className="text-sm text-muted-foreground">
                      How many rooms do you have?
                    </p>
                  </div>

                  <Counter amount={roomNumber} setAmount={setRoomNumber} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-medium underline">Bathrooms</h3>
                    <p className="text-sm text-muted-foreground">
                      How many bathrooms do you have?
                    </p>
                  </div>

                  <Counter
                    amount={bathroomNumber}
                    setAmount={setBathroomNumber}
                  />
                </div>
              </CardHeader>
            </Card>
          </div>
          <CreationBottomBar />
        </form>
      </Form>
    </>
  )
}

export default DescriptionPage
