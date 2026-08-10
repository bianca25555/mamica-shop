"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Mesaje() {
  const [user, setUser] = useState<any>(null);
  const [conversatii, setConversatii] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) fetchConversatii(data.user.id);
      else setLoading(false);
    });
  }, []);

  const fetchConversatii = async (userId: string) => {
    const { data } = await supabase
      .from("mesaje")
      .select("*")
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (data) {
      const conversatiiMap = new Map();
      data.forEach((mesaj) => {
        const altId = mesaj.from_user_id === userId ? mesaj.to_user_id : mesaj.from_user_id;
        const key = `${mesaj.anunt_id}-${altId}`;
        if (!conversatiiMap.has(key)) {
          conversatiiMap.set(key, { ...mesaj, altUserId: altId });
        }
      });
      setConversatii(Array.from(conversatiiMap.values()));
    }
    setLoading(false);
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
          <p className="text-gray-500 mb-4">Trebuie sa fii logat pentru a vedea mesajele.</p>
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
          <Link href="/" className="text-sm text-gray-500 hover:text-pink-500">← Acasa</Link>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mesajele mele</h1>

        {conversatii.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-5xl mb-4">💬</p>
            <p className="text-gray-500 mb-2 font-medium">Nu ai niciun mesaj inca.</p>
            <p className="text-gray-400 text-sm">Cand cineva iti trimite un mesaj, va aparea aici.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {conversatii.map((conv) => (
              <Link key={conv.id} href={`/mesaje/${conv.anunt_id}/${conv.altUserId}`}
                className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-pink-200 transition-all block">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">
                      Anunt: {conv.anunt_id}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{conv.continut}</p>
                  </div>
                  <p className="text-xs text-gray-300 ml-4 flex-shrink-0">
                    {new Date(conv.created_at).toLocaleDateString("ro-RO")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
