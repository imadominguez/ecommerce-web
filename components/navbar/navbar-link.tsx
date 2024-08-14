import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface LinksProps {
  href: string;
  name: string;
}
export function Links({ href, name }: LinksProps) {
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "ghost",
        size: "sm",
        className: "w-full",
      })}
    >
      {name}
    </Link>
  );
}
