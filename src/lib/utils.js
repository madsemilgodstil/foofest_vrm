import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// utils.js
export function getImageUrl(band) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/logos/";
  if (band.logo.startsWith("https://")) {
    return band.logo;
  } else {
    return `${baseUrl}/${band.logo}`;
  }
}
