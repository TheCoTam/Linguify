import { LoginButton } from '@/components/ui/auth/login-button';
import { RegisterButton } from '@/components/ui/auth/register-button';
import { Button } from '@/components/ui/button';

export default function AuthHome() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md hover:text-black">Welcome to Linguify!</h1>
        <p className="text-white text-lg">Unlock the power of language with Linguify</p>
        <div className="flex items-center justify-center w-full space-x-7">
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
          <RegisterButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign up
            </Button>
          </RegisterButton>
        </div>
      </div>
    </main>
  );
}
