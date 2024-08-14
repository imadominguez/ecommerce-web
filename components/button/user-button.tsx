import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

export const UserButton = async () => {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" size={"sm"} variant={"secondary"}>
          Cerrar sesion
        </Button>
      </form>
    );
  }

  return (
    <Link href={"/login"} className={buttonVariants({ size: "sm", variant: "secondary" })}>
      Ingresar
    </Link>
  );
};
