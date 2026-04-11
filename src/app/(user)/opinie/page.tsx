// src/app/(user)/opinie/page.tsx
import Image from "next/image";
import { defineQuery } from "next-sanity";
import ReviewForm from "@/components/opinions/ReviewForm";
import FadeIn from "@/components/ui/FadeIn";
import { sanityFetch } from "@/sanity/lib/live";

export interface ReviewProps {
  _id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  _createdAt: string;
}

const REVIEWS_QUERY = defineQuery(`
  *[_type == "review" && approved == true] | order(_createdAt desc) {
    _id,
    name,
    role,
    rating,
    text,
    _createdAt
  }
`);

export default async function ReviewsPage() {
  const { data: reviews } = await sanityFetch({ query: REVIEWS_QUERY });

  return (
    <main className="bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack relative min-h-screen w-full overflow-hidden">
      {/* TŁO */}
      <div className="pointer-events-none fixed -top-64 -right-64 z-0 h-200 w-200 opacity-3 lg:-top-40 lg:-right-40 lg:h-300 lg:w-300">
        <Image
          src="/Asset-2.svg"
          alt=""
          fill
          className="animate-[spin_120s_linear_infinite] object-contain brightness-0 invert"
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 flex min-h-[50vh] w-full flex-col justify-end px-6 pt-40 pb-20 lg:px-12">
        <div className="pointer-events-none absolute top-1/2 left-0 z-0 -translate-y-1/2 opacity-2 mix-blend-overlay select-none">
          <span className="font-montserrat text-[20vw] leading-none font-black whitespace-nowrap text-white">
            OPINIE
          </span>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <FadeIn>
            <div className="mb-6 flex items-center gap-4">
              <div className="bg-arylideYellow h-px w-12" />
              <span className="font-montserrat text-arylideYellow text-[0.65rem] font-bold tracking-[0.4em] uppercase">
                Głosy Publiczności
              </span>
            </div>
          </FadeIn>
          <FadeIn delay="200ms">
            <h1 className="font-montserrat text-5xl leading-[1.05] font-black tracking-tight text-white md:text-7xl lg:text-[7.5rem]">
              Wasze <br />
              <span className="font-youngest text-philippineSilver relative top-2 inline-block -rotate-2 text-6xl font-normal md:text-8xl lg:text-[10rem]">
                emocje.
              </span>
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="relative z-20 w-full bg-[#1c1c1c] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
            {/* LEWA STRONA - LISTA OPINII (Renderowana na Serwerze!) */}
            <div className="lg:col-span-7">
              <FadeIn>
                <h2 className="font-youngest text-arylideYellow mb-12 text-4xl lg:text-5xl">
                  Co o nas mówicie?
                </h2>
              </FadeIn>

              <div className="flex flex-col gap-8">
                {reviews.length > 0 ? (
                  reviews.map((review: ReviewProps, i: number) => (
                    <FadeIn key={review._id} delay={`${i * 100}ms`}>
                      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/10">
                        {/* ZŁOTA LINIA */}
                        <div className="bg-arylideYellow absolute top-0 left-0 h-1 w-0 transition-all duration-700 ease-out group-hover:w-full" />

                        {/* GWIAZDKI */}
                        <div className="mb-6 flex gap-1">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              className={`h-5 w-5 ${index < review.rating ? "text-arylideYellow" : "text-white/20"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        <p className="font-montserrat mb-8 text-lg leading-relaxed font-light text-white/80">
                          "{review.text}"
                        </p>

                        <div className="flex items-center gap-4">
                          <div className="h-px w-8 bg-white/20" />
                          <div className="flex flex-col">
                            <span className="font-montserrat text-sm font-bold text-white">
                              {review.name}
                            </span>
                            <span className="font-montserrat text-arylideYellow text-[0.65rem] font-bold tracking-widest uppercase">
                              {review.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))
                ) : (
                  <p className="font-montserrat font-light text-white/50">
                    Brak jeszcze zatwierdzonych opinii. Bądź pierwszy!
                  </p>
                )}
              </div>
            </div>

            {/* PRAWA STRONA - FORMULARZ (Komponent Kliencki) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <ReviewForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
