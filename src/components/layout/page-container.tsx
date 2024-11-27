import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: Props) => {
  return (
    <main
      style={{ minHeight: 'calc(100dvh - 28px - 240px)' }}
      className={cn(
        'mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center bg-background px-3 py-6 sm:px-6 sm:py-8 lg:px-8',
        className
      )}
    >
      {children}
    </main>
  );
};
