export default function Home() {
  return (
    // Nie importujemy tu już Navbara!
    <main className="relative min-h-screen">
      
      {/* 
        WAŻNE: Navbar jest "fixed" (przyklejony). 
        Oznacza to, że pierwsza sekcja strony musi "wchodzić" pod niego.
        Dlatego tutaj dajemy np. h-screen z tłem, aby Navbar był na jego tle przezroczysty.
      */}
      
      <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        {/* Tło Hero (np. gradient lub zdjęcie) */}
        <div className="absolute inset-0 bg-linear-to-b from-raisinBlack/50 to-raisinBlack z-0" />
        
        <div className="relative z-10 text-center px-4">
          <h1 className="font-youngest text-6xl md:text-8xl text-arylideYellow mb-6 drop-shadow-lg">
            Z pasji do muzyki
          </h1>
          <p className="font-montserrat text-philippineSilver text-lg md:text-xl tracking-[0.2em] uppercase">
            Stowarzyszenie Maxime
          </p>
        </div>
      </section>

      {/* Dalsza część strony... */}
      <section className="container mx-auto px-6 py-20 text-white">
        <h2 className="text-3xl font-bold text-arylideYellow mb-4">O nas</h2>
        <p className="text-philippineSilver leading-relaxed max-w-2xl">
          Tutaj pojawi się treść, a navbar u góry zmieni się w elegancką pigułkę.
        </p>
      </section>
    </main>
  );
}