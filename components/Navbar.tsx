import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav className="p-4 bg-teal-600 dark:bg-teal-300 text-white">
        <h1 className="text-2xl font-bold text-center">
          <Link href="/">Flash Card</Link>
        </h1>
      </nav>
    </header>
  );
}
