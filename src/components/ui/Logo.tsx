import Image from "next/image";

interface LogoProps {
  className?: string;
  isLightMode?: boolean; // Zostawiamy w typach, żeby nie psuć Navbara, ale nie używamy do zmiany koloru
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logo.svg"
        alt="Maxime Logo"
        width={1238}
        height={425}
        priority
        // Zmieniłem logikę w className:
        // Usunąłem warunek isLightMode.
        // Dodałem 'invert brightness-200' na stałe.
        // Dzięki temu czarny SVG będzie zawsze zamieniony na biały.
        className="w-auto h-full object-contain invert brightness-200 transition-all duration-300"
      />
    </div>
  );
};
