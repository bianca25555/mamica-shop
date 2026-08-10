"use client";
import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function Conversatie({ params }: { params: Promise<{ anuntId: string; userId: string }> }) {
  const { anuntId, userId } = use(params);
  const [user, setUser] = useState<any>(null);
  const [mesaje, setMesaje] = useState<any[]>([]);
  const [anunt, setAnunt] = useState<any>(null);
  const [mesajNou, setMesajNou] = useState("");
  const [loading, setLoading] = useState(true);
  const [trimitere, setTrimitere] = useState(false);
  const mesajeEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        fetchMesaje(data.user.id);
        fetchAnunt();
      }
    });
  }, [anuntId, userId]);

  useEffect(() => {
    mesajeEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mesaje]);

  const fetchAnunt = async () => {
    const { data } = await supabase.from("anunturi").select("titlu, imagine").eq("id", anuntId).single();
    setAnunt(data);
  };

  const fetchMesaje = async (myId: string) => {
    const { data } = await supabase
      .from("mesaje")
      .select("*")
      .eq("anunt_id", anuntId)
      .or(`and(from_user_id.eq.${myId},to_user_id.eq.${userId}),and(from_user_id.eq.${userId},to_user_id.eq.${myId})`)
      .order("created_at", { ascending: true });
    setMesaje(data || []);
    setLoading(false);

    // Marcheaza ca citite
    await supabase.from("mesaje")
      .update({ citit: true })
      .eq("to_user_id", myId)
      .eq("from_user_id", userId)
      .eq("anunt_id", anuntId);
  };

  const trimiteMesaj = async () => {
    if (!mesajNou.trim() || !user) return;
    setTrimitere(true);
    const { data } = await supabase.from("mesaje").insert({
      from_user_id: user.id,
      to_user_id: userId,
      anunt_id: anuntId,
      continut: mesajNou.trim(),
    }).select().single();
    if (data) setMesaje((prev) => [...prev, data]);
    setMesajNou("");
    setTrimitere(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      trimiteMesaj();
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Se incarca...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/mesaje" className="text-gray-400 hover:text-gray-600">←</Link>
          <div className="flex items-center gap-3 flex-1">
            {anunt?.imagine ? (
              <img src={anunt.imagine} alt={anunt.titlu} className="w-10 h-10 rounded-xl object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">📦</div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-800 line-clamp-1">{anunt?.titlu || "Anunt"}</p>
              <Link href={`/anunt/${anuntId}`} className="text-xs text-pink-500 hover:underline">
                Vezi anuntul
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mesaje */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 flex flex-col gap-3 overflow-y-auto">
        {mesaje.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-gray-400 text-sm">Niciun mesaj inca. Incepe conversatia!</p>
          </div>
        ) : (
          mesaje.map((mesaj) => {
            const esteAlMeu = mesaj.from_user_id === user?.id;
            return (
              <div key={mesaj.id} className={`flex ${esteAlMeu ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
                  esteAlMeu
                    ? "bg-pink-500 text-white rounded-br-sm"
                    : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm"
                }`}>
                  <p>{mesaj.continut}</p>
                  <p className={`text-xs mt-1 ${esteAlMeu ? "text-pink-100" : "text-gray-400"}`}>
                    {new Date(mesaj.created_at).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={mesajeEndRef} />
      </div>

      {/* Input mesaj */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 sticky bottom-0">
        <div className="max-w-2xl mx-auto flex gap-3 items-end">
          <textarea
            value={mesajNou}
            onChange={(e) => setMesajNou(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Scrie un mesaj..."
            rows={1}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-pink-400 resize-none"
          />
          <button
            onClick={trimiteMesaj}
            disabled={trimitere || !mesajNou.trim()}
            className="bg-pink-500 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-pink-600 disabled:opacity-50 flex-shrink-0"
          >
            Trimite
          </button>
        </div>
        <p className="text-xs text-gray-300 text-center mt-2">Apasa Enter pentru a trimite</p>
      </div>
    </main>
  );
}