import { BackRouteButton } from '@/components/button/back-route-button';

export const Header = () => {
  return (
    <div className="flex items-center gap-4">
      <BackRouteButton />
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Nuevo Producto
      </h1>
    </div>
  );
};
