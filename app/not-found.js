import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white px-5 text-center">
      <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-slate-400 mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br shadow-md transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}
