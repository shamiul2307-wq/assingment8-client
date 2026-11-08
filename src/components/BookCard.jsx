import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#eae7df] hover:shadow-xl transition duration-300 flex flex-col">
      <div className="h-64 bg-[#f0eee6] overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs uppercase tracking-widest font-bold text-[#9b8051]">
          {book.category}
        </span>

        <h3 className="text-xl font-bold text-[#244b39] mt-2 line-clamp-1">
          {book.title}
        </h3>

        <p className="text-gray-500 mt-1">
          By {book.author}
        </p>

        <div className="mt-auto pt-5">
          <Link
            href={`/books/${book._id}`}
            className="flex items-center justify-center gap-2 w-full bg-[#244b39] text-white py-3 rounded-lg hover:bg-[#183628]"
          >
            View Details
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}