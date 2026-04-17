"use client";
import Link from "next/link";

export default function TermeniPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Termeni și Condiții</h1>
        <p className="text-sm text-gray-400 mb-6">Ultima actualizare: Aprilie 2025</p>

        {/* Banner beta */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-5 mb-8 text-sm text-gray-700 leading-relaxed">
          <strong>⚠️ Notă importantă:</strong> Mom&Baby se află în prezent în{" "}
          <strong>faza de testare (beta)</strong>. Funcționalitățile platformei sunt demonstrate
          în scop de dezvoltare. Nu se efectuează tranzacții reale prin intermediul platformei.
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-8">
          {/* 1 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">1. Acceptarea termenilor</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Prin utilizarea platformei Mom&Baby, accepți acești termeni și condiții.
              Dacă nu ești de acord, te rugăm să nu folosești platforma. Platforma se află în{" "}
              <strong>faza de testare (beta)</strong> și nu facilitează tranzacții comerciale reale.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">2. Descrierea serviciului</h2>
            <p className="text-gray-600 text-sm mb-2">
              Mom&Baby este o platformă demonstrativă de anunțuri online dedicată mamelor și copiilor.
              În faza actuală de testare:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>Platforma nu este operată de o entitate juridică înregistrată</li>
              <li>Nu se efectuează și nu se facilitează tranzacții reale</li>
              <li>Anunțurile postate au scop exclusiv de testare a funcționalităților</li>
              <li>Platforma nu percepe comisioane, taxe sau alte plăți de la utilizatori</li>
            </ul>
            <p className="text-gray-600 text-sm mt-2">
              La lansarea oficială, acești termeni vor fi actualizați cu datele complete ale
              operatorului și condițiile comerciale aplicabile.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">3. Reguli pentru anunțuri</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>Anunțurile trebuie să fie reale și să descrie corect produsul</li>
              <li>Sunt permise doar produse pentru mame și copii</li>
              <li>Sunt interzise produsele contrafăcute sau ilegale</li>
              <li>Fotografiile trebuie să aparțină produsului real</li>
              <li>Un utilizator poate posta maximum 20 de anunțuri active</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">4. Răspunderea utilizatorilor</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Utilizatorii sunt singurii responsabili pentru conținutul anunțurilor postate.
              Mom&Baby nu își asumă responsabilitatea pentru eventualele contacte sau aranjamente
              stabilite între utilizatori în afara platformei.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">5. Conținut interzis</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>Produse periculoase pentru copii</li>
              <li>Conținut ofensator sau inadecvat</li>
              <li>Spam sau anunțuri duplicate</li>
              <li>Informații false sau înșelătoare</li>
              <li>Produse care nu aparțin categoriei mamă și copil (off-topic)</li>
            </ul>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">6. Protecția datelor personale</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Prelucrarea datelor tale personale este descrisă în{" "}
              <Link href="/confidentialitate" className="text-pink-500 hover:underline font-medium">Politica de Confidențialitate</Link>.
              Datele colectate în faza de testare vor fi șterse la încheierea perioadei de test
              sau la solicitarea ta.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">7. Limitarea răspunderii</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Platforma este oferită „ca atare" (as is), fără garanții de disponibilitate,
              acuratețe sau funcționalitate completă. În faza de testare, pot apărea erori,
              întreruperi sau pierderi de date.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">8. Moderare</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mom&Baby își rezervă dreptul de a șterge orice anunț care încalcă acești termeni,
              fără notificare prealabilă.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">9. Soluționarea litigiilor</h2>
            <p className="text-gray-600 text-sm mb-3">
              La lansarea oficială, platforma va respecta legislația română privind protecția
              consumatorilor, inclusiv:
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-2">
              <p>
                <strong className="text-gray-800">ANPC</strong> — Autoritatea Națională pentru Protecția Consumatorilor:{" "}
                <a href="https://www.anpc.gov.ro" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">www.anpc.gov.ro</a>
              </p>
              <p>
                <strong className="text-gray-800">Platforma SOL</strong> — Soluționarea Online a Litigiilor (Regulamentul UE 524/2013):{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">ec.europa.eu/consumers/odr</a>
              </p>
            </div>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">10. Modificarea termenilor</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ne rezervăm dreptul de a modifica acești termeni oricând. Continuarea utilizării
              platformei după modificări constituie acceptarea noilor termeni. Utilizatorii vor fi
              notificați prin banner pe platformă în cazul modificărilor semnificative.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">11. Contact</h2>
            <p className="text-gray-600 text-sm">Pentru întrebări:</p>
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
