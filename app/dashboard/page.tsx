import { auth } from "@/auth";
import { LogoutButton } from "@/components/button/logout-button";

import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <LogoutButton />
    </div>
  );
}
