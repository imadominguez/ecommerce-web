import { cn } from '@/lib/utils';
import Image from 'next/image';
interface Props {
  className?: string;
  width?: number;
  height?: number;
}
export const Logo = ({ className, height = 1000, width = 1000 }: Props) => {
  return (
    <Image
      alt="Servicios Integrados"
      src="/imgs/logo-si.png"
      className={cn('mx-auto h-14 w-auto', className)}
      width={width}
      height={height}
    />
  );
};
