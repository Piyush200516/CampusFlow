import { CheckCircle, Clock, XCircle } from 'lucide-react';

const variants = {
  paid: { bg: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400', icon: CheckCircle, label: 'Paid' },
  pending: { bg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400', icon: Clock, label: 'Pending' },
  unpaid: { bg: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400', icon: XCircle, label: 'Unpaid' },
  active: { bg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400', icon: CheckCircle, label: 'Active' },
  inactive: { bg: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400', icon: XCircle, label: 'Inactive' },
};

export default function Badge({ variant = 'paid', size = 'md', children, className = '', ...props }) {
  const config = variants[variant] || variants.paid;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full transition-colors ${sizeClasses[size]} ${config.bg} ${className}`} {...props}>
      <Icon size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
      {children || config.label}
    </span>
  );
}

