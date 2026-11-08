"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { BookOpen, Menu, X, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const user = session?.user;

  const logout = async () => {
    await signOut();
    setProfileOpen(false);
    router.push("/");
    router.refresh();
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
  ];

  const privateLinks = [
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#e8e4d9]">
      <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#244b39] p-2 rounded-xl">
            <BookOpen className="text-white" size={25} />
          </div>

          <span className="text-2xl font-bold text-[#244b39]">
            BookNook
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-gray-700 hover:text-[#244b39]"
            >
              {link.name}
            </Link>
          ))}

          {user &&
            privateLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-gray-700 hover:text-[#244b39]"
              >
                {link.name}
              </Link>
            ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {!isPending && !user && (
            <>
              <Link
                href="/login"
                className="px-5 py-2 font-semibold text-[#244b39]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2.5 bg-[#244b39] text-white rounded-lg hover:bg-[#183628]"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={
                    user.image ||
                    "https://ui-avatars.com/api/?name=Reader"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#244b39]"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-56 bg-white shadow-xl rounded-xl p-3 border">
                  <p className="font-bold text-gray-800 px-3 py-2">
                    {user.name}
                  </p>

                  <Link
                    href="/profile"
                    className="block px-3 py-2 hover:bg-gray-100 rounded-lg"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full flex gap-2 items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t p-5 flex flex-col gap-4">
          {[...links, ...(user ? privateLinks : [])].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {!user && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}

          {user && (
            <>
              <Link href="/profile">My Profile</Link>
              <button onClick={logout} className="text-left text-red-600">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}