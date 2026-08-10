"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

const categoriiMama = ["Alăptat", "Burtiere și Maternitate", "Îngrijire postnatală", "Modă gravide"];
const categoriiCopil = ["Hăinuțe", "Cărucioare", "Jucării", "Mobilier cameră", "Hrănire", "Siguranță", "Cărți și Educație", "Accesorii"];
const toateCategoriile = [...categoriiMama, ...categoriiCopil];

const subcategoriiMap: Record<string, string[]> = {
  "Alăptat": ["Pompe de sân", "Sutiene alăptat", "Perne alăptat", "Protectoare mameloane", "Altele"],
  "Burtiere și Maternitate": ["Burtiere", "Haine gravide", "Ciorapi compresivi", "Altele"],
  "Îngrijire postnatală": ["Îngrijire cicatrice", "Produse postnatale", "Altele"],
  "Modă gravide": ["Bluze", "Pantaloni", "Rochii", "Seturi", "Altele"],
  "Hăinuțe": ["Body-uri", "Pijamale", "Rochițe", "Pantaloni", "Bluze", "Seturi", "Geci și Paltoane", "Accesorii vestimentare"],
  "Cărucioare": ["Cărucioare 3 în 1", "Cărucioare sport", "Landouri", "Accesorii cărucioare"],
  "Jucării": ["Jucării 0-1 an", "Jucării 1-3 ani", "Jucării 3+ ani", "Jucării educative", "Jocuri de societate"],
  "Mobilier cameră": ["Pătuțuri", "Saltele", "Leagăne", "Comodă", "Canapele alăptat"],
  "Hrănire": ["Biberoane", "Scaune de masă", "Sterilizatoare", "Tacâmuri bebeluș", "Recipiente alimente"],
  "Siguranță": ["Scaune auto", "Baby monitor", "Protecții colțuri", "Porți de siguranță"],
  "Cărți și Educație": ["Cărți bebeluși", "Cărți copii", "Jocuri educative", "Altele"],
  "Accesorii": ["Genți mamă", "Suzete", "Monitoare", "Altele"],
};

