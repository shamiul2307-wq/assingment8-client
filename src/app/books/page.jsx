
  
 "use client";  

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Loader2,
  AlertCircle,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

    const response = await fetch(`${API_URL}/books`, {
        cache: "no-store",
      });

       

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();

      if (!result.success || !Array.isArray(result.data)) {
        throw new Error("Invalid API response");
      }

      setBooks(result.data);
    } catch (err) {
      console.error("Books API Error:", err);
      setError(err.message || "Books load হচ্ছে না।");
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

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title?.toLowerCase().includes(search.toLowerCase()) ||
        book.author?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [books, search, category]);

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-12 text-gray-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            <BookOpen size={18} />
            BookNook Library
          </div>

          <h1 className="text-3xl font-bold sm:text-5xl">
            Explore Our Books
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Discover your next favorite book from our growing collection.
            Search, explore and enjoy reading.
          </p>

          <p className="mt-3 text-sm font-medium text-indigo-600">
            {books.length} Books Available
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search by book title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-indigo-500"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-60 items-center justify-center gap-3">
            <Loader2 className="animate-spin text-indigo-600" size={30} />
            <p className="text-gray-500">Loading books...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl bg-red-50 p-8 text-center text-red-600">
            <AlertCircle className="mx-auto mb-3" size={35} />
            <p className="font-semibold">{error}</p>
            <p className="mt-2 text-sm">
              Please check whether your backend server is running.
            </p>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && (
          <>
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    {/* Book Image */}
                    <div className="h-64 overflow-hidden bg-gray-100">
                      {book.image ? (
                        <img
                          src={book.image}
                          alt={book.title || "Book cover"}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center text-gray-400">
                          <BookOpen size={55} />
                          <span className="mt-2 text-sm">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Book Information */}
                    <div className="p-5">
                      <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                        {book.category || "General"}
                      </span>

                      <h2 className="mt-3 line-clamp-1 text-xl font-bold">
                        {book.title}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        By {book.author}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          Available Copies
                        </span>
                        <span className="font-bold text-green-600">
                          {book.availableCopies ?? 0}
                        </span>
                      </div>

                      <Link
                        href={`/books/${book._id}`}
                        className="mt-5 block rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white px-5 py-16 text-center shadow-sm">
                <BookOpen
                  size={55}
                  className="mx-auto mb-4 text-gray-300"
                />
                <h2 className="text-xl font-bold">No Books Found</h2>
                <p className="mt-2 text-gray-500">
                  Try another search or category.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}