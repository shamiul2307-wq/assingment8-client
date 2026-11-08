
  
 
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_URL}/books`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid API response");
        }

        setBooks(result.data);
      } catch (err) {
        console.error(err);
        setError("Books load হচ্ছে না। Backend চালু আছে কি না দেখো।");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(books.map((book) => book.category).filter(Boolean)),
    ];
  }, [books]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#080d0b] px-4 py-12 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-emerald-400">
            Explore Our Collection
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            All <span className="text-emerald-400">Books</span>
          </h1>

          <p className="mt-4 text-gray-400">
            Discover your next favorite book.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#111a16] px-5 py-4 outline-none focus:border-emerald-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-gray-700 bg-[#111a16] px-5 py-4 outline-none"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 flex justify-between">
          <h2 className="text-xl font-semibold">Library Collection</h2>
          <p className="text-gray-400">
            {filteredBooks.length} Books Found
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="py-20 text-center text-emerald-400">
            Loading Books...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="rounded-xl bg-red-500/10 p-6 text-center text-red-400">
            {error}
          </p>
        )}

        {/* Empty */}
        {!loading && !error && filteredBooks.length === 0 && (
          <p className="py-20 text-center text-gray-400">
            No Books Found.
          </p>
        )}

        {/* Books */}
        {!loading && !error && filteredBooks.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredBooks.map((book) => (
              <article
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-gray-800 bg-[#111a16] transition hover:-translate-y-2 hover:border-emerald-500"
              >
                <div className="h-64 overflow-hidden bg-[#1b2821]">
                  <img
                    src={book.image || "https://placehold.co/400x500?text=No+Image"}
                    alt={book.title || "Book cover"}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://placehold.co/400x500?text=Image+Not+Found";
                    }}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    {book.category || "General"}
                  </span>

                  <h3 className="mt-4 line-clamp-1 text-xl font-bold">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    By {book.author}
                  </p>

                  <p className="mt-3 text-sm text-gray-400">
                    Available Copies:{" "}
                    <span className="text-emerald-400">
                      {book.availableCopies ?? 0}
                    </span>
                  </p>

                  <Link
                    href={`/books/${book._id}`}
                    className="mt-5 block rounded-lg bg-emerald-500 py-3 text-center font-semibold text-black hover:bg-emerald-400"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}

          </div>
        )}
      </div>
    </main>
  );
}
