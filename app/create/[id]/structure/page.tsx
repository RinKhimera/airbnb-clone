import { createCategoryPage } from "@/app/actions"
import SelectedCategory from "@/components/SelectedCategory"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"

const StructureRoute = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectedCategory />

        <div className="fixed bottom-0 z-10 h-24 w-full border-t bg-white">
          <div className="mx-auto flex h-full items-center justify-between px-5 lg:px-10">
            <Link
              href={"/"}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Cancel
            </Link>
            <Button size={"lg"}>Save</Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default StructureRoute
