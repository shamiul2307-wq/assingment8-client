
 
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  User,
  Tag,
  Library,
  Loader2,
  AlertCircle,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function BookDetailsContent() {
  const params = useParams();
  const id = params.id;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchBook() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/books/${id}`, {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Book not found");
        }

        setBook(result.data || result.book);
      } catch (err) {
        console.error("Book Details Error:", err);
        setError(err.message || "Failed to load book details.");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
        <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          Book Not Found
        </h2>
        <p className="mt-2 text-gray-500">
          {error || "This book could not be found."}
        </p>
        <Link
          href="/books"
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Back to All Books
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} />
          Back to All Books
        </Link>

        <div className="grid overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-2">
          <div className="flex min-h-[400px] items-center justify-center bg-gray-100 p-8">
            {book.image ? (
              <img
                src={book.image}
                alt={book.title || "Book cover"}
                className="max-h-[500px] w-full rounded-xl object-contain"
              />
            ) : (
              <BookOpen size={100} className="text-gray-400" />
            )}
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10">
            <span className="mb-4 w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {book.category}
            </span>

            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              {book.title}
            </h1>

            <p className="mb-8 flex items-center gap-2 text-lg text-gray-600">
              <User size={20} />
              {book.author}
            </p>

            <div className="mb-6 border-t border-gray-200 pt-6">
              <h2 className="mb-3 text-xl font-bold text-gray-800">
                Book Description
              </h2>
              <p className="leading-7 text-gray-600">
                {book.description || "No description available."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-blue-50 p-4">
                <Library className="mb-2 text-blue-600" size={24} />
                <p className="text-sm text-gray-500">Total Copies</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {book.totalCopies ?? 0}
                </h3>
              </div>

              <div className="rounded-xl bg-green-50 p-4">
                <BookOpen className="mb-2 text-green-600" size={24} />
                <p className="text-sm text-gray-500">Available Copies</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {book.availableCopies ?? 0}
                </h3>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <Tag size={18} />
              Category: {book.category}
            </div>

            {book.addedBy?.name && (
              <p className="mt-3 text-sm text-gray-500">
                Added by: {book.addedBy.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BookDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
      }
    >
      <BookDetailsContent />
    </Suspense>
  );
}

