const ProductListSkeleton = () => {
  return (
    <ul className="divide-y divide-gray-300 max-w-3xl mx-auto bg-white rounded-md shadow mt-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="p-4 min-h-[233px]">
          <div className="flex gap-4">
            <div className="w-[196px] h-[196px] shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-4 shimmer rounded w-3/4" />
              <div className="h-6 shimmer rounded w-1/2" />
              <div className="h-4 shimmer rounded w-1/4" />
              <div className="h-4 shimmer rounded w-1/3" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductListSkeleton;
