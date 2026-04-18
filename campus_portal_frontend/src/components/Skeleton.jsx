export default function Skeleton({ className = '', ...props }) {
  return (
    <div className={`animate-pulse bg-gray-200/50 dark:bg-gray-700/50 rounded-xl ${className}`} {...props} />
  );
}

// Variants
export function CardSkeleton({ className = '' }) {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-6 w-3/4 rounded" />
      <Skeleton className="h-8 w-20 rounded-full" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
}

export function TableSkeleton({ columns = 6, rows = 5, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-2xl border ${className}`}>
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur p-1">
        <div className="flex">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-10 flex-1 m-1 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex p-4">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className={`h-10 flex-1 ${j === 0 ? 'w-24' : ''} m-1 rounded`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

