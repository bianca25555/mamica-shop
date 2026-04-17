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
    const { data } = await supabase.from("anunturi").select("*").eq("user_id", userId).order("created_at", { ascending: false });
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
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Se incarca...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔒</p>
          <p className="text-gray-500 mb-4">Trebuie sa fii logat pentru a vedea anunturile tale.</p>
          <Link href="/login" className="bg-pink-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-pink-600">
            Intra in cont
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">M&B</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Mom<span className="text-pink-500">&</span>Baby</span>
          </Link>
          <Link href="/posteaza" className="px-4 py-2 bg-pink-500 text-white rounded-xl text-sm font-semibold hover:bg-pink-600">
            + Anunt nou
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Anunturile mele</h1>
            <p className="text-gray-400 text-sm mt-1">{anunturi.length} anunturi active</p>
          </div>
        </div>

        {anunturi.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-500 mb-2 font-medium">Nu ai postat niciun anunt inca.</p>
            <p className="text-gray-400 text-sm mb-6">Incepe sa vinzi produse pentru mame si copii!</p>
            <Link href="/posteaza" className="bg-pink-500 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-pink-600">
              Posteaza primul anunt
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {anunturi.map((anunt) => (
              <div key={anunt.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center hover:border-pink-100 transition-all">
                <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                  {anunt.imagine ? (
                    <img src={anunt.imagine} alt={anunt.titlu} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200 text-2xl">📷</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-pink-500 font-medium bg-pink-50 px-2 py-0.5 rounded-full">{anunt.categorie}</span>
                  <p className="text-gray-800 font-semibold mt-1 truncate">{anunt.titlu}</p>
                  <p className="text-gray-900 font-bold">{anunt.pret} RON</p>
                  <p className="text-gray-400 text-xs mt-0.5">📍 {anunt.locatie}</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link href={`/anunt/${anunt.id}`}
  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-medium hover:bg-gray-50 text-center">
  Vezi
</Link>
<Link href={`/editeaza/${anunt.id}`}
  className="px-4 py-2 border border-pink-200 text-pink-500 rounded-xl text-xs font-medium hover:bg-pink-50 text-center">
  Editeaza
</Link>
<button onClick={() => stergeAnunt(anunt.id)}
  className="px-4 py-2 border border-red-100 text-red-400 rounded-xl text-xs font-medium hover:bg-red-50">
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
