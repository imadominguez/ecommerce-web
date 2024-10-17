import { cn } from '@/lib/utils';

export const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'h-full w-full animate-pulse rounded-md bg-muted text-muted',
        className
      )}
    >
      &nbsp;
    </div>
  );
};
