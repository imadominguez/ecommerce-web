import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
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

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Cerrar sesion</Button>
      </form>
    </div>
  );
}
