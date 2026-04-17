"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function ParolaNoua() {
  const [parola, setParola] = useState("");
  const [confirmaParola, setConfirmaParola] = useState("");
  const [salvat, setSalvat] = useState(false);
  const [eroare, setEroare] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSalveaza = async () => {
    setEroare("");
    if (parola.length < 8) { setEroare("Parola trebuie sa aiba minimum 8 caractere."); return; }
    if (parola !== confirmaParola) { setEroare("Parolele nu coincid."); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: parola });
    setLoading(false);
    if (error) setEroare("A aparut o eroare. Incearca din nou.");
    else setSalvat(true);
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
          {salvat ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Parola schimbata!</h2>
              <p className="text-gray-400 text-sm mb-6">Parola ta a fost actualizata cu succes.</p>
              <Link href="/" className="inline-block bg-pink-500 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-pink-600">
                Mergi acasa
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Parola noua</h1>
                <p className="text-gray-400 text-sm">Alege o parola noua pentru contul tau</p>
              </div>

              {eroare && <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-4">{eroare}</div>}

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Parola noua</label>
                  <input type="password" value={parola} onChange={(e) => setParola(e.target.value)}
                    placeholder="Minimum 8 caractere"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Confirma parola</label>
                  <input type="password" value={confirmaParola} onChange={(e) => setConfirmaParola(e.target.value)}
                    placeholder="Repeta parola"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
                </div>
                <button onClick={handleSalveaza} disabled={loading}
                  className="w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-pink-600 disabled:opacity-50">
                  {loading ? "Se salveaza..." : "Salveaza parola noua"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
