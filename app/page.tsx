"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

const categoriiMama = ["Alaptat", "Burtiere si Maternitate", "Ingrijire postnatala", "Moda gravide"];
const categoriiCopil = ["Hainute", "Carucioare", "Jucarii", "Mobilier camera", "Hranire", "Siguranta", "Carti si Educatie", "Accesorii"];

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [anunturi, setAnunturi] = useState<any[]>([]);
  const [anunturiAfisate, setAnunturiAfisate] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cautare, setCautare] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    fetchAnunturi();
  }, []);

  useEffect(() => {
    if (cautare.trim() === "") {
      setAnunturiAfisate(anunturi);
    } else {
      const t = cautare.toLowerCase();
      setAnunturiAfisate(anunturi.filter(a =>
        a.titlu?.toLowerCase().includes(t) ||
        a.categorie?.toLowerCase().includes(t) ||
        a.descriere?.toLowerCase().includes(t) ||
        a.locatie?.toLowerCase().includes(t)
      ));
    }
  }, [cautare, anunturi]);

  const fetchAnunturi = async () => {
    const { data } = await supabase.from("anunturi").select("*").order("created_at", { ascending: false }).limit(50);
    setAnunturi(data || []);
    setAnunturiAfisate(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">M&B</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Mom<span className="text-pink-500">&</span>Baby</span>
          </Link>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="flex items-center w-full bg-gray-100 rounded-xl px-3 py-2">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={cautare}
                onChange={(e) => setCautare(e.target.value)}
                placeholder="Cauta produse..."
                className="flex-1 bg-transparent outline-none text-gray-600 text-sm"
              />
              {cautare && <button onClick={() => setCautare("")} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            {user ? (
              <>
                <Link href="/anunturile-mele" className="text-sm text-gray-600 hover:text-pink-500 font-medium hidden sm:block px-3 py-2">
                  Anunturile mele
                </Link>
                <Link href="/posteaza" className="px-4 py-2 bg-pink-500 text-white rounded-xl text-sm hover:bg-pink-600 font-semibold">
                  + Adauga anunt
                </Link>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-gray-600 text-sm">
                  Iesire
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-pink-500 text-sm font-medium">
                  Intra in cont
                </Link>
                <Link href="/login" className="px-4 py-2 bg-pink-500 text-white rounded-xl text-sm hover:bg-pink-600 font-semibold">
                  Inregistrare
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-pink-50 text-pink-500 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              🌸 Platforma #1 pentru mame din Romania
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
              Cumpara si vinde<br />
              <span className="text-pink-500">pentru mamica si bebelus</span>
            </h1>
            <p className="text-gray-500 mb-8 text-lg">
              Un loc unde gasesti tot ce ai nevoie ca mamica — de la produse noi si second-hand, pana la sfaturi si o comunitate de mame ca tine.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/posteaza" className="px-8 py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 text-center shadow-sm">
                Posteaza un anunt
              </Link>
              <button onClick={() => document.getElementById('anunturi')?.scrollIntoView({behavior: 'smooth'})}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 text-center">
                Vezi anunturile
              </button>
            </div>
          </div>
          </div>
      </section>

      {/* Bara cautare mobil */}
      <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center w-full bg-gray-100 rounded-xl px-3 py-2">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={cautare} onChange={(e) => setCautare(e.target.value)}
            placeholder="Cauta produse..." className="flex-1 bg-transparent outline-none text-gray-600 text-sm" />
          {cautare && <button onClick={() => setCautare("")} className="text-gray-400">✕</button>}
        </div>
      </div>

      {/* Categorii */}
      {!cautare && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Categorii</h2>
          <div className="mb-6">
            <p className="text-sm text-gray-500 font-medium mb-3">Pentru Mamica</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categoriiMama.map((cat) => (
                <button key={cat} onClick={() => setCautare(cat)}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium hover:border-pink-300 hover:text-pink-500 transition-all text-left">
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-3">Pentru Copil</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categoriiCopil.map((cat) => (
                <button key={cat} onClick={() => setCautare(cat)}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium hover:border-pink-300 hover:text-pink-500 transition-all text-left">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Anunturi */}
      <section id="anunturi" className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {cautare ? `Rezultate pentru "${cautare}"` : "Anunturi recente"}
          </h2>
          {cautare && (
            <button onClick={() => setCautare("")} className="text-pink-500 text-sm hover:underline font-medium">
              Sterge filtrul
            </button>
          )}
        </div>
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-400">Se incarca...</p>
          </div>
        ) : anunturiAfisate.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500 mb-4">Nu am gasit anunturi pentru "{cautare}".</p>
            <button onClick={() => setCautare("")} className="text-pink-500 text-sm hover:underline font-medium">
              Vezi toate anunturile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {anunturiAfisate.map((anunt) => (
              <Link key={anunt.id} href={`/anunt/${anunt.id}`}
                className="bg-white rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-md cursor-pointer overflow-hidden block transition-all">
                <div className="h-40 bg-gray-50 overflow-hidden">
                  {anunt.imagine ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={anunt.imagine} alt={anunt.titlu} className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">📷</div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-pink-500 font-medium mb-1">{anunt.categorie}</p>
                  <p className="text-gray-800 font-semibold text-sm mb-2 line-clamp-2 leading-snug">{anunt.titlu}</p>
                  <p className="text-gray-900 font-bold text-base">{anunt.pret} RON</p>
                  <p className="text-gray-400 text-xs mt-1">📍 {anunt.locatie}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">M&B</span>
              </div>
              <span className="font-bold text-gray-800">Mom<span className="text-pink-500">&</span>Baby</span>
            </div>
            <p className="text-gray-400 text-sm">Platforma dedicata mamelor si copiilor din Romania</p>
            <div className="flex gap-4 text-sm text-gray-400">
              <Link href="/confidentialitate" className="hover:text-pink-500">Confidentialitate</Link>
              <span>·</span>
              <Link href="/termeni" className="hover:text-pink-500">Termeni</Link>
            </div>
          </div>
          <p className="text-center text-gray-300 text-xs mt-6">© 2024 Mom&amp;Baby. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </main>
  );
}
