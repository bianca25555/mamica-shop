"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

const categorii = [
  "Alaptat", "Burtiere si Maternitate", "Ingrijire postnatala", "Moda gravide",
  "Hainute", "Carucioare", "Jucarii", "Mobilier camera",
  "Hranire", "Siguranta", "Carti si Educatie", "Accesorii",
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
    if (poze.length + files.length > 5) {
      setEroare("Poti adauga maximum 5 poze.");
      return;
    }
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
    if (!user) { setEroare("Trebuie sa fii logat pentru a posta un anunt."); return; }
    if (!titlu || !categorie || !pret || !descriere || !locatie || !telefon) {
      setEroare("Te rugam sa completezi toate campurile."); return;
    }
    setLoading(true);

    const pozeUrls: string[] = [];
    for (const poza of poze) {
      const fileName = `${Date.now()}-${Math.random()}-${poza.name}`;
      const { error: uploadError } = await supabase.storage
        .from("poze-anunturi")
        .upload(fileName, poza);
      if (uploadError) {
        setEroare("Eroare la upload poza. Incearca din nou.");
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage
        .from("poze-anunturi")
        .getPublicUrl(fileName);
      pozeUrls.push(urlData.publicUrl);
    }

    const { error } = await supabase.from("anunturi").insert({
      titlu, categorie,
      pret: parseFloat(pret),
      descriere, locatie, telefon,
      imagine: pozeUrls[0] || null,
      poze: pozeUrls,
      user_id: user.id,
    });

    setLoading(false);
    if (error) { setEroare("A aparut o eroare. Incearca din nou."); }
    else { setTrimis(true); }
  };

  if (trimis) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-md w-full max-w-md p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Anunt postat!</h2>
          <p className="text-gray-400 text-sm mb-6">Anuntul tau a fost salvat cu succes.</p>
          <Link href="/" className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full text-sm hover:bg-pink-600">
            Inapoi la pagina principala
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
          <div className="flex gap-3">
            {user ? (
              <span className="text-sm text-gray-600">👋 {user.email}</span>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600">
                Intra in cont
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Posteaza un anunt</h2>
        <p className="text-gray-400 text-sm mb-8">Completeaza formularul de mai jos pentru a-ti lista produsul.</p>

        {!user && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 text-sm text-yellow-700">
            Trebuie sa fii <Link href="/login" className="underline font-medium">logat</Link> pentru a posta un anunt.
          </div>
        )}

        {eroare && <p className="text-red-400 text-sm mb-4">{eroare}</p>}

        <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Titlu anunt *</label>
            <input type="text" value={titlu} onChange={(e) => setTitlu(e.target.value)}
              placeholder="ex: Carucior Quinny Buzz, stare foarte buna"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Categorie *</label>
            <select value={categorie} onChange={(e) => setCategorie(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 text-gray-600">
              <option value="">Selecteaza o categorie</option>
              {categorii.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Pret (RON) *</label>
            <input type="number" value={pret} onChange={(e) => setPret(e.target.value)}
              placeholder="ex: 150"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Descriere *</label>
            <textarea rows={4} value={descriere} onChange={(e) => setDescriere(e.target.value)}
              placeholder="Descrie produsul: stare, varsta, dimensiuni, alte detalii relevante..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Localitate *</label>
            <input type="text" value={locatie} onChange={(e) => setLocatie(e.target.value)}
              placeholder="ex: Cluj-Napoca, Bucuresti, Timisoara"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Numar de telefon *</label>
            <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)}
              placeholder="ex: 07xx xxx xxx"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Fotografii ({poze.length}/5)
            </label>
            <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handlePoze} className="hidden" />

            {poze.length < 5 && (
              <div onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-pink-300 mb-3">
                <p className="text-3xl mb-1">📷</p>
                <p className="text-gray-400 text-sm">Apasa pentru a adauga fotografii</p>
                <p className="text-gray-300 text-xs mt-1">Poti adauga inca {5 - poze.length} poze</p>
              </div>
            )}

            {pozePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {pozePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`poza ${index + 1}`} className="w-full h-24 object-cover rounded-xl" />
                    <button onClick={() => stergePoza(index)}
                      className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-red-400 shadow text-xs">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-pink-500 text-white py-4 rounded-xl font-medium hover:bg-pink-600 text-sm disabled:opacity-50">
            {loading ? "Se salveaza..." : "Posteaza anuntul"}
          </button>
        </div>
      </section>
    </main>
  );
}
