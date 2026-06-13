import { LoginForm } from "@/components/auth/login-form";
import { LoginLayout } from "@/components/public/login-layout";

export default function LoginPage() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}
