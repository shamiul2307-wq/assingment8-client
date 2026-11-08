import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#193729] text-white mt-20">
      <div className="max-w-7xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={30} />
            <h2 className="text-2xl font-bold">BookNook</h2>
          </div>

          <p className="text-gray-300 leading-7 max-w-sm">
            A little corner for curious minds. Discover wonderful stories,
            borrow your next favorite book and share the joy of reading.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4">Quick Links</h3>

          <div className="flex flex-col gap-3 text-gray-300">
            <Link href="/">Home</Link>
            <Link href="/books">All Books</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4">Contact Us</h3>

          <div className="flex flex-col gap-4 text-gray-300">
            <p className="flex gap-3">
              <Mail size={19} />
              hello@booknook.com
            </p>

            <p className="flex gap-3">
              <Phone size={19} />
              +880 10577189918
            </p>

            <p className="flex gap-3">
              <MapPin size={19} />
              Dhaka, Bangladesh
            </p>
          </div>

          <div className="flex gap-5 mt-5">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              X
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 py-5 text-center text-gray-300">
       <p> © 2026</p>  BookNook. All rights reserved.
      </div>
    </footer>
  );
}