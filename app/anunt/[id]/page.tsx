"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AnuntPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [anunt, setAnunt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchAnunt = async () => {
      const { data } = await supabase
        .from("anunturi")
        .select("*")
        .eq("id", id)
        .single();
      setAnunt(data);
      setLoading(false);
    };
    fetchAnunt();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center">
        <p className="text-gray-400">Se incarca...</p>
      </main>
    );
  }

  if (!anunt) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <p className="text-gray-500">Anuntul nu a fost gasit.</p>
          <Link href="/" className="text-pink-500 hover:underline text-sm mt-2 inline-block">Inapoi acasa</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-pink-500">Mom&amp;Baby</Link>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 text-pink-500 border border-pink-500 rounded-full text-sm hover:bg-pink-50">
              Intra in cont
            </Link>
            <Link href="/login" className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600">
              Inregistrare
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-pink-500">Acasa</Link>
          <span className="mx-2">›</span>
          <span>{anunt.categorie}</span>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{anunt.titlu}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Imagine */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden h-80">
            {anunt.imagine ? (
              <img src={anunt.imagine} alt={anunt.titlu} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">🛍️</div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs text-pink-400 font-medium bg-pink-50 px-3 py-1 rounded-full w-fit">
              {anunt.categorie}
            </span>
            <h1 className="text-2xl font-bold text-gray-800">{anunt.titlu}</h1>
            <p className="text-3xl font-bold text-pink-500">{anunt.pret} RON</p>
            <p className="text-gray-400 text-sm">📍 {anunt.locatie}</p>

            <div className="bg-pink-50 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-pink-500 font-bold text-lg">
                👤
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Vanzator</p>
                <p className="text-xs text-gray-400">Membru Mom&Baby</p>
              </div>
            </div>

            <a href={`tel:${anunt.telefon}`}
              className="w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-pink-600 text-center">
              📞 {anunt.telefon}
            </a>
            <button className="w-full border border-pink-500 text-pink-500 py-3 rounded-xl text-sm font-medium hover:bg-pink-50">
              💬 Trimite mesaj
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Descriere</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{anunt.descriere}</p>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-pink-500 text-sm hover:underline">← Inapoi la anunturi</Link>
        </div>
      </section>
    </main>
  );
}
