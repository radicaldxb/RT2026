import { Roboto, Roboto_Slab, DM_Serif_Display } from "next/font/google";

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

export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const sans = { fontFamily: roboto.style.fontFamily };
export const serif = { fontFamily: robotoSlab.style.fontFamily };
export const profileDisplay = { fontFamily: dmSerifDisplay.style.fontFamily };
export const profileSans = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};
