import { createCategoryPage } from "@/app/actions"
import { CreationBottomBar } from "@/components/CreationBottomBar"
import { SelectedCategory } from "@/components/SelectedCategory"

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

        <CreationBottomBar />
      </form>
    </>
  )
}

export default StructureRoute
