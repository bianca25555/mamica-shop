"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookiesBanner() {
  const [vizibil, setVizibil] = useState(false);

  useEffect(() => {
    const acceptat = localStorage.getItem("cookies-acceptate");
    if (!acceptat) setVizibil(true);
  }, []);

  const accepta = () => {
    localStorage.setItem("cookies-acceptate", "true");
    setVizibil(false);
  };

  if (!vizibil) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm text-center sm:text-left">
          Folosim cookie-uri strict necesare pentru functionarea platformei. 
          Citeste <Link href="/confidentialitate" className="text-pink-500 hover:underline">politica de confidentialitate</Link>.
        </p>
        <div className="flex gap-3">
          <button
            onClick={accepta}
            className="px-6 py-2 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600 whitespace-nowrap">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
