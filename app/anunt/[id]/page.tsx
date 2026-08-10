"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AnuntPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [anunt, setAnunt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pozaActiva, setPozaActiva] = useState(0);
  const [pozaMarita, setPozaMarita] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [marcandVandut, setMarcandVandut] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const fetchAnunt = async () => {
      const { data } = await supabase.from("anunturi").select("*").eq("id", id).single();
      setAnunt(data);
      setLoading(false);
    };
    fetchAnunt();
  }, [id]);

  const trimiteMesajInitial = async () => {
    if (!user) { window.location.href = "/login"; return; }
    if (!anunt) return;
    if (user.id === anunt.user_id) { alert("Nu poți trimite mesaj la propriul anunț."); return; }
    const { error } = await supabase.from("mesaje").insert({
      from_user_id: user.id,
      to_user_id: anunt.user_id,
      anunt_id: id,
      continut: "Bună! Sunt interesat/ă de anunțul tău.",
    });
    if (!error) window.location.href = `/mesaje/${id}/${anunt.user_id}`;
  };

  const marcheazaVandut = async () => {
    if (!confirm(anunt.vandut ? "Marchezi anunțul ca disponibil?" : "Marchezi anunțul ca vândut?")) return;
    setMarcandVandut(true);
    await supabase.from("anunturi").update({ vandut: !anunt.vandut }).eq("id", id);
    setAnunt((prev: any) => ({ ...prev, vandut: !prev.vandut }));
    setMarcandVandut(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Se încarcă...</p>
      </main>
    );
  }

  if (!anunt) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <p className="text-gray-500 mb-4">Anunțul nu a fost găsit.</p>
          <Link href="/" className="text-pink-500 hover:underline text-sm">Înapoi acasă</Link>
        </div>
      </main>
    );
  }

  const toatePoze = anunt.poze?.length > 0 ? anunt.poze : (anunt.imagine ? [anunt.imagine] : []);
  const esteAlMeu = user?.id === anunt.user_id;

  return (
    <main className="min-h-screen bg-gray-50">
      {pozaMarita && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setPozaMarita(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl">✕</button>
          <img src={pozaMarita} alt="poză mărită" className="max-w-full max-h-full object-contain rounded-xl" />
        </div>
      )}

      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">M&B</span>
            </div>
            <span className="text-lg font-bold text-gray-800 hidden sm:block">Mom<span className="text-pink-500">&</span>Baby</span>
            <span className="text-lg font-bold text-gray-800 sm:hidden">M<span className="text-pink-500">&</span>B</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-pink-500">← Înapoi</Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-pink-500">Acasă</Link>
          <span>›</span>
          <span>{anunt.categorie}</span>
          <span>›</span>
          <span className="text-gray-600 truncate">{anunt.titlu}</span>
        </div>

        {anunt.vandut && (
          <div className="bg-gray-100 text-gray-500 text-sm font-medium px-4 py-3 rounded-xl mb-6 text-center">
            ✅ Acest produs a fost vândut
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-80 cursor-zoom-in relative"
              onClick={() => toatePoze[pozaActiva] && setPozaMarita(toatePoze[pozaActiva])}>
              {anunt.vandut && (
                <div className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  VÂNDUT
                </div>
              )}
              {toatePoze.length > 0 ? (
                <img src={toatePoze[pozaActiva]} alt={anunt.titlu} className={`w-full h-full object-cover ${anunt.vandut ? "opacity-60" : ""}`} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200 text-6xl">📷</div>
              )}
            </div>
            {toatePoze.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {toatePoze.map((poza: string, index: number) => (
                  <img key={index} src={poza} alt={`poză ${index + 1}`}
                    onClick={() => setPozaActiva(index)}
                    className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-2 flex-shrink-0 ${pozaActiva === index ? "border-pink-500" : "border-transparent"}`} />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-pink-500 font-semibold bg-pink-50 px-3 py-1 rounded-full">
                {anunt.categorie}
              </span>
              {anunt.subcategorie && (
                <span className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
                  {anunt.subcategorie}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{anunt.titlu}</h1>
            <p className="text-3xl font-bold text-gray-900">{anunt.pret} <span className="text-lg text-gray-400 font-normal">RON</span></p>
            <p className="text-gray-400 text-sm flex items-center gap-1">📍 {anunt.locatie}</p>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-100">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 font-bold">
                👤
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Vânzător verificat</p>
                <p className="text-xs text-gray-400">Membru Mom&Baby</p>
              </div>
            </div>

            {!anunt.vandut && (
              <a href={`tel:${anunt.telefon}`}
                className="w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-pink-600 text-center">
                📞 {anunt.telefon}
              </a>
            )}

            {!esteAlMeu && !anunt.vandut && (
              <button onClick={trimiteMesajInitial}
                className="w-full border-2 border-pink-300 text-pink-500 py-3 rounded-xl text-sm font-semibold hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-200 active:scale-95">
                💬 Trimite mesaj
              </button>
            )}

            {esteAlMeu && (
              <>
                <Link href={`/editeaza/${anunt.id}`}
                  className="w-full border border-pink-200 text-pink-500 py-3 rounded-xl text-sm font-medium hover:bg-pink-50 text-center">
                  ✏️ Editează anunțul
                </Link>
                <button onClick={marcheazaVandut} disabled={marcandVandut}
                  className={`w-full py-3 rounded-xl text-sm font-medium border transition-all ${anunt.vandut ? "border-green-200 text-green-500 hover:bg-green-50" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                  {marcandVandut ? "Se actualizează..." : anunt.vandut ? "✅ Marchează ca disponibil" : "🏷️ Marchează ca vândut"}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Descriere</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{anunt.descriere}</p>
        </div>
      </section>
    </main>
  );
}
