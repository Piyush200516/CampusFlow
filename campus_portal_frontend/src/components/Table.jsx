import { ChevronDown } from 'lucide-react';

export default function Table({ columns, data, className = '', onRowClick, loading = false, ...props }) {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-lg ${className}`} {...props}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 z-10">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wider first:rounded-tl-2xl last:rounded-tr-2xl"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  className={`hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer ${onRowClick ? 'hover:shadow-md' : ''}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 first:font-semibold border-r last:border-r-0 border-gray-100/50 dark:border-gray-700/50"
                    >
                      {column.render ? column.render(row[column.accessor]) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

