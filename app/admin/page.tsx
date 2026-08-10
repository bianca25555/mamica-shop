"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

const ADMIN_EMAIL = "bianca.antoci@yahoo.com";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [anunturi, setAnunturi] = useState<any[]>([]);
  const [utilizatori, setUtilizatori] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("anunturi");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user?.email === ADMIN_EMAIL) {
        fetchDate();
      } else {
        setLoading(false);
      }
    });
  }, []);

  const fetchDate = async () => {
    const { data: anunturiData } = await supabase
      .from("anunturi")
      .select("*")
      .order("created_at", { ascending: false });
    setAnunturi(anunturiData || []);

    const { count } = await supabase
      .from("anunturi")
      .select("user_id", { count: "exact", head: false });
    const unici = new Set((anunturiData || []).map((a: any) => a.user_id)).size;
    setUtilizatori(unici);
    setLoading(false);
  };

  const stergeAnunt = async (id: string) => {
    if (!confirm("Ștergi acest anunț?")) return;
    await supabase.from("anunturi").delete().eq("id", id);
    setAnunturi((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleVandut = async (anunt: any) => {
    await supabase.from("anunturi").update({ vandut: !anunt.vandut }).eq("id", anunt.id);
    setAnunturi((prev) => prev.map((a) => a.id === anunt.id ? { ...a, vandut: !a.vandut } : a));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Se încarcă...</p>
      </main>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔒</p>
          <p className="text-gray-500 mb-4">Acces restricționat.</p>
          <Link href="/" className="text-pink-500 hover:underline text-sm">Înapoi acasă</Link>
        </div>
      </main>
    );
  }

  const anunturiActive = anunturi.filter(a => !a.vandut).length;
  const anunturiVandute = anunturi.filter(a => a.vandut).length;

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
          <span className="text-sm font-semibold text-pink-500 bg-pink-50 px-3 py-1 rounded-full">🛡️ Admin</span>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Panou Admin</h1>

        {/* Statistici */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <p className="text-3xl font-bold text-pink-500">{anunturi.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total anunțuri</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <p className="text-3xl font-bold text-green-500">{anunturiActive}</p>
            <p className="text-sm text-gray-500 mt-1">Anunțuri active</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <p className="text-3xl font-bold text-gray-400">{anunturiVandute}</p>
            <p className="text-sm text-gray-500 mt-1">Vândute</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <p className="text-3xl font-bold text-blue-500">{utilizatori}</p>
            <p className="text-sm text-gray-500 mt-1">Utilizatori activi</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          <button onClick={() => setTab("anunturi")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === "anunturi" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>
            Anunțuri ({anunturi.length})
          </button>
          <button onClick={() => setTab("vandute")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === "vandute" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>
            Vândute ({anunturiVandute})
          </button>
        </div>

        {/* Lista anunturi */}
        <div className="flex flex-col gap-3">
          {anunturi
            .filter(a => tab === "vandute" ? a.vandut : !a.vandut)
            .map((anunt) => (
              <div key={anunt.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  {anunt.imagine ? (
                    <img src={anunt.imagine} alt={anunt.titlu} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200 text-xl">📷</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-pink-500 font-medium">{anunt.categorie} {anunt.subcategorie ? `· ${anunt.subcategorie}` : ""}</p>
                  <p className="text-gray-800 font-semibold truncate">{anunt.titlu}</p>
                  <p className="text-gray-500 text-sm">{anunt.pret} RON · {anunt.locatie}</p>
                  <p className="text-gray-300 text-xs">{new Date(anunt.created_at).toLocaleDateString("ro-RO")}</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link href={`/anunt/${anunt.id}`}
                    className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 text-center">
                    Vezi
                  </Link>
                  <button onClick={() => toggleVandut(anunt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-center ${anunt.vandut ? "border-green-200 text-green-500 hover:bg-green-50" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                    {anunt.vandut ? "Disponibil" : "Vândut"}
                  </button>
                  <button onClick={() => stergeAnunt(anunt.id)}
                    className="px-3 py-1.5 border border-red-100 text-red-400 rounded-lg text-xs font-medium hover:bg-red-50">
                    Șterge
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
