import { RegisterForm } from "@/app/(auth)/register/components/register-form";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
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
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight">Crea tu cuenta</h2>
      </div>
      <RegisterForm />
      <p className="mt-5 text-center text-sm ">
        Ya tenes una cuenta?
        <Link
          href="/login"
          className={buttonVariants({
            variant: "link",
          })}
        >
          Iniciar sesion
        </Link>
      </p>
    </div>
  );
}
