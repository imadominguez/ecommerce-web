import { auth } from "@/auth";
import { LogoutButton } from "@/components/button/logout-button";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <LogoutButton />
    </div>
  );
}
