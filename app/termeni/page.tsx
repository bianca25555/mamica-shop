// TermeniPage.jsx — Înlocuiește conținutul paginii /termeni cu acest text
// Adaptează structura la framework-ul tău (Next.js pages/app router)

export default function TermeniPage() {
  return (
    <div className="legal-page">
      <a href="/">← Înapoi acasă</a>

      <h1>Termeni și Condiții</h1>

      <p>
        <strong>Ultima actualizare:</strong> Aprilie 2025
      </p>

      <div
        style={{
          background: '#FFF3CD',
          border: '1px solid #F7C948',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          fontSize: '14px',
        }}
      >
        <strong>⚠️ Notă importantă:</strong> Mom&Baby se află în prezent în{' '}
        <strong>faza de testare (beta)</strong>. Funcționalitățile platformei
        sunt demonstrate în scop de dezvoltare. Nu se efectuează tranzacții
        reale prin intermediul platformei.
      </div>

      <h2>1. Acceptarea termenilor</h2>
      <p>
        Prin utilizarea platformei Mom&Baby, accepți acești termeni și condiții.
        Dacă nu ești de acord, te rugăm să nu folosești platforma. Platforma se
        află în <strong>faza de testare (beta)</strong> și nu facilitează
        tranzacții comerciale reale.
      </p>

      <h2>2. Descrierea serviciului</h2>
      <p>
        Mom&Baby este o platformă demonstrativă de anunțuri online dedicată
        mamelor și copiilor. În faza actuală de testare:
      </p>
      <ul>
        <li>Platforma nu este operată de o entitate juridică înregistrată</li>
        <li>Nu se efectuează și nu se facilitează tranzacții reale</li>
        <li>
          Anunțurile postate au scop exclusiv de testare a funcționalităților
        </li>
        <li>
          Platforma nu percepe comisioane, taxe sau alte plăți de la utilizatori
        </li>
      </ul>
      <p>
        La lansarea oficială, acești termeni vor fi actualizați cu datele
        complete ale operatorului și condițiile comerciale aplicabile.
      </p>

      <h2>3. Reguli pentru anunțuri</h2>
      <ul>
        <li>Anunțurile trebuie să fie reale și să descrie corect produsul</li>
        <li>Sunt permise doar produse pentru mame și copii</li>
        <li>Sunt interzise produsele contrafăcute sau ilegale</li>
        <li>Fotografiile trebuie să aparțină produsului real</li>
        <li>Un utilizator poate posta maximum 20 de anunțuri active</li>
      </ul>

      <h2>4. Răspunderea utilizatorilor</h2>
      <p>
        Utilizatorii sunt singurii responsabili pentru conținutul anunțurilor
        postate. Mom&Baby nu își asumă responsabilitatea pentru eventualele
        contacte sau aranjamente stabilite între utilizatori în afara
        platformei.
      </p>

      <h2>5. Conținut interzis</h2>
      <ul>
        <li>Produse periculoase pentru copii</li>
        <li>Conținut ofensator sau inadecvat</li>
        <li>Spam sau anunțuri duplicate</li>
        <li>Informații false sau înșelătoare</li>
        <li>
          Produse care nu aparțin categoriei mamă și copil (off-topic)
        </li>
      </ul>

      <h2>6. Protecția datelor personale</h2>
      <p>
        Prelucrarea datelor tale personale este descrisă în{' '}
        <a href="/confidentialitate">Politica de Confidențialitate</a>. Datele
        colectate în faza de testare vor fi șterse la încheierea perioadei de
        test sau la solicitarea ta.
      </p>

      <h2>7. Limitarea răspunderii</h2>
      <p>
        Platforma este oferită „ca atare" (as is), fără garanții de
        disponibilitate, acuratețe sau funcționalitate completă. În faza de
        testare, pot apărea erori, întreruperi sau pierderi de date.
      </p>

      <h2>8. Moderare</h2>
      <p>
        Mom&Baby își rezervă dreptul de a șterge orice anunț care încalcă
        acești termeni, fără notificare prealabilă.
      </p>

      <h2>9. Soluționarea litigiilor</h2>
      <p>
        La lansarea oficială, platforma va respecta legislația română privind
        protecția consumatorilor, inclusiv:
      </p>
      <ul>
        <li>
          <strong>ANPC</strong> — Autoritatea Națională pentru Protecția
          Consumatorilor:{' '}
          <a
            href="https://www.anpc.gov.ro"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.anpc.gov.ro
          </a>
        </li>
        <li>
          <strong>Platforma SOL</strong> — Soluționarea Online a Litigiilor
          (Regulamentul UE 524/2013):{' '}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            ec.europa.eu/consumers/odr
          </a>
        </li>
      </ul>

      <h2>10. Modificarea termenilor</h2>
      <p>
        Ne rezervăm dreptul de a modifica acești termeni oricând. Continuarea
        utilizării platformei după modificări constituie acceptarea noilor
        termeni. Utilizatorii vor fi notificați prin banner pe platformă în
        cazul modificărilor semnificative.
      </p>

      <h2>11. Contact</h2>
      <p>
        Pentru întrebări: 📧 <strong>contact@momandbaby.ro</strong>
      </p>
    </div>
  );
}
