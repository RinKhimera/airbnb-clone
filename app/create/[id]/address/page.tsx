import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AddressPage = () => {
  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="mb-10 text-3xl font-semibold tracking-tight transition-colors">
          Where is your Home located?
        </h2>
      </div>

      <form action="">
        <div className="mx-auto w-3/5">
          <div className="mb-5">
            <Select required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                </SelectGroup>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddressPage
