import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div
      style={{ minHeight: 'calc(100dvh - 100px )' }}
      className="grid min-h-screen place-content-center"
    >
      <Loader2 className="h-20 w-20 animate-spin text-primary" />
    </div>
  );
}
