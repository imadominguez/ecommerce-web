import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import { FormResetPassword } from './form-reset-password';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    token: string;
  };
}

export default function ForgotPasswordTokenPage({ params: { token } }: Props) {
  if (!token) {
    redirect('/');
  }

  return (
    <Card className="mx-auto mt-20 max-w-sm">
      <CardHeader>
        <CardTitle>Cambiar constrasena</CardTitle>
        <CardDescription>
          Ingresa tu nueva contrasena a continuacion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormResetPassword token={token} />
      </CardContent>
    </Card>
  );
}
