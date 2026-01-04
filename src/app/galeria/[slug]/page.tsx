"use client";

import {
  ArrowLeft,
  Calendar,
  Download,
  Heart,
  MessageCircle,
  Share2,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// --- MOCK DANE ---
const allPhotos = [
  {
    id: "1",
    image: "/images/hero-poster.jpg",
    title: "Finał Symfonii Jesiennej",
    description:
      "Niezapomniany wieczór w Filharmonii Śląskiej. Solistka Anna Nowak zachwyciła publiczność wykonaniem koncertu e-moll Chopina.",
    date: "12.10.2025",
    category: "Koncerty",
    likes: 234,
  },
  {
    id: "2",
    image: "/images/timeline/2023.jpg",
    title: "Magia świateł w NOSPR",
    description:
      "Gra świateł podczas koncertu noworocznego stworzyła niesamowity klimat.",
    date: "05.01.2025",
    category: "Koncerty",
    likes: 45,
  },
  {
    id: "3",
    image: "/images/timeline/2024.jpg",
    title: "Owacje na stojąco",
    description:
      "Największa nagroda dla artysty – pełna sala i niekończące się brawa.",
    date: "15.09.2025",
    category: "Koncerty",
    likes: 178,
  },
  {
    id: "4",
    image: "/images/timeline/2022.jpg",
    title: "Bis!",
    description: "Energetyczny bis, który porwał publiczność z krzeseł.",
    date: "20.06.2025",
    category: "Koncerty",
    likes: 300,
  },
  {
    id: "5",
    image: "/images/about.jpg",
    title: "Solówka Anny",
    description: "Moment skupienia i perfekcji technicznej.",
    date: "12.10.2025",
    category: "Edukacja",
    likes: 120,
  },
  {
    id: "6",
    image: "/images/hero-poster.jpg",
    title: "Widok z balkonu",
    description: "Perspektywa, którą rzadko widać, a robi ogromne wrażenie.",
    date: "12.10.2025",
    category: "Koncerty",
    likes: 420,
  },
];

export default function GalleryItemPage() {
  const params = useParams();

  const currentPhoto =
    allPhotos.find((p) => p.id === params.slug) || allPhotos[0];
  const relatedPhotos = allPhotos
    .filter((p) => p.id !== currentPhoto.id)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-raisinBlack text-white">
      {/* 
          NAPRAWA: Usunięto 'fixed header'. 
          Zamiast tego używamy pt-36 (ok. 144px) na kontenerze, 
          żeby odsunąć treść od głównego Navbara.
      */}
      <div className="container mx-auto px-4 pt-36 pb-20 max-w-6xl">
        {/* Nawigacja powrotna (Teraz jest w treści, nie nakłada się) */}
        <div className="mb-8">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-arylideYellow transition-colors"
          >
            <ArrowLeft size={16} /> Wróć do galerii
          </Link>
        </div>

        {/* --- 1. GŁÓWNY WIDOK ZDJĘCIA --- */}
        <div className="flex flex-col lg:flex-row border border-white/10 rounded-sm overflow-hidden bg-[#1a1a1a] shadow-2xl mb-24 min-h-150">
          {/* LEWA: ZDJĘCIE */}
          <div className="lg:w-2/3 xl:w-3/4 relative bg-black flex items-center justify-center p-4 lg:p-0 border-b lg:border-b-0 lg:border-r border-white/10 min-h-100">
            <div className="relative w-full h-full">
              <Image
                src={currentPhoto.image}
                alt={currentPhoto.title}
                fill
                className="object-contain p-4"
                priority
              />
            </div>
          </div>

          {/* PRAWA: PANEL INFORMACYJNY */}
          <div className="lg:w-1/3 xl:w-1/4 flex flex-col bg-[#222]">
            {/* Autor */}
            <div className="p-6 border-b border-white/10 flex items-center gap-4 shrink-0">
              <div className="w-10 h-10 rounded-full bg-arylideYellow flex items-center justify-center text-raisinBlack shrink-0">
                <User size={20} />
              </div>
              <div>
                <span className="block text-sm font-bold text-white">
                  Fundacja Maxime
                </span>
                <span className="text-[10px] text-philippineSilver uppercase tracking-widest">
                  {currentPhoto.category}
                </span>
              </div>
            </div>

            {/* Treść */}
            <div className="p-6 flex-1 overflow-y-auto">
              <h1 className="text-xl font-montserrat font-bold text-white mb-4 leading-tight">
                {currentPhoto.title}
              </h1>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {currentPhoto.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-white/30 border-t border-white/5 pt-4">
                <Calendar size={14} /> {currentPhoto.date}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#1f1f1f] shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="group text-white hover:text-arylideYellow transition-colors"
                  >
                    <Heart
                      size={24}
                      className="group-hover:fill-arylideYellow transition-all"
                    />
                  </button>
                  <button
                    type="button"
                    className="text-white hover:text-arylideYellow transition-colors"
                  >
                    <MessageCircle size={24} />
                  </button>
                  <button
                    type="button"
                    className="text-white hover:text-arylideYellow transition-colors"
                  >
                    <Share2 size={24} />
                  </button>
                </div>
                <button
                  type="button"
                  className="text-white hover:text-arylideYellow transition-colors"
                >
                  <Download size={24} />
                </button>
              </div>
              <div className="text-sm font-bold text-white mb-1">
                {currentPhoto.likes} polubień
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest">
                Dodano 2 godziny temu
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. ZOBACZ WIĘCEJ --- */}
        <div className="border-t border-white/10 pt-12">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-1 h-6 bg-arylideYellow rounded-full" />
            Więcej z tej galerii
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {relatedPhotos.map((photo) => (
              <Link
                key={photo.id}
                href={`/galeria/${photo.id}`}
                className="group relative aspect-square bg-white/5 overflow-hidden cursor-pointer"
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-1 items-center text-white text-xs font-bold">
                    <Heart size={12} className="fill-white" /> {photo.likes}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/galeria"
              className="inline-block px-8 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-raisinBlack transition-all"
            >
              Wróć do wszystkich zdjęć
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
