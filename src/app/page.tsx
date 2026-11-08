  import HeroSlider from "@/components/HeroSlider";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import { BookOpen, Heart, Library } from "lucide-react";
export const instant = false;

type Book = {
  _id: string;
  title: string;
  author: string;
  image?: string;
  category: string;
  description?: string;
  totalCopies?: number;
  availableCopies?: number;
};

async function getLatestBooks() {
  try {
     const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const response = await fetch(
  `${API_URL}/books`,
  { cache: "no-store" }
);

    if (!response.ok) return [];

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Book loading error:", error);
    return [];
  }
}

export default async function HomePage() {
  const books = await getLatestBooks();

  return (
    <>
      <HeroSlider />

      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <span className="text-[#9b8051] font-bold uppercase tracking-widest">
            Recently Added
          </span>

          <h2 className="text-4xl font-bold text-[#244b39] mt-3">
            New Arrivals
          </h2>

          <p className="text-gray-500 mt-4">
            Discover the latest additions to our growing library.
          </p>
        </div>

        {books.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book : Book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No books have been added yet. Be the first to share a book!
          </p>
        )}

        <div className="text-center mt-12">
          <Link
            href="/books"
            className="inline-block bg-[#244b39] text-white px-8 py-4 rounded-lg font-bold"
          >
            See All Books
          </Link>
        </div>
      </section>

      <section className="bg-[#eeeae0] py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#244b39]">
              How BookNook Works
            </h2>
            <p className="text-gray-600 mt-3">
              Three simple steps to enjoy your next read.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Library size={35} />,
                title: "Discover",
                description: "Explore books from different categories.",
              },
              {
                icon: <BookOpen size={35} />,
                title: "Borrow",
                description: "Borrow an available book for 14 days.",
              },
              {
                icon: <Heart size={35} />,
                title: "Return & Share",
                description: "Return your book and let someone else enjoy it.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 text-center"
              >
                <div className="text-[#9b8051] flex justify-center mb-5">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-[#244b39]">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-20 text-center">
        <h2 className="text-4xl font-bold text-[#244b39]">
          A Community Built Around Books
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 mt-5 leading-8">
          Every shared book carries a new opportunity to learn, imagine and
          connect. Add your favorite books and help our reading community grow.
        </p>

        <Link
          href="/add-book"
          className="inline-block mt-8 bg-[#244b39] text-white px-8 py-4 rounded-lg font-bold"
        >
          Share a Book
        </Link>
      </section>
    </>
  );
}

 