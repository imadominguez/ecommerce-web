import { LoaderCircleIcon } from 'lucide-react';

export const SelectCategorySkeleton = () => {
  return (
    <div className="grid w-full place-content-center rounded bg-muted py-3">
      <LoaderCircleIcon className="h-4 w-4 animate-spin" />
    </div>
  );
};
