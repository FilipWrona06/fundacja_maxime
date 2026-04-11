"use client";

import Cookies from "js-cookie";

export default function CookieManagerButton() {
  const resetCookies = () => {
    Cookies.remove("maxime_cookie_consent", { path: "/" });
    window.location.reload();
  };

  return (
    <button
      onClick={resetCookies}
      type="button"
      className="font-montserrat text-[0.65rem] font-medium tracking-widest text-white/30 uppercase transition-colors hover:text-white"
    >
      Zarządzaj Cookies
    </button>
  );
}
