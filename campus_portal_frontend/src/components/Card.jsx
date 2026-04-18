export default function Card({ children, className = '', title, loading = false, ...props }) {
  return (
    <div className={`
      bg-white/70 dark:bg-gray-800/70 
      backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50
      rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1
      transition-all duration-300 p-6 md:p-8
      ${loading ? 'animate-pulse' : ''} 
      ${className}
    `} {...props}>
      {title && (
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200/50 dark:border-gray-700/50 pb-4">
          {title}
        </h3>
      )}
      {loading ? (
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ) : children}
    </div>
  );
}

