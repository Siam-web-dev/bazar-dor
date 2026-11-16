"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client"; // path ta tomar project onujayi thik koro

export default function Navbar() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();
 
  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [today, setToday] = useState("");
  const menuRef = useRef(null);

  // data fetching
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
            <ShoppingCart size={20} />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold text-gray-900">
              বাজার দর
            </span>
            <span className="block text-xs text-gray-500">{today}</span>
          </span>
        </Link>

        {isPending ? (
          <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-100" />
        ) : !user ? (
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-gray-100"
            >
              {user.image ? (
                // Google/GitHub image er jonno normal img use korlam,
                // jate next.config e domain add na korleo kaj kore
                <img
                  src={user.image}
                  alt={user.name || "Profile"}
                  referrerPolicy="no-referrer"
                  className="h-9 w-9 rounded-lg object-cover"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 font-semibold text-green-700">
                  {firstName[0]?.toUpperCase()}
                </span>
              )}
              <span className="text-sm font-medium text-gray-800">
                {firstName}
              </span>
              <ChevronDown
                size={14}
                className={`text-gray-500 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
              >
                <div className="border-b border-gray-100 pb-3">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="truncate text-sm text-gray-500">{user.email}</p>
                </div>

                <Link
                  href="/profile"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-800 hover:bg-gray-100"
                >
                  <User size={16} />
                  আমার প্রোফাইল
                </Link>

                <button
                  role="menuitem"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  সাইন আউট
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category bar */}
      <nav className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-3 sm:px-6">
        {categories.map((cat) => {
          const isActive =
            pathname === `/${cat.slug}` ||
            pathname === `/categories/${cat.slug}`;

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={isActive ? "text-green-600" : "text-gray-600"}
            >
              <div className="space-x-5">
                {cat.icon}
                {cat.nameBn}
              </div>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