function MesajeLink({ userId }: { userId: string }) {
  const [necitite, setNecitite] = useState(0);

  useEffect(() => {
    if (!userId) return;
    const fetch = async () => {
      const { count } = await supabase
        .from("mesaje")
        .select("*", { count: "exact", head: true })
        .eq("to_user_id", userId)
        .eq("citit", false);
      setNecitite(count || 0);
    };
    fetch();
  }, [userId]);

  return (
    <Link href="/mesaje" className="relative text-sm text-gray-600 hover:text-pink-500 font-medium hidden sm:block px-3 py-2">
      Mesaje
      {necitite > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {necitite}
        </span>
      )}
    </Link>
  );
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [anunturi, setAnunturi] = useState<any[]>([]);
  const [anunturiAfisate, setAnunturiAfisate] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cautare, setCautare] = useState("");
  const [filtreVizibile, setFiltreVizibile] = useState(true);
  const [pretMin, setPretMin] = useState("");
  const [pretMax, setPretMax] = useState("");
  const [locatie, setLocatie] = useState("");
  const [categorieFiltru, setCategorieFiltru] = useState("");
  const [subcategorieFiltru, setSubcategorieFiltru] = useState("");
  const [sortare, setSortare] = useState("recent");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    fetchAnunturi();
  }, []);

  useEffect(() => {
    let rezultate = [...anunturi];
    if (cautare.trim()) {
      const t = cautare.toLowerCase();
      rezultate = rezultate.filter(a =>
        a.titlu?.toLowerCase().includes(t) ||
        a.categorie?.toLowerCase().includes(t) ||
        a.subcategorie?.toLowerCase().includes(t) ||
        a.descriere?.toLowerCase().includes(t) ||
        a.locatie?.toLowerCase().includes(t)
      );
    }
    if (categorieFiltru) rezultate = rezultate.filter(a => a.categorie === categorieFiltru);
    if (subcategorieFiltru) rezultate = rezultate.filter(a => a.subcategorie === subcategorieFiltru);
    if (pretMin) rezultate = rezultate.filter(a => a.pret >= parseFloat(pretMin));
    if (pretMax) rezultate = rezultate.filter(a => a.pret <= parseFloat(pretMax));
    if (locatie.trim()) rezultate = rezultate.filter(a => a.locatie?.toLowerCase().includes(locatie.toLowerCase()));
    if (sortare === "pret_asc") rezultate.sort((a, b) => a.pret - b.pret);
    else if (sortare === "pret_desc") rezultate.sort((a, b) => b.pret - a.pret);
    else rezultate.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setAnunturiAfisate(rezultate);
  }, [cautare, anunturi, categorieFiltru, subcategorieFiltru, pretMin, pretMax, locatie, sortare]);

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

  const resetFiltre = () => {
    setCautare("");
    setCategorieFiltru("");
    setSubcategorieFiltru("");
    setPretMin("");
    setPretMax("");
    setLocatie("");
  };

  const areFiltreActive = cautare || categorieFiltru || subcategorieFiltru || pretMin || pretMax || locatie;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">M&B</span>
            </div>
            <span className="text-lg font-bold text-gray-800 hidden sm:block">Mom<span className="text-pink-500">&</span>Baby</span>
            <span className="text-lg font-bold text-gray-800 sm:hidden">M<span className="text-pink-500">&</span>B</span>
          </Link>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="flex items-center w-full bg-gray-100 rounded-xl px-3 py-2">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" value={cautare} onChange={(e) => setCautare(e.target.value)}
                placeholder="Caută produse..." className="flex-1 bg-transparent outline-none text-gray-600 text-sm" />
              {cautare && <button onClick={() => setCautare("")} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            {user ? (
              <>
                <Link href="/anunturile-mele" className="text-sm text-gray-600 hover:text-pink-500 font-medium hidden sm:block px-3 py-2">
                  Anunțurile mele
                </Link>
                <MesajeLink userId={user?.id} />
                <Link href="/posteaza" className="px-4 py-2 bg-pink-500 text-white rounded-xl text-sm hover:bg-pink-600 font-semibold">
                  + Adaugă anunț
                </Link>
                <button onClick={handleLogout} className="px-3 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50">Ieșire</button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-pink-500 text-sm font-medium">Intră în cont</Link>
                <Link href="/login" className="px-4 py-2 bg-pink-500 text-white rounded-xl text-sm hover:bg-pink-600 font-semibold">Înregistrare</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <span className="inline-block bg-pink-50 text-pink-500 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            🌸 Platforma #1 pentru mame din România
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Cumpără și vinde<br />
            <span className="text-pink-500">pentru mămică și bebeluș</span>
          </h1>
          <p className="text-gray-500 mb-8 text-lg max-w-xl mx-auto">
            Un loc unde găsești tot ce ai nevoie ca mămică — de la produse noi și second-hand, până la sfaturi și o comunitate de mame ca tine.
          </p>
          <Link href="/posteaza" className="px-8 py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 shadow-sm">
            Postează un anunț
          </Link>
        </div>
      </section>

      <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center w-full bg-gray-100 rounded-xl px-3 py-2">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={cautare} onChange={(e) => setCautare(e.target.value)}
            placeholder="Caută produse..." className="flex-1 bg-transparent outline-none text-gray-600 text-sm" />
          {cautare && <button onClick={() => setCautare("")} className="text-gray-400">✕</button>}
        </div>
      </div>

      {!areFiltreActive && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Categorii</h2>
          <div className="mb-6">
            <p className="text-sm text-gray-500 font-medium mb-3">Pentru Mămică</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categoriiMama.map((cat) => (
                <button key={cat} onClick={() => setCategorieFiltru(cat)}
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
                <button key={cat} onClick={() => setCategorieFiltru(cat)}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium hover:border-pink-300 hover:text-pink-500 transition-all text-left">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-lg font-bold text-gray-800">
            {areFiltreActive ? `${anunturiAfisate.length} rezultate` : "Anunțuri recente"}
          </h2>
          <div className="flex gap-2 items-center flex-wrap">
            <select value={sortare} onChange={(e) => setSortare(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none focus:border-pink-400">
              <option value="recent">Cele mai recente</option>
              <option value="pret_asc">Preț crescător</option>
              <option value="pret_desc">Preț descrescător</option>
            </select>
            {areFiltreActive && (
              <button onClick={resetFiltre} className="text-pink-500 text-sm hover:underline font-medium">
                Șterge filtrele
              </button>
            )}
            <button onClick={() => setFiltreVizibile(!filtreVizibile)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${filtreVizibile ? "bg-pink-500 text-white border-pink-500" : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"}`}>
              🔧 Filtre
            </button>
          </div>
        </div>

        {filtreVizibile && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Categorie</label>
              <select value={categorieFiltru} onChange={(e) => { setCategorieFiltru(e.target.value); setSubcategorieFiltru(""); }}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400 text-gray-600">
                <option value="">Toate categoriile</option>
                {toateCategoriile.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            {categorieFiltru && subcategoriiMap[categorieFiltru] && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Subcategorie</label>
                <select value={subcategorieFiltru} onChange={(e) => setSubcategorieFiltru(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400 text-gray-600">
                  <option value="">Toate</option>
                  {subcategoriiMap[categorieFiltru].map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Preț minim (RON)</label>
              <input type="number" value={pretMin} onChange={(e) => setPretMin(e.target.value)}
                placeholder="ex: 50"
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Preț maxim (RON)</label>
              <input type="number" value={pretMax} onChange={(e) => setPretMax(e.target.value)}
                placeholder="ex: 500"
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Localitate</label>
              <input type="text" value={locatie} onChange={(e) => setLocatie(e.target.value)}
                placeholder="ex: Cluj, București"
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400" />
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16"><p className="text-gray-400">Se încarcă...</p></div>
        ) : anunturiAfisate.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500 mb-4">Nu am găsit anunțuri.</p>
            <button onClick={resetFiltre} className="text-pink-500 text-sm hover:underline font-medium">
              Resetează filtrele
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {anunturiAfisate.map((anunt) => (
              <Link key={anunt.id} href={`/anunt/${anunt.id}`}
                className="bg-white rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-md cursor-pointer overflow-hidden block transition-all">
                <div className="h-40 bg-gray-50 overflow-hidden relative">
                  {anunt.vandut && (
                    <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      VÂNDUT
                    </div>
                  )}
                  {anunt.imagine ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={anunt.imagine} alt={anunt.titlu} className={`w-full h-full object-cover ${anunt.vandut ? "opacity-50" : ""}`}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200 text-4xl">📷</div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex gap-1 flex-wrap mb-1">
                    <p className="text-xs text-pink-500 font-medium">{anunt.categorie}</p>
                    {anunt.subcategorie && <p className="text-xs text-gray-400">· {anunt.subcategorie}</p>}
                  </div>
                  <p className="text-gray-800 font-semibold text-sm mb-2 line-clamp-2 leading-snug">{anunt.titlu}</p>
                  <p className="text-gray-900 font-bold text-base">{anunt.pret} RON</p>
                  <p className="text-gray-400 text-xs mt-1">📍 {anunt.locatie}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-white border-t border-gray-100 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">M&B</span>
              </div>
              <span className="font-bold text-gray-800">Mom<span className="text-pink-500">&</span>Baby</span>
            </div>
            <p className="text-gray-400 text-sm">Platformă dedicată mamelor și copiilor din România</p>
            <div className="flex gap-4 text-sm text-gray-400">
              <Link href="/confidentialitate" className="hover:text-pink-500">Confidențialitate</Link>
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
