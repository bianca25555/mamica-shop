"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function ResetareParola() {
  const [email, setEmail] = useState("");
  const [trimis, setTrimis] = useState(false);
  const [eroare, setEroare] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setEroare("");
    if (!email) { setEroare("Te rugam sa introduci emailul."); return; }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/parola-noua`,
    });
    setLoading(false);
    if (error) setEroare("A aparut o eroare. Verifica emailul introdus.");
    else setTrimis(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">M&B</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Mom<span className="text-pink-500">&</span>Baby</span>
          </Link>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-md p-8">
          {trimis ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📧</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Email trimis!</h2>
              <p className="text-gray-400 text-sm mb-6">
                Verifica emailul <strong className="text-gray-600">{email}</strong> si urmeaza instructiunile pentru a-ti reseta parola.
              </p>
              <Link href="/login" className="text-pink-500 hover:underline text-sm font-medium">
                Inapoi la login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Ai uitat parola?</h1>
                <p className="text-gray-400 text-sm">Introdu emailul si iti trimitem un link de resetare</p>
              </div>

              {eroare && <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-4">{eroare}</div>}

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplu@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
                </div>
                <button onClick={handleReset} disabled={loading}
                  className="w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-pink-600 disabled:opacity-50">
                  {loading ? "Se trimite..." : "Trimite link de resetare"}
                </button>
                <p className="text-center text-sm text-gray-400">
                  <Link href="/login" className="text-pink-500 hover:underline font-medium">
                    Inapoi la login
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
