import { Counter } from "@/components/Counter"
import CreationBottomBar from "@/components/CreationBottomBar"
import { Card, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const DescriptionPage = () => {
  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can!
        </h2>
      </div>

      <form action="">
        <div className="mx-auto mb-36 mt-10 flex w-3/5 flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              placeholder="Short and simple..."
              required
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="decription"
              placeholder="Please describe your home..."
              required
            />

            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                placeholder="Price per night in USD"
                min={10}
                required
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Image</Label>
              <Input name="image" type="file" required />
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
                  <Counter name="guest" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-medium underline">Rooms</h3>
                    <p className="text-sm text-muted-foreground">
                      How many rooms do you have?
                    </p>
                  </div>
                  <Counter name="room" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-medium underline">Bathrooms</h3>
                    <p className="text-sm text-muted-foreground">
                      How many bathrooms do you have?
                    </p>
                  </div>
                  <Counter name="bathroom" />
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        <CreationBottomBar />
      </form>
    </>
  )
}

export default DescriptionPage
