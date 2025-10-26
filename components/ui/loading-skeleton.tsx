export function BlogPostsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col space-y-1">
          <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
          <div className="h-4 bg-neutral-100 dark:bg-neutral-900 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}

export function WorkExperienceSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-6 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
            <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-32"></div>
          </div>
          <div className="ml-9 space-y-2">
            <div className="h-4 bg-neutral-100 dark:bg-neutral-900 rounded w-48"></div>
            <div className="h-3 bg-neutral-100 dark:bg-neutral-900 rounded w-36"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
