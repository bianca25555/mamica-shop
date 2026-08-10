"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

const categorii = [
  "Alăptat", "Burtiere și Maternitate", "Îngrijire postnatală", "Modă gravide",
  "Hăinuțe", "Cărucioare", "Jucării", "Mobilier cameră",
  "Hrănire", "Siguranță", "Cărți și Educație", "Accesorii",
];

export default function Posteaza() {
  const [titlu, setTitlu] = useState("");
  const [categorie, setCategorie] = useState("");
  const [pret, setPret] = useState("");
  const [descriere, setDescriere] = useState("");
  const [locatie, setLocatie] = useState("");
  const [telefon, setTelefon] = useState("");
  const [poze, setPoze] = useState<File[]>([]);
  const [pozePreviews, setPozePreviews] = useState<string[]>([]);
  const [eroare, setEroare] = useState("");
  const [trimis, setTrimis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handlePoze = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (poze.length + files.length > 5) { setEroare("Poți adăuga maximum 5 poze."); return; }
    setEroare("");
    setPoze((prev) => [...prev, ...files]);
    setPozePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    e.target.value = "";
  };

  const stergePoza = (index: number) => {
    setPoze((prev) => prev.filter((_, i) => i !== index));
    setPozePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setEroare("");
    if (!user) { setEroare("Trebuie să fii logat pentru a posta un anunț."); return; }
    if (!titlu || !categorie || !pret || !descriere || !locatie || !telefon) {
      setEroare("Te rugăm să completezi toate câmpurile."); return;
    }
    setLoading(true);
    const pozeUrls: string[] = [];
    for (const poza of poze) {
      const fileName = `${Date.now()}-${Math.random()}-${poza.name}`;
      const { error: uploadError } = await supabase.storage.from("poze-anunturi").upload(fileName, poza);
      if (uploadError) { setEroare("Eroare la upload poză."); setLoading(false); return; }
      const { data: urlData } = supabase.storage.from("poze-anunturi").getPublicUrl(fileName);
      pozeUrls.push(urlData.publicUrl);
    }
    const { error } = await supabase.from("anunturi").insert({
      titlu, categorie, pret: parseFloat(pret), descriere, locatie, telefon,
      imagine: pozeUrls[0] || null, poze: pozeUrls, user_id: user.id,
    });
    setLoading(false);
    if (error) setEroare("A apărut o eroare. Încearcă din nou.");
    else setTrimis(true);
  };

  if (trimis) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Anunț postat!</h2>
          <p className="text-gray-400 text-sm mb-6">Anunțul tău a fost salvat cu succes.</p>
          <Link href="/" className="inline-block bg-pink-500 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-pink-600">
            Înapoi acasă
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
          {user && <span className="text-sm text-gray-500">{user.email}</span>}
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Postează un anunț</h1>
          <p className="text-gray-400 text-sm mt-1">Completează detaliile produsului tău</p>
        </div>

        {!user && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-700">
            Trebuie să fii <Link href="/login" className="underline font-medium">logat</Link> pentru a posta un anunț.
          </div>
        )}

        {eroare && <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-4">{eroare}</div>}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Titlu anunț *</label>
            <input type="text" value={titlu} onChange={(e) => setTitlu(e.target.value)}
              placeholder="ex: Cărucior Quinny Buzz, stare foarte bună"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Categorie *</label>
            <select value={categorie} onChange={(e) => setCategorie(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 text-gray-600">
              <option value="">Selectează o categorie</option>
              {categorii.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Preț (RON) *</label>
            <input type="number" value={pret} onChange={(e) => setPret(e.target.value)}
              placeholder="ex: 150"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Descriere *</label>
            <textarea rows={4} value={descriere} onChange={(e) => setDescriere(e.target.value)}
              placeholder="Descrie produsul: stare, vârstă, dimensiuni, alte detalii relevante..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Localitate *</label>
            <input type="text" value={locatie} onChange={(e) => setLocatie(e.target.value)}
              placeholder="ex: Cluj-Napoca, București, Timișoara"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Număr de telefon *</label>
            <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)}
              placeholder="ex: 07xx xxx xxx"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Fotografii ({poze.length}/5)</label>
            <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handlePoze} className="hidden" />
            {poze.length < 5 && (
              <div onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-pink-300 hover:bg-pink-50 transition-all mb-3">
                <p className="text-2xl mb-1">📷</p>
                <p className="text-gray-500 text-sm font-medium">Apasă pentru a adăuga fotografii</p>
                <p className="text-gray-300 text-xs mt-1">Poți adăuga încă {5 - poze.length} poze</p>
              </div>
            )}
            {pozePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {pozePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`poză ${index + 1}`} className="w-full h-24 object-cover rounded-xl" />
                    <button onClick={() => stergePoza(index)}
                      className="absolute top-1 right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center text-red-400 shadow text-xs font-bold">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 text-sm disabled:opacity-50 mt-2">
            {loading ? "Se salvează..." : "Postează anunțul"}
          </button>
        </div>
      </section>
    </main>
  );
}
