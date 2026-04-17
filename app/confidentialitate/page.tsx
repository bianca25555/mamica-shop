// ConfidentialitatePage.jsx — Înlocuiește conținutul paginii /confidentialitate cu acest text
// Adaptează structura la framework-ul tău (Next.js pages/app router)

export default function ConfidentialitatePage() {
  return (
    <div className="legal-page">
      <a href="/">← Înapoi acasă</a>

      <h1>Politica de Confidențialitate</h1>

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
        <strong>faza de testare (beta)</strong>. Platforma nu facilitează
        tranzacții reale și nu este operată de o entitate juridică înregistrată.
        Datele colectate în această fază sunt utilizate exclusiv pentru
        dezvoltarea și testarea platformei.
      </div>

      <h2>1. Cine suntem</h2>
      <p>
        Mom&Baby este un proiect aflat în faza de dezvoltare și testare — o
        platformă online dedicată mamelor și copiilor din România. În prezent,
        platforma nu este operată de o persoană juridică sau fizică autorizată
        (PFA/SRL). La lansarea oficială, această secțiune va fi actualizată cu
        datele complete ale operatorului de date.
      </p>

      <h2>2. Ce date colectăm</h2>
      <p>În faza de testare, putem colecta următoarele date:</p>
      <ul>
        <li>Adresa de email (la înregistrare)</li>
        <li>Numărul de telefon (la postarea unui anunț de test)</li>
        <li>Localitatea (la postarea unui anunț de test)</li>
        <li>Fotografiile produselor postate (în scop demonstrativ)</li>
      </ul>

      <h2>3. Temeiul juridic al prelucrării (Art. 6 GDPR)</h2>
      <p>Prelucrăm datele tale pe baza următoarelor temeiuri juridice:</p>
      <ul>
        <li>
          <strong>Consimțământul tău</strong> (Art. 6 alin. 1 lit. a GDPR) —
          acordat la crearea contului și postarea de anunțuri
        </li>
        <li>
          <strong>Interesul nostru legitim</strong> (Art. 6 alin. 1 lit. f
          GDPR) — pentru dezvoltarea și îmbunătățirea platformei în faza de
          testare
        </li>
      </ul>

      <h2>4. Cui transmitem datele</h2>
      <p>Datele tale pot fi accesate de:</p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> (SUA) — serviciul de hosting al
          platformei. Transferul de date către SUA este protejat prin Clauze
          Contractuale Standard (SCC) conform Art. 46 GDPR.
        </li>
        <li>
          <strong>Supabase Inc.</strong> — pentru stocarea bazei de date,
          autentificarea utilizatorilor și stocarea fișierelor (fotografii
          produse). Datele sunt stocate pe servere AWS în{' '}
          <strong>Irlanda (UE)</strong>, deci nu are loc un transfer
          internațional de date în afara Spațiului Economic European.
        </li>
      </ul>

      <h2>5. Cât timp păstrăm datele</h2>
      <p>
        Datele tale sunt păstrate pe durata fazei de testare. La lansarea
        oficială sau la încheierea proiectului, toate datele de test vor fi
        șterse. Poți solicita ștergerea datelor tale oricând.
      </p>

      <h2>6. Drepturile tale (conform GDPR)</h2>
      <p>Ai următoarele drepturi:</p>
      <ul>
        <li>
          <strong>Dreptul de acces</strong> — poți solicita o copie a datelor
          tale
        </li>
        <li>
          <strong>Dreptul de rectificare</strong> — poți cere corectarea datelor
          incorecte
        </li>
        <li>
          <strong>Dreptul de ștergere</strong> — poți cere ștergerea completă a
          datelor tale
        </li>
        <li>
          <strong>Dreptul de restricționare</strong> — poți limita modul în care
          îți prelucrăm datele
        </li>
        <li>
          <strong>Dreptul de portabilitate</strong> — poți primi datele tale
          într-un format structurat
        </li>
        <li>
          <strong>Dreptul de opoziție</strong> — te poți opune prelucrării
          datelor tale
        </li>
        <li>
          <strong>Dreptul de a retrage consimțământul</strong> — oricând, fără a
          afecta legalitatea prelucrării anterioare
        </li>
      </ul>
      <p>
        Pentru exercitarea acestor drepturi, contactează-ne la adresa de email
        de mai jos.
      </p>

      <h2>7. Cookie-uri</h2>
      <p>
        Folosim exclusiv cookie-uri strict necesare pentru funcționarea
        platformei (autentificare, sesiune). Nu folosim cookie-uri de tracking,
        analiză sau publicitate.
      </p>

      <h2>8. Plângeri</h2>
      <p>
        Dacă consideri că datele tale sunt prelucrate incorect, ai dreptul de a
        depune o plângere la:
      </p>
      <p>
        <strong>
          Autoritatea Națională de Supraveghere a Prelucrării Datelor cu
          Caracter Personal (ANSPDCP)
        </strong>
        <br />
        B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, București
        <br />
        Website:{' '}
        <a
          href="https://www.dataprotection.ro"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.dataprotection.ro
        </a>
        <br />
        Email: anspdcp@dataprotection.ro
      </p>

      <h2>9. Contact</h2>
      <p>
        Pentru orice întrebare legată de datele tale personale:
        <br />
        📧 <strong>contact@momandbaby.ro</strong>
      </p>
    </div>
  );
}
