"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { BookOpen } from "lucide-react";

export default function LoginForm({ callbackUrl = "/" }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn.email({
        email: form.email,
        password: form.password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      toast.success("Welcome back!");

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <div className="inline-flex bg-[#244b39] p-3 rounded-xl">
          <BookOpen size={30} className="text-white" />
        </div>

        <h1 className="text-3xl font-bold text-[#244b39] mt-4">
          Welcome Back
        </h1>

        <p className="text-gray-500 mt-2">
          Sign in to continue your reading journey.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block font-semibold mb-2">Email Address</label>

          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#244b39]"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Password</label>

          <input
            type="password"
            required
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#244b39]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#244b39] text-white py-3 rounded-lg font-bold disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="divider text-gray-400">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
      >
        Continue with Google
      </button>

      <p className="text-center text-gray-600 mt-6">
        Don't have an account?{" "}
        <Link href="/register" className="text-[#244b39] font-bold">
          Register
        </Link>
      </p>
    </div>
  );
}