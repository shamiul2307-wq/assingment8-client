  
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "BookNook | Login",
};

async function LoginContent({ searchParams }) {
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl || "/";

  return (
    <section className="min-h-[75vh] bg-[#eeeae0] flex items-center justify-center px-5 py-16">
      <LoginForm callbackUrl={callbackUrl} />
    </section>
  );
}

export default function LoginPage({ searchParams }) {
  return (
    <Suspense
      fallback={
        <section className="min-h-[75vh] bg-[#eeeae0] flex items-center justify-center">
          <p className="text-[#244b39]">Loading login...</p>
        </section>
      }
    >
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}
