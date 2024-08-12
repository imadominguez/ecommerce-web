import { LoginForm } from "@/app/(auth)/login/components/login-form";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <Image
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
          width={1000}
          height={1000}
        /> */}
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight">Ingresa a tu cuenta</h2>
      </div>
      <LoginForm />
      <p className="mt-5 text-center text-sm ">
        No tenes una cuenta?
        <Link
          href="/register"
          className={buttonVariants({
            variant: "link",
          })}
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
