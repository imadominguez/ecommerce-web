import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <p>Home shop page</p>
      {JSON.stringify(session, null, 2)}
    </div>
  );
}
