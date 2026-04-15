"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [anunturi, setAnunturi] = useState<any[]>([]);
  const [anunturiAfisate, setAnunturiAfisate] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cautare, setCautare] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    fetchAnunturi();
  }, []);

  useEffect(() => {
    if (cautare.trim() === "") {
      setAnunturiAfisate(anunturi);
    } else {
      const termen = cautare.toLowerCase();
      setAnunturiAfisate(
        anunturi.filter(
          (a) =>
            a.titlu?.toLowerCase().includes(termen) ||
            a.categorie?.toLowerCase().includes(termen) ||
            a.descriere?.toLowerCase().includes(termen) ||
            a.locatie?.toLowerCase().includes(termen)
        )
      );
    }
  }, [cautare, anunturi]);

  const fetchAnunturi = async () => {
    const { data } = await supabase
      .from("anunturi")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setAnunturi(data || []);
    setAnunturiAfisate(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <main className="min-h-screen bg-pink-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-pink-500">Mom&amp;Baby</Link>
          <div className="flex gap-3 items-center">
            {user ? (
              <>
                <span className="text-sm text-gray-600">👋 {user.email}</span>
                <button onClick={handleLogout}
                  className="px-4 py-2 text-pink-500 border border-pink-500 rounded-full text-sm hover:bg-pink-50">
                  Deconectare
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-pink-500 border border-pink-500 rounded-full text-sm hover:bg-pink-50">
                  Intra in cont
                </Link>
                <Link href="/login" className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600">
                  Inregistrare
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Totul pentru mamica si bebelus
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          Cumpara si vinde obiecte pentru mame si copii, simplu si sigur.
        </p>
        <div className="flex items-center max-w-2xl mx-auto bg-white rounded-full shadow-md px-4 py-2 mb-8">
          <input
            type="text"
            value={cautare}
            onChange={(e) => setCautare(e.target.value)}
            placeholder="Cauta un produs... ex: carucior, biberon, burtiera"
            className="flex-1 outline-none text-gray-600 text-sm px-2"
          />
          {cautare && (
            <button onClick={() => setCautare("")} className="text-gray-300 hover:text-gray-500 mr-2 text-lg">
              ✕
            </button>
          )}
          <button className="bg-pink-500 text-white px-6 py-2 rounded-full text-sm hover:bg-pink-600">
            Cauta
          </button>
        </div>
        <Link href="/posteaza" className="inline-block px-8 py-3 bg-pink-500 text-white rounded-full text-lg hover:bg-pink-600">
          Posteaza un anunt
        </Link>
      </section>

      {!cautare && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Categorii</h3>
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-pink-500 mb-4">Pentru Mamica</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Alaptat", "Burtiere si Maternitate", "Ingrijire postnatala", "Moda gravide"].map((cat) => (
                <div key={cat} onClick={() => setCautare(cat)}
                  className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md cursor-pointer">
                  <p className="text-gray-700 font-medium">{cat}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-blue-400 mb-4">Pentru Copil</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Hainute", "Carucioare", "Jucarii", "Mobilier camera", "Hranire", "Siguranta", "Carti si Educatie", "Accesorii"].map((cat) => (
                <div key={cat} onClick={() => setCautare(cat)}
                  className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md cursor-pointer">
                  <p className="text-gray-700 font-medium">{cat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {cautare ? `Rezultate pentru "${cautare}"` : "Anunturi recente"}
          </h3>
          {cautare && (
            <button onClick={() => setCautare("")} className="text-pink-500 text-sm hover:underline">
              Sterge filtrul
            </button>
          )}
        </div>
        {loading ? (
          <p className="text-gray-400 text-center py-8">Se incarca...</p>
        ) : anunturiAfisate.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-400">Nu am gasit anunturi pentru "{cautare}".</p>
            <button onClick={() => setCautare("")} className="text-pink-500 text-sm hover:underline mt-2 inline-block">
              Vezi toate anunturile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {anunturiAfisate.map((anunt) => (
              <Link key={anunt.id} href={`/anunt/${anunt.id}`} className="bg-white rounded-2xl shadow-sm hover:shadow-md cursor-pointer overflow-hidden block">
                <div className="h-36 bg-pink-100 overflow-hidden">
                  {anunt.imagine ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={anunt.imagine} alt={anunt.titlu}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">🛍️</div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-pink-400 font-medium mb-1">{anunt.categorie}</p>
                  <p className="text-gray-800 font-semibold text-sm mb-1">{anunt.titlu}</p>
                  <p className="text-pink-500 font-bold text-base mb-2">{anunt.pret} RON</p>
                  <p className="text-gray-400 text-xs">📍 {anunt.locatie}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-white mt-16 py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p className="font-bold text-pink-500 text-lg mb-2">Mom&amp;Baby</p>
          <p>Platforma dedicata mamelor si copiilor din Romania</p>
          <p className="mt-2">© 2024 Mom&amp;Baby. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </main>
  );
}
