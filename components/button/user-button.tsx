import { auth } from "@/auth";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const UserButton = async () => {
  const session = await auth();

  if (session) {
    return <span>user dropdown</span>;
  }

  return (
    <Link href={"/login"} className={buttonVariants({})}>
      Iniciar sesion
    </Link>
  );
};
