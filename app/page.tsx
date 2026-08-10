"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
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

const categoriiMama = ["Alaptat", "Burtiere si Maternitate", "Ingrijire postnatala", "Moda gravide"];
const categoriiCopil = ["Hainute", "Carucioare", "Jucarii", "Mobilier camera", "Hranire", "Siguranta", "Carti si Educatie", "Accesorii"];
const toateCategoriile = [...categoriiMama, ...categoriiCopil];

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

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    fetchAnunturi();
  }, []);

  useEffect(() => {
    let rezultate = anunturi;
    if (cautare.trim()) {
      const t = cautare.toLowerCase();
      rezultate = rezultate.filter(a =>
        a.titlu?.toLowerCase().includes(t) ||
        a.categorie?.toLowerCase().includes(t) ||
        a.descriere?.toLowerCase().includes(t) ||
        a.locatie?.toLowerCase().includes(t)
      );
    }
    if (categorieFiltru) rezultate = rezultate.filter(a => a.categorie === categorieFiltru);
    if (pretMin) rezultate = rezultate.filter(a => a.pret >= parseFloat(pretMin));
    if (pretMax) rezultate = rezultate.filter(a => a.pret <= parseFloat(pretMax));
    if (locatie.trim()) rezultate = rezultate.filter(a => a.locatie?.toLowerCase().includes(locatie.toLowerCase()));
    setAnunturiAfisate(rezultate);
  }, [cautare, anunturi, categorieFiltru, pretMin, pretMax, locatie]);

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
    setPretMin("");
    setPretMax("");
    setLocatie("");
  };

  const areFiltreActive = cautare || categorieFiltru || pretMin || pretMax || locatie;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center group-hover:bg-pink-600 transition-colors">
              <span className="text-white text-xs font-bold">M&B</span>
            </div>
            <span className="text-lg font-bold text-gray-800 hidden sm:block">Mom<span className="text-pink-500">&</span>Baby</span>
            <span className="text-lg font-bold text-gray-800 sm:hidden">M<span className="text-pink-500">&</span>B</span>
          </Link>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="flex items-center w-full bg-gray-100 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-pink-200 transition-all">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" value={cautare} onChange={(e) => setCautare(e.target.value)}
                placeholder="Cauta produse..." className="flex-1 bg-transparent outline-none text-gray-600 text-sm" />
              {cautare && <button onClick={() => setCautare("")} className="text-gray-400 hover:text-gray-600 text-sm transition-colors">✕</button>}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            {user ? (
              <>
                <Link href="/anunturile-mele" className="text-sm text-gray-600 hover:text-pink-500 font-medium block px-3 py-2 transition-colors">
                  Anunturile mele
                </Link>
                <MesajeLink userId={user?.id} />
                <Link href="/posteaza" className="btn-animate px-4 py-2 bg-pink-500 text-white rounded-xl text-sm hover:bg-pink-600 font-semibold">
                  + Adauga anunt
                </Link>
                <button onClick={handleLogout} className="px-3 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">Iesire</button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-pink-500 text-sm font-medium transition-colors">Intra in cont</Link>
                <Link href="/login?mod=register" className="btn-animate px-4 py-2 bg-pink-500 text-white rounded-xl text-sm hover:bg-pink-600 font-semibold">Inregistrare</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 4. Hero cu gradient subtil */}
      <section className="bg-gradient-to-br from-white via-pink-50/40 to-purple-50/30 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center animate-fade-in">
          <span className="inline-block bg-pink-50 text-pink-500 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-pink-100">
            🌸 Platforma #1 pentru mame din Romania
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
            Cumpara si vinde<br />
            <span className="text-pink-500">pentru mamica si bebelus</span>
          </h1>
          <p className="text-gray-500 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
            Un loc unde gasesti tot ce ai nevoie ca mamica — de la produse noi si second-hand, pana la sfaturi si o comunitate de mame ca tine.
          </p>
          <Link href="/posteaza" className="btn-animate inline-block px-8 py-3.5 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 text-base">
            Posteaza un anunt
          </Link>
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
      {!areFiltreActive && (
        <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-in-delay-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Categorii</h2>
          <div className="mb-6">
            <p className="text-sm text-gray-500 font-medium mb-3">Pentru Mamica</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categoriiMama.map((cat) => (
                <button key={cat} onClick={() => setCategorieFiltru(cat)}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50/50 transition-all text-left">
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
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50/50 transition-all text-left">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filtre & Anunturi */}
      <section className="max-w-6xl mx-auto px-4 py-6 animate-fade-in-delay-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {areFiltreActive ? `${anunturiAfisate.length} rezultate` : "Anunturi recente"}
          </h2>
          <div className="flex gap-2">
            {areFiltreActive && (
              <button onClick={resetFiltre} className="text-pink-500 text-sm hover:underline font-medium">
                Sterge filtrele
              </button>
            )}
            <button onClick={() => setFiltreVizibile(!filtreVizibile)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${filtreVizibile ? "bg-pink-500 text-white border-pink-500" : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"}`}>
              🔧 Filtre
            </button>
          </div>
        </div>

        {/* Panou filtre */}
        {filtreVizibile && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Categorie</label>
              <select value={categorieFiltru} onChange={(e) => setCategorieFiltru(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400 text-gray-600 transition-colors">
                <option value="">Toate categoriile</option>
                {toateCategoriile.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Pret minim (RON)</label>
              <input type="number" value={pretMin} onChange={(e) => setPretMin(e.target.value)}
                placeholder="ex: 50"
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Pret maxim (RON)</label>
              <input type="number" value={pretMax} onChange={(e) => setPretMax(e.target.value)}
                placeholder="ex: 500"
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Localitate</label>
              <input type="text" value={locatie} onChange={(e) => setLocatie(e.target.value)}
                placeholder="ex: Cluj, Bucuresti"
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400 transition-colors" />
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16"><p className="text-gray-400">Se incarca...</p></div>
        ) : anunturiAfisate.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500 mb-4">Nu am gasit anunturi.</p>
            <button onClick={resetFiltre} className="text-pink-500 text-sm hover:underline font-medium">
              Reseteaza filtrele
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {anunturiAfisate.map((anunt, index) => (
              <Link key={anunt.id} href={`/anunt/${anunt.id}`}
                className="card-hover bg-white rounded-2xl border border-gray-100 cursor-pointer overflow-hidden block"
                style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="h-40 bg-gray-50 overflow-hidden">
                  {anunt.imagine ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={anunt.imagine} alt={anunt.titlu} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200 text-4xl">📷</div>
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

      {/* 6. Footer mai bogat */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Coloana 1 - Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M&B</span>
                </div>
                <span className="font-bold text-gray-800 text-lg">Mom<span className="text-pink-500">&</span>Baby</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Platforma dedicata mamelor si copiilor din Romania. Cumpara si vinde cu incredere.
              </p>
            </div>

            {/* Coloana 2 - Platforma */}
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Platforma</h3>
              <ul className="space-y-2">
                <li><Link href="/posteaza" className="text-gray-400 text-sm hover:text-pink-500 transition-colors">Posteaza un anunt</Link></li>
                <li><Link href="/" className="text-gray-400 text-sm hover:text-pink-500 transition-colors">Cauta produse</Link></li>
                <li><Link href="/login?mod=register" className="text-gray-400 text-sm hover:text-pink-500 transition-colors">Creeaza cont</Link></li>
              </ul>
            </div>

            {/* Coloana 3 - Legal */}
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/confidentialitate" className="text-gray-400 text-sm hover:text-pink-500 transition-colors">Politica de confidentialitate</Link></li>
                <li><Link href="/termeni" className="text-gray-400 text-sm hover:text-pink-500 transition-colors">Termeni si conditii</Link></li>
                <li><a href="https://www.anpc.gov.ro" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-pink-500 transition-colors">ANPC</a></li>
                <li><a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-pink-500 transition-colors">Platforma SOL</a></li>
              </ul>
            </div>

            {/* Coloana 4 - Contact */}
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:contact@momandbaby.ro" className="text-gray-400 text-sm hover:text-pink-500 transition-colors">contact@momandbaby.ro</a></li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition-all text-sm">f</a>
                <a href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition-all text-sm">ig</a>
                <a href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition-all text-sm">tt</a>
              </div>
            </div>
          </div>

          {/* Linia de jos */}
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-gray-300 text-xs">© 2025 Mom&amp;Baby. Toate drepturile rezervate.</p>
            <p className="text-gray-300 text-xs">Facut cu 💕 pentru mamele din Romania</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
