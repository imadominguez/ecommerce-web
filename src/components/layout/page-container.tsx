import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: Props) => {
  return (
    <main
      className={cn(
        'mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10',
        className
      )}
    >
      {children}
    </main>
  );
};