import { File } from "lucide-react"

const NoItems = () => {
  return (
    <div className="mt-10 flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <File className="size-10 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        Sorry, no listings found for ths category!
      </h2>

      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
        Please check another category or create your own listing!
      </p>
    </div>
  )
}

export default NoItems
