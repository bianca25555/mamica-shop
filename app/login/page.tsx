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
    if (error) {
      setEroare("Email sau parola incorecta.");
    } else {
      window.location.href = "/";
    }
  };

  const handleRegister = async () => {
    setEroare("");
    if (parola !== confirmaParola) {
      setEroare("Parolele nu coincid.");
      return;
    }
    if (parola.length < 8) {
      setEroare("Parola trebuie sa aiba minimum 8 caractere.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password: parola,
      options: { data: { nume } },
    });
    setLoading(false);
    if (error) {
      setEroare("A aparut o eroare. Incearca din nou.");
    } else {
      setSucces("Cont creat! Verifica emailul pentru confirmare.");
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-md w-full max-w-md p-8">

        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-pink-500">Mom&amp;Baby</Link>
          <p className="text-gray-400 text-sm mt-1">Platforma pentru mame si copii</p>
        </div>

        <div className="flex bg-pink-50 rounded-full p-1 mb-8">
          <button
            onClick={() => { setMod("login"); setEroare(""); setSucces(""); }}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${mod === "login" ? "bg-pink-500 text-white" : "text-gray-400"}`}
          >
            Intra in cont
          </button>
          <button
            onClick={() => { setMod("register"); setEroare(""); setSucces(""); }}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${mod === "register" ? "bg-pink-500 text-white" : "text-gray-400"}`}
          >
            Inregistrare
          </button>
        </div>

        {eroare && <p className="text-red-400 text-sm text-center mb-4">{eroare}</p>}
        {succes && <p className="text-green-400 text-sm text-center mb-4">{succes}</p>}

        {mod === "login" && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplu@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Parola</label>
              <input
                type="password"
                value={parola}
                onChange={(e) => setParola(e.target.value)}
                placeholder="Parola ta"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-pink-600 mt-2 disabled:opacity-50"
            >
              {loading ? "Se incarca..." : "Intra in cont"}
            </button>
            <p className="text-center text-sm text-gray-400">
              Nu ai cont?{" "}
              <button onClick={() => setMod("register")} className="text-pink-500 hover:underline">
                Inregistreaza-te
              </button>
            </p>
          </div>
        )}

        {mod === "register" && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Nume complet</label>
              <input
                type="text"
                value={nume}
                onChange={(e) => setNume(e.target.value)}
                placeholder="Numele tau"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplu@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Parola</label>
              <input
                type="password"
                value={parola}
                onChange={(e) => setParola(e.target.value)}
                placeholder="Minimum 8 caractere"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Confirma parola</label>
              <input
                type="password"
                value={confirmaParola}
                onChange={(e) => setConfirmaParola(e.target.value)}
                placeholder="Repeta parola"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400"
              />
            </div>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-pink-600 mt-2 disabled:opacity-50"
            >
              {loading ? "Se incarca..." : "Creeaza cont"}
            </button>
            <p className="text-center text-sm text-gray-400">
              Ai deja cont?{" "}
              <button onClick={() => setMod("login")} className="text-pink-500 hover:underline">
                Intra in cont
              </button>
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
