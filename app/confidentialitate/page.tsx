"use client";
import Link from "next/link";

export default function ConfidentialitatePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header simplu */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">M&B</span>
            </div>
            <span className="text-lg font-bold text-gray-800">Mom<span className="text-pink-500">&</span>Baby</span>
          </Link>
          <Link href="/" className="text-sm text-pink-500 hover:underline font-medium">← Înapoi acasă</Link>
        </div>
      </header>

      {/* Conținut */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Politica de Confidențialitate</h1>
        <p className="text-sm text-gray-400 mb-6">Ultima actualizare: Aprilie 2025</p>

        {/* Banner beta */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-5 mb-8 text-sm text-gray-700 leading-relaxed">
          <strong>⚠️ Notă importantă:</strong> Mom&Baby se află în prezent în{" "}
          <strong>faza de testare (beta)</strong>. Platforma nu facilitează tranzacții reale
          și nu este operată de o entitate juridică înregistrată. Datele colectate în această
          fază sunt utilizate exclusiv pentru dezvoltarea și testarea platformei.
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-8">
          {/* 1 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">1. Cine suntem</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mom&Baby este un proiect aflat în faza de dezvoltare și testare — o platformă online
              dedicată mamelor și copiilor din România. În prezent, platforma nu este operată de o
              persoană juridică sau fizică autorizată (PFA/SRL). La lansarea oficială, această
              secțiune va fi actualizată cu datele complete ale operatorului de date.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">2. Ce date colectăm</h2>
            <p className="text-gray-600 text-sm mb-2">În faza de testare, putem colecta următoarele date:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>Adresa de email (la înregistrare)</li>
              <li>Numărul de telefon (la postarea unui anunț de test)</li>
              <li>Localitatea (la postarea unui anunț de test)</li>
              <li>Fotografiile produselor postate (în scop demonstrativ)</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">3. Temeiul juridic al prelucrării (Art. 6 GDPR)</h2>
            <p className="text-gray-600 text-sm mb-2">Prelucrăm datele tale pe baza următoarelor temeiuri juridice:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li><strong>Consimțământul tău</strong> (Art. 6 alin. 1 lit. a GDPR) — acordat la crearea contului și postarea de anunțuri</li>
              <li><strong>Interesul nostru legitim</strong> (Art. 6 alin. 1 lit. f GDPR) — pentru dezvoltarea și îmbunătățirea platformei în faza de testare</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">4. Cui transmitem datele</h2>
            <p className="text-gray-600 text-sm mb-2">Datele tale pot fi accesate de:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
              <li><strong>Vercel Inc.</strong> (SUA) — serviciul de hosting al platformei. Transferul de date către SUA este protejat prin Clauze Contractuale Standard (SCC) conform Art. 46 GDPR.</li>
              <li><strong>Supabase Inc.</strong> — pentru stocarea bazei de date, autentificarea utilizatorilor și stocarea fișierelor (fotografii produse). Datele sunt stocate pe servere AWS în <strong>Irlanda (UE)</strong>, deci nu are loc un transfer internațional de date în afara Spațiului Economic European.</li>
            </ul>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">5. Cât timp păstrăm datele</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Datele tale sunt păstrate pe durata fazei de testare. La lansarea oficială sau la
              încheierea proiectului, toate datele de test vor fi șterse. Poți solicita ștergerea
              datelor tale oricând.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">6. Drepturile tale (conform GDPR)</h2>
            <p className="text-gray-600 text-sm mb-2">Ai următoarele drepturi:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li><strong>Dreptul de acces</strong> — poți solicita o copie a datelor tale</li>
              <li><strong>Dreptul de rectificare</strong> — poți cere corectarea datelor incorecte</li>
              <li><strong>Dreptul de ștergere</strong> — poți cere ștergerea completă a datelor tale</li>
              <li><strong>Dreptul de restricționare</strong> — poți limita modul în care îți prelucrăm datele</li>
              <li><strong>Dreptul de portabilitate</strong> — poți primi datele tale într-un format structurat</li>
              <li><strong>Dreptul de opoziție</strong> — te poți opune prelucrării datelor tale</li>
              <li><strong>Dreptul de a retrage consimțământul</strong> — oricând, fără a afecta legalitatea prelucrării anterioare</li>
            </ul>
            <p className="text-gray-600 text-sm mt-2">Pentru exercitarea acestor drepturi, contactează-ne la adresa de email de mai jos.</p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">7. Cookie-uri</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Folosim exclusiv cookie-uri strict necesare pentru funcționarea platformei (autentificare, sesiune).
              Nu folosim cookie-uri de tracking, analiză sau publicitate.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">8. Plângeri</h2>
            <p className="text-gray-600 text-sm mb-2">
              Dacă consideri că datele tale sunt prelucrate incorect, ai dreptul de a depune o plângere la:
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-gray-800">Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</p>
              <p>B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, București</p>
              <p>Website: <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">www.dataprotection.ro</a></p>
              <p>Email: <span className="text-pink-500">anspdcp@dataprotection.ro</span></p>
            </div>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">9. Contact</h2>
            <p className="text-gray-600 text-sm">
              Pentru orice întrebare legată de datele tale personale:
            </p>
            <p className="text-pink-500 font-semibold text-sm mt-1">📧 contact@momandbaby.ro</p>
          </div>
        </div>
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
          <p className="text-center text-gray-300 text-xs mt-6">© 2025 Mom&amp;Baby. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </main>
  );
}
