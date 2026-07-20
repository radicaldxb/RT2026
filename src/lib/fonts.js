import { Roboto, Roboto_Slab } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const sans = { fontFamily: roboto.style.fontFamily };
export const serif = { fontFamily: robotoSlab.style.fontFamily };
