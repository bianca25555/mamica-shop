"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Login() {
  const [mod, setMod] = useState("login");
  const [nume, setNume] = useState("");
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [confirmaParola, setConfirmaParola] = useState("");
  const [eroare, setEroare] = useState("");
  const [succes, setSucces] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setEroare("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: parola });
    setLoading(false);
    if (error) setEroare("Email sau parolă incorectă.");
    else window.location.href = "/";
  };

  const handleRegister = async () => {
    setEroare("");
    if (parola !== confirmaParola) { setEroare("Parolele nu coincid."); return; }
    if (parola.length < 8) { setEroare("Parola trebuie să aibă minimum 8 caractere."); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password: parola,
      options: { data: { nume } },
    });
    setLoading(false);
    if (error) setEroare("A apărut o eroare. Încearcă din nou.");
    else setSucces("Cont creat! Verifică emailul pentru confirmare.");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">M&B</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Mom<span className="text-pink-500">&</span>Baby</span>
          </Link>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {mod === "login" ? "Bine ai revenit!" : "Creează un cont"}
            </h1>
            <p className="text-gray-400 text-sm">
              {mod === "login" ? "Intră în contul tău Mom&Baby" : "Alătură-te comunității Mom&Baby"}
            </p>
          </div>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button onClick={() => { setMod("login"); setEroare(""); setSucces(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mod === "login" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>
              Intră în cont
            </button>
            <button onClick={() => { setMod("register"); setEroare(""); setSucces(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mod === "register" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>
              Înregistrare
            </button>
          </div>

          {eroare && <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-4">{eroare}</div>}
          {succes && <div className="bg-green-50 text-green-500 text-sm px-4 py-3 rounded-xl mb-4">{succes}</div>}

          {mod === "login" && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplu@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Parolă</label>
                <input type="password" value={parola} onChange={(e) => setParola(e.target.value)}
                  placeholder="Parola ta"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
              </div>
              <button onClick={handleLogin} disabled={loading}
                className="w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-pink-600 mt-2 disabled:opacity-50">
                {loading ? "Se încarcă..." : "Intră în cont"}
              </button>
              <p className="text-center text-sm text-gray-400">
                <Link href="/resetare-parola" className="text-pink-500 hover:underline font-medium">
                  Ai uitat parola?
                </Link>
              </p>
              <p className="text-center text-sm text-gray-400">
                Nu ai cont?{" "}
                <button onClick={() => setMod("register")} className="text-pink-500 hover:underline font-medium">
                  Înregistrează-te
                </button>
              </p>
            </div>
          )}

          {mod === "register" && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Nume complet</label>
                <input type="text" value={nume} onChange={(e) => setNume(e.target.value)}
                  placeholder="Numele tău"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplu@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Parolă</label>
                <input type="password" value={parola} onChange={(e) => setParola(e.target.value)}
                  placeholder="Minimum 8 caractere"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Confirmă parola</label>
                <input type="password" value={confirmaParola} onChange={(e) => setConfirmaParola(e.target.value)}
                  placeholder="Repetă parola"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100" />
              </div>
              <button onClick={handleRegister} disabled={loading}
                className="w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-pink-600 mt-2 disabled:opacity-50">
                {loading ? "Se încarcă..." : "Creează cont"}
              </button>
              <p className="text-center text-sm text-gray-400">
                Ai deja cont?{" "}
                <button onClick={() => setMod("login")} className="text-pink-500 hover:underline font-medium">
                  Intră în cont
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
