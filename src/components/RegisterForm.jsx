"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
 
import { signUp, signIn, signOut } from "@/lib/auth-client";
export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!/[A-Z]/.test(form.password)) {
      toast.error("Password needs an uppercase letter");
      return;
    }

    if (!/[a-z]/.test(form.password)) {
      toast.error("Password needs a lowercase letter");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.image || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      // End the automatically created session so the user
      // can sign in manually as required by the assignment.
      await signIn.email({
        email: form.email,
        password: form.password,
      }).then(() => signOut());

      toast.success("Registration successful! Please login.");

      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google registration failed");
    }
  };

  return (
    <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#244b39]">
          Create Your Account
        </h1>

        <p className="text-gray-500 mt-2">
          Join our community of book lovers.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {[
          {
            label: "Full Name",
            name: "name",
            type: "text",
          },
          {
            label: "Email Address",
            name: "email",
            type: "email",
          },
           
          {
            label: "Password",
            name: "password",
            type: "password",
          },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-semibold mb-2">
              {field.label}
            </label>

            <input
              type={field.type}
              required={field.name !== "image"}
              value={form[field.name]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [field.name]: e.target.value,
                })
              }
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#244b39]"
            />
          </div>
        ))}

        <div className="text-sm text-gray-500">
          Password requirements:
          <ul className="list-disc ml-5 mt-1">
            <li>At least 6 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
          </ul>
        </div>

        <button
          disabled={loading}
          className="w-full bg-[#244b39] text-white py-3 rounded-lg font-bold disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleRegister}
        className="w-full border border-gray-300 py-3 rounded-lg font-semibold"
      >
        Continue with Google
      </button>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-[#244b39] font-bold">
          Login
        </Link>
      </p>
    </div>
  );
}