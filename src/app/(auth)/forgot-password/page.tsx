import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormSendEmailForgotPassword } from './form-send-email-forgot-password';

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center p-4 pt-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Recuperación de Contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico para recibir instrucciones de
            recuperación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormSendEmailForgotPassword />
        </CardContent>
      </Card>
    </div>
  );
}
