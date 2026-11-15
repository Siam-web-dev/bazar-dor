"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
import { useSession, signOut } from "@/lib/auth-client"; // path ta tomar project onujayi thik koro

const categories = [
  { name: "চাল", href: "/category/rice", icon: "🍚" },
  { name: "ডাল", href: "/category/dal", icon: "🫘" },
  { name: "তেল", href: "/category/oil", icon: "🛢️" },
  { name: "সবজি", href: "/category/vegetables", icon: "🥬" },
  { name: "মাছ", href: "/category/fish", icon: "🐟" },
  { name: "মাংস", href: "/category/meat", icon: "🍗" },
  { name: "ডিম-দুধ", href: "/category/egg-milk", icon: "🥛" },
  { name: "মসলা", href: "/category/spices", icon: "🌶️" },
];

export default function Navbar() {
  const router = useRouter();

  // Better Auth er hook: SessionProvider lagbe na
  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [today, setToday] = useState("");
  const menuRef = useRef(null);

  // Bangla tarikh
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  // Baire click korle dropdown bondho
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
      <nav className="border-t border-gray-100">
        <ul className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-3 sm:px-6">
          {categories.map((cat) => (
            <li key={cat.href} className="shrink-0">
              <Link
                href={cat.href}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-700"
              >
                <span aria-hidden>{cat.icon}</span>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}