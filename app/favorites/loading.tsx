import SkeletonCard from "@/components/SkeletonCard"

const FavoritesLoading = () => {
  // Define the number of skeleton cards you want to render
  const numSkeletonCards = 8

  // Create an array of length numSkeletonCards filled with null values
  const skeletonCards = Array.from({ length: numSkeletonCards }, (_, index) => (
    <SkeletonCard key={index} />
  ))

  return (
    <section className="container mx-auto mt-10 px-5 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {skeletonCards}
      </div>
    </section>
  )
}

export default FavoritesLoading
