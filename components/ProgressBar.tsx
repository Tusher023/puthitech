'use client';

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'purple' | 'cyan' | 'gradient';
}

export default function ProgressBar({
  value,
  className = '',
  showLabel = false,
  size = 'md',
  color = 'gradient',
}: ProgressBarProps) {
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' };

  const colors = {
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    gradient: 'bg-gradient-to-r from-purple-500 to-cyan-500',
  };

  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs font-semibold text-purple-400">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-800 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full transition-all duration-700 ease-out ${colors[color]}`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
