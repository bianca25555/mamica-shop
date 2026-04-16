import Link from "next/link";

export default function Termeni() {
  return (
    <main className="min-h-screen bg-pink-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center py-4">
          <Link href="/" className="text-2xl font-bold text-pink-500">Mom&amp;Baby</Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Termeni si Conditii</h1>

        <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col gap-6 text-gray-600 text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">1. Acceptarea termenilor</h2>
            <p>Prin utilizarea platformei Mom&Baby, accepti acesti termeni si conditii. Daca nu esti de acord, te rugam sa nu folosesti platforma.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">2. Descrierea serviciului</h2>
            <p>Mom&Baby este o platforma de anunturi online dedicata mamelor si copiilor. Platforma faciliteaza contactul intre vanzatori si cumparatori, fara a fi parte in tranzactii.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">3. Reguli pentru anunturi</h2>
            <ul className="list-disc ml-5 mt-2 flex flex-col gap-1">
              <li>Anunturile trebuie sa fie reale si sa descrie corect produsul</li>
              <li>Sunt permise doar produse pentru mame si copii</li>
              <li>Sunt interzise produsele contrafacute sau ilegale</li>
              <li>Fotografiile trebuie sa apartina produsului real</li>
              <li>Un utilizator poate posta maximum 20 de anunturi active</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">4. Raspunderea utilizatorilor</h2>
            <p>Utilizatorii sunt singurii responsabili pentru continutul anunturilor postate. Mom&Baby nu isi asuma responsabilitatea pentru tranzactiile efectuate intre utilizatori.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">5. Continut interzis</h2>
            <ul className="list-disc ml-5 mt-2 flex flex-col gap-1">
              <li>Produse periculoase pentru copii</li>
              <li>Continut ofensator sau inadecvat</li>
              <li>Spam sau anunturi duplicate</li>
              <li>Informatii false sau inselatoare</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">6. Moderare</h2>
            <p>Mom&Baby isi rezerva dreptul de a sterge orice anunt care incalca acesti termeni, fara notificare prealabila.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">7. Modificarea termenilor</h2>
            <p>Ne rezervam dreptul de a modifica acesti termeni oricand. Continuarea utilizarii platformei dupa modificari constituie acceptarea noilor termeni.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">8. Contact</h2>
            <p>Pentru intrebari: contact@momsandbaby.ro</p>
          </div>

          <p className="text-gray-400 text-xs">Ultima actualizare: Aprilie 2024</p>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-pink-500 text-sm hover:underline">← Inapoi acasa</Link>
        </div>
      </section>
    </main>
  );
}
 