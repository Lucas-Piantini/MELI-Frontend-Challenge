// Skeleton mientras carga el detalle
const ProductDetailSkeleton = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-16 h-16 shimmer rounded" />
            ))}
          </div>
          <div className="w-full md:w-[400px] h-[400px] shimmer rounded" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="h-4 shimmer rounded w-1/3" />
          <div className="h-8 shimmer rounded w-2/3" />
          <div className="h-6 shimmer rounded w-1/4" />
          <div className="h-4 shimmer rounded w-1/2" />
          <div className="h-4 shimmer rounded w-1/3" />
          <div className="h-10 shimmer rounded w-full mt-4" />
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <div className="h-5 shimmer rounded w-1/4" />
        <div className="h-4 shimmer rounded w-full" />
        <div className="h-5 shimmer rounded w-1/4 mt-6" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 shimmer rounded w-2/3" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;