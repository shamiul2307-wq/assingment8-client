import RegisterForm from "@/components/RegisterForm";

export const metadata = {
  title: "BookNook | Register",
};

export default function RegisterPage() {
  return (
    <section className="min-h-[75vh] bg-[#eeeae0] flex items-center justify-center px-5 py-16">
      <RegisterForm />
    </section>
  );
}