import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";

export const DashboardLink = async () => {
  const session = await auth();

  if (!session) return null;

  if (session?.user.role !== "admin") return null;

  return (
    <div className="ml-1 ">
      <Link
        href={"/dashboard"}
        className={buttonVariants({ variant: "outline", size: "sm", className: "w-full mt-2 lg:m-0" })}
      >
        Dashboard
      </Link>
    </div>
  );
};
