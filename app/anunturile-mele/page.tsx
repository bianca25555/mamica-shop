"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function AnunturileMele() {
  const [user, setUser] = useState<any>(null);
  const [anunturi, setAnunturi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) fetchAnunturi(data.user.id);
      else setLoading(false);
    });
  }, []);

  const fetchAnunturi = async (userId: string) => {
    const { data } = await supabase
      .from("anunturi")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    setAnunturi(data || []);
    setLoading(false);
  };

  const stergeAnunt = async (id: string) => {
    if (!confirm("Esti sigura ca vrei sa stergi acest anunt?")) return;
    await supabase.from("anunturi").delete().eq("id", id);
    setAnunturi((prev) => prev.filter((a) => a.id !== id));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center">
        <p className="text-gray-400">Se incarca...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔒</p>
          <p className="text-gray-500 mb-4">Trebuie sa fii logat pentru a vedea anunturile tale.</p>
          <Link href="/login" className="bg-pink-500 text-white px-6 py-3 rounded-full text-sm hover:bg-pink-600">
            Intra in cont
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-pink-500">Mom&amp;Baby</Link>
          <div className="flex gap-3 items-center">
            <span className="text-sm text-gray-600">👋 {user.email}</span>
            <Link href="/posteaza" className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600">
              + Anunt nou
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Anunturile mele</h2>
          <span className="text-gray-400 text-sm">{anunturi.length} anunturi</span>
        </div>

        {anunturi.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-500 mb-6">Nu ai postat niciun anunt inca.</p>
            <Link href="/posteaza" className="bg-pink-500 text-white px-8 py-3 rounded-full text-sm hover:bg-pink-600">
              Posteaza primul anunt
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {anunturi.map((anunt) => (
              <div key={anunt.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center">
                <div className="w-20 h-20 bg-pink-100 rounded-xl overflow-hidden flex-shrink-0">
                  {anunt.imagine ? (
                    <img src={anunt.imagine} alt={anunt.titlu} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🛍️</div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-pink-400 font-medium mb-1">{anunt.categorie}</p>
                  <p className="text-gray-800 font-semibold">{anunt.titlu}</p>
                  <p className="text-pink-500 font-bold">{anunt.pret} RON</p>
                  <p className="text-gray-400 text-xs mt-1">📍 {anunt.locatie}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`/anunt/${anunt.id}`}
                    className="px-4 py-2 text-pink-500 border border-pink-500 rounded-full text-xs hover:bg-pink-50 text-center">
                    Vezi
                  </Link>
                  <button
                    onClick={() => stergeAnunt(anunt.id)}
                    className="px-4 py-2 text-red-400 border border-red-300 rounded-full text-xs hover:bg-red-50">
                    Sterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
