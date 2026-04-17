import Link from "next/link";

export default function Confidentialitate() {
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

      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6">
          <Link href="/" className="text-sm text-gray-400 hover:text-pink-500">← Inapoi acasa</Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Politica de Confidentialitate</h1>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col gap-6 text-gray-600 text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-2">1. Cine suntem</h2>
            <p>Mom&Baby este o platforma online dedicata mamelor si copiilor din Romania, unde utilizatorii pot posta si cumpara produse pentru mame si copii.</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-2">2. Ce date colectam</h2>
            <p>Colectam urmatoarele date personale:</p>
            <ul className="list-disc ml-5 mt-2 flex flex-col gap-1">
              <li>Adresa de email (la inregistrare)</li>
              <li>Numarul de telefon (la postarea unui anunt)</li>
              <li>Localitatea (la postarea unui anunt)</li>
              <li>Fotografiile produselor postate</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-2">3. De ce colectam aceste date</h2>
            <p>Datele sunt colectate exclusiv pentru:</p>
            <ul className="list-disc ml-5 mt-2 flex flex-col gap-1">
              <li>Crearea si gestionarea contului tau</li>
              <li>Publicarea anunturilor tale pe platforma</li>
              <li>Facilitarea contactului intre cumparatori si vanzatori</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-2">4. Cat timp pastram datele</h2>
            <p>Datele tale sunt pastrate atat timp cat contul tau este activ. La stergerea contului, toate datele asociate vor fi eliminate din sistemele noastre.</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-2">5. Drepturile tale</h2>
            <p>Conform GDPR, ai urmatoarele drepturi:</p>
            <ul className="list-disc ml-5 mt-2 flex flex-col gap-1">
              <li>Dreptul de acces la datele tale</li>
              <li>Dreptul de rectificare a datelor incorecte</li>
              <li>Dreptul de stergere a datelor</li>
              <li>Dreptul de portabilitate a datelor</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-2">6. Cookie-uri</h2>
            <p>Folosim cookie-uri strict necesare pentru functionarea platformei (autentificare). Nu folosim cookie-uri de tracking sau publicitate.</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-2">7. Contact</h2>
            <p>Pentru orice intrebare legata de datele tale personale, ne poti contacta la: contact@momandbaby.ro</p>
          </div>
          <p className="text-gray-300 text-xs">Ultima actualizare: Aprilie 2024</p>
        </div>
      </section>
    </main>
  );
}
