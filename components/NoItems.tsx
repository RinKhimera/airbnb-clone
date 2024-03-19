import { FileQuestion } from "lucide-react"

type NoItemsProps = {
  title: string
  description: string
}

export const NoItems = ({ title, description }: NoItemsProps) => {
  return (
    <div className="mt-10 flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="size-10 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">{title}</h2>

      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
